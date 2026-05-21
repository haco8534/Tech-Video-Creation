const https = require('https');
const fs = require('fs');
const path = require('path');

const CREDENTIALS_PATH = path.join(__dirname, 'youtube_uploader/credentials.json');
const TOKEN_PATH = path.join(__dirname, 'youtube_uploader/tokens/token.json');
const CHANNEL_ID = 'UCepDIDCHSCwaa98HrNQ_LNA';

function loadCredentials() {
  return JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
}

function loadToken() {
  return JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));
}

function saveToken(token) {
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(token, null, 2));
}

function httpsRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Parse error: ${data}`));
        }
      });
    }).on('error', reject);
  });
}

function httpsPost(url, postData) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function refreshAccessToken() {
  const creds = loadCredentials().web;
  const token = loadToken();

  if (token.expiry_date && Date.now() < token.expiry_date - 60000) {
    return token.access_token;
  }

  console.log('Refreshing access token...');
  const params = new URLSearchParams({
    client_id: creds.client_id,
    client_secret: creds.client_secret,
    refresh_token: token.refresh_token,
    grant_type: 'refresh_token'
  });

  const result = await httpsPost('https://oauth2.googleapis.com/token', params.toString());
  if (result.error) {
    throw new Error(`Token refresh failed: ${result.error_description || result.error}`);
  }

  token.access_token = result.access_token;
  token.expiry_date = Date.now() + (result.expires_in * 1000);
  saveToken(token);
  return result.access_token;
}

async function apiGet(endpoint, params) {
  const accessToken = await refreshAccessToken();
  params.access_token = accessToken;
  const qs = new URLSearchParams(params).toString();
  const url = `https://www.googleapis.com/youtube/v3/${endpoint}?${qs}`;
  const result = await httpsRequest(url);
  if (result.error) {
    throw new Error(`API error: ${JSON.stringify(result.error)}`);
  }
  return result;
}

async function getAllVideos() {
  // Get uploads playlist ID
  const channelData = await apiGet('channels', {
    part: 'contentDetails,snippet,statistics',
    id: CHANNEL_ID
  });

  if (!channelData.items || channelData.items.length === 0) {
    throw new Error('Channel not found');
  }

  const channel = channelData.items[0];
  const uploadsPlaylistId = channel.contentDetails.relatedPlaylists.uploads;

  console.log('\n=== CHANNEL INFO ===');
  console.log(`Name: ${channel.snippet.title}`);
  console.log(`Subscribers: ${channel.statistics.subscriberCount}`);
  console.log(`Total Views: ${channel.statistics.viewCount}`);
  console.log(`Total Videos: ${channel.statistics.videoCount}`);

  // Get all videos from uploads playlist
  let allVideoIds = [];
  let nextPageToken = null;

  do {
    const params = {
      part: 'snippet',
      playlistId: uploadsPlaylistId,
      maxResults: '50'
    };
    if (nextPageToken) params.pageToken = nextPageToken;

    const playlist = await apiGet('playlistItems', params);
    const ids = playlist.items.map(item => item.snippet.resourceId.videoId);
    allVideoIds = allVideoIds.concat(ids);
    nextPageToken = playlist.nextPageToken;
  } while (nextPageToken);

  // Get video statistics in batches of 50
  let allVideos = [];
  for (let i = 0; i < allVideoIds.length; i += 50) {
    const batch = allVideoIds.slice(i, i + 50);
    const videoData = await apiGet('videos', {
      part: 'snippet,statistics,contentDetails',
      id: batch.join(',')
    });
    allVideos = allVideos.concat(videoData.items);
  }

  // Sort by view count descending
  allVideos.sort((a, b) => parseInt(b.statistics.viewCount || 0) - parseInt(a.statistics.viewCount || 0));

  console.log('\n=== ALL VIDEOS (sorted by views) ===\n');
  console.log('Rank | Views | Likes | Comments | Title | Published');
  console.log('-----|-------|-------|----------|-------|----------');

  allVideos.forEach((v, i) => {
    const s = v.statistics;
    const date = v.snippet.publishedAt.slice(0, 10);
    console.log(`${i + 1} | ${s.viewCount} | ${s.likeCount || 0} | ${s.commentCount || 0} | ${v.snippet.title} | ${date}`);
  });

  return allVideos;
}

async function getComments(videoId, videoTitle, maxComments = 100) {
  console.log(`\n=== COMMENTS: ${videoTitle} ===\n`);

  let allComments = [];
  let nextPageToken = null;

  do {
    const params = {
      part: 'snippet',
      videoId: videoId,
      maxResults: '100',
      order: 'relevance',
      textFormat: 'plainText'
    };
    if (nextPageToken) params.pageToken = nextPageToken;

    try {
      const data = await apiGet('commentThreads', params);
      for (const item of data.items) {
        const c = item.snippet.topLevelComment.snippet;
        allComments.push({
          text: c.textDisplay,
          likes: c.likeCount,
          date: c.publishedAt.slice(0, 10),
          replies: item.snippet.totalReplyCount
        });
      }
      nextPageToken = data.nextPageToken;
    } catch (e) {
      console.log(`  (Comments disabled or error: ${e.message})`);
      return [];
    }
  } while (nextPageToken && allComments.length < maxComments);

  // Sort by likes
  allComments.sort((a, b) => b.likes - a.likes);

  allComments.forEach((c, i) => {
    console.log(`[${c.likes} likes, ${c.replies} replies, ${c.date}] ${c.text}`);
    if (i < allComments.length - 1) console.log('---');
  });

  return allComments;
}

async function main() {
  try {
    const videos = await getAllVideos();

    const topN = videos.length;
    console.log(`\n\n========================================`);
    console.log(`FETCHING COMMENTS FOR TOP ${topN} VIDEOS`);
    console.log(`========================================`);

    const videosWithComments = [];
    for (let i = 0; i < topN; i++) {
      const comments = await getComments(videos[i].id, videos[i].snippet.title, 200);
      videosWithComments.push({
        id: videos[i].id,
        title: videos[i].snippet.title,
        publishedAt: videos[i].snippet.publishedAt,
        duration: videos[i].contentDetails.duration,
        views: parseInt(videos[i].statistics.viewCount || 0),
        likes: parseInt(videos[i].statistics.likeCount || 0),
        commentCount: parseInt(videos[i].statistics.commentCount || 0),
        tags: videos[i].snippet.tags || [],
        comments: comments
      });
    }

    const output = {
      fetchedAt: new Date().toISOString(),
      videos: videosWithComments
    };

    fs.writeFileSync(
      path.join(__dirname, 'channel_data.json'),
      JSON.stringify(output, null, 2),
      'utf8'
    );
    console.log('\n\nData saved to tools/channel_data.json');

  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

main();

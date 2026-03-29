/**
 * fetch_comments.js
 *
 * YouTube Data API v3 (APIキー認証) でチャンネルの最新動画のコメントを取得する。
 *
 * 使い方: node fetch_comments.js
 * 出力: latest_comments.json
 */
const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const CONFIG_PATH = path.join(__dirname, 'config.json');

function loadConfig() {
  if (!fs.existsSync(CONFIG_PATH)) {
    console.error('config.json が見つかりません。config.example.json をコピーして作成してください。');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
}

/**
 * チャンネルの最新動画を取得
 */
async function getRecentVideos(youtube, channelId, maxVideos, daysBack) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - daysBack);

  const channelRes = await youtube.channels.list({
    part: 'contentDetails',
    id: channelId,
  });

  if (!channelRes.data.items || channelRes.data.items.length === 0) {
    throw new Error(`チャンネルが見つかりません: ${channelId}`);
  }

  const uploadsPlaylistId =
    channelRes.data.items[0].contentDetails.relatedPlaylists.uploads;

  const videos = [];
  let pageToken = undefined;

  while (videos.length < maxVideos) {
    const res = await youtube.playlistItems.list({
      part: 'snippet',
      playlistId: uploadsPlaylistId,
      maxResults: Math.min(50, maxVideos - videos.length),
      pageToken,
    });

    for (const item of res.data.items) {
      const publishedAt = new Date(item.snippet.publishedAt);
      if (publishedAt < cutoff) continue;
      videos.push({
        videoId: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        publishedAt: item.snippet.publishedAt,
      });
    }

    pageToken = res.data.nextPageToken;
    if (!pageToken) break;
  }

  return videos.slice(0, maxVideos);
}

/**
 * 動画の統計情報を取得
 */
async function getVideoStats(youtube, videoIds) {
  const res = await youtube.videos.list({
    part: 'statistics',
    id: videoIds.join(','),
  });

  const statsMap = {};
  for (const item of res.data.items) {
    statsMap[item.id] = {
      viewCount: Number(item.statistics.viewCount),
      likeCount: Number(item.statistics.likeCount),
      commentCount: Number(item.statistics.commentCount),
    };
  }
  return statsMap;
}

/**
 * 動画のコメントを取得（ページネーション対応）
 */
async function getComments(youtube, videoId, maxComments) {
  const comments = [];
  let pageToken = undefined;

  while (comments.length < maxComments) {
    try {
      const res = await youtube.commentThreads.list({
        part: 'snippet,replies',
        videoId,
        maxResults: Math.min(100, maxComments - comments.length),
        order: 'relevance',
        textFormat: 'plainText',
        pageToken,
      });

      for (const thread of res.data.items) {
        const top = thread.snippet.topLevelComment.snippet;
        const comment = {
          author: top.authorDisplayName,
          text: top.textDisplay,
          likeCount: top.likeCount,
          publishedAt: top.publishedAt,
          replies: [],
        };

        if (thread.replies) {
          for (const reply of thread.replies.comments) {
            comment.replies.push({
              author: reply.snippet.authorDisplayName,
              text: reply.snippet.textDisplay,
              likeCount: reply.snippet.likeCount,
              publishedAt: reply.snippet.publishedAt,
            });
          }
        }

        comments.push(comment);
      }

      pageToken = res.data.nextPageToken;
      if (!pageToken) break;
    } catch (err) {
      if (err.code === 403) {
        console.warn(`  コメント取得不可 (videoId: ${videoId}): ${err.message}`);
        break;
      }
      throw err;
    }
  }

  return comments.slice(0, maxComments);
}

/**
 * メイン
 */
async function fetchAll() {
  const config = loadConfig();
  const youtube = google.youtube({
    version: 'v3',
    auth: config.youtube.api_key,
  });

  const { channel_id } = config.youtube;
  const { max_videos, max_comments_per_video, days_back } = config.settings;

  console.log(`チャンネル ${channel_id} の直近${days_back}日間・最大${max_videos}本の動画を取得...`);

  const videos = await getRecentVideos(youtube, channel_id, max_videos, days_back);
  console.log(`${videos.length} 本の動画が見つかりました。`);

  if (videos.length === 0) {
    return { videos: [], fetchedAt: new Date().toISOString() };
  }

  const statsMap = await getVideoStats(youtube, videos.map((v) => v.videoId));

  for (const video of videos) {
    video.stats = statsMap[video.videoId] || {};
    console.log(`  ${video.title} (${video.stats.commentCount || 0} コメント)`);
    video.comments = await getComments(youtube, video.videoId, max_comments_per_video);
    console.log(`    → ${video.comments.length} 件取得`);
  }

  return { videos, fetchedAt: new Date().toISOString() };
}

if (require.main === module) {
  fetchAll()
    .then((data) => {
      const outPath = path.join(__dirname, 'latest_comments.json');
      fs.writeFileSync(outPath, JSON.stringify(data, null, 2));
      console.log(`\n保存完了: ${outPath}`);
    })
    .catch((err) => {
      console.error('エラー:', err.message);
      process.exit(1);
    });
}

module.exports = { fetchAll };

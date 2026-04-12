const fs = require('fs');
const p = 'd:/myfolder/動画生成/技術解説/main content/presentation/self_taught_engineer/scene_map.json';
const d = JSON.parse(fs.readFileSync(p, 'utf8'));
const bad = ['タイトルカード','数値インパクト','フロー図','テキスト強調','比較対照','段階的リスト','引用カード','タイムライン','まとめ3ポイント','エンディング','SVG図解','コードビジュアル','まとめカード','アナロジー','思考実験','ビフォーアフター'];
let errors = 0;
let truncated = 0;
d.scenes.forEach(s => {
  const found = bad.filter(b => s.title.startsWith(b));
  if (found.length > 0) {
    console.log('NG Scene ' + s.id + ': "' + s.title + '" pattern name');
    errors++;
  }
  if (s.title.length > 15) {
    console.log('WARN Scene ' + s.id + ': "' + s.title + '" (' + s.title.length + ' chars -> truncate)');
    s.title = s.title.substring(0, 15);
    truncated++;
  } else {
    console.log('OK Scene ' + s.id + ': "' + s.title + '"');
  }
});
if (truncated > 0) {
  fs.writeFileSync(p, JSON.stringify(d, null, 2), 'utf8');
  console.log(truncated + ' truncated');
}
if (errors > 0) {
  console.log(errors + ' errors');
  process.exit(1);
} else {
  console.log('ALL OK');
}

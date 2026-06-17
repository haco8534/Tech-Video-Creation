const fs = require('fs');
const path = require('path');
const p = path.resolve(__dirname, '../slides/scene_map.json');
const d = JSON.parse(fs.readFileSync(p, 'utf8'));
const bad = ['タイトルカード', '数値インパクト', 'フロー図', 'テキスト強調', '比較対照', '段階的リスト', '引用カード', 'タイムライン', 'まとめ3ポイント', 'エンディング', 'SVG図解', 'コードビジュアル', 'まとめカード', 'アナロジー', '思考実験', 'ビフォーアフター'];
let errors = 0, truncated = 0;
d.scenes.forEach(s => {
    if (bad.some(b => s.title.startsWith(b))) {
        console.log('❌ Scene ' + s.id + ': "' + s.title + '" パターン名混入');
        errors++;
    }
    if (s.title.length > 15) {
        console.log('⚠️ Scene ' + s.id + ': ' + s.title.length + '文字→15文字に切り詰め');
        s.title = s.title.substring(0, 15);
        truncated++;
    } else {
        console.log('✅ Scene ' + s.id + ': "' + s.title + '"');
    }
});
if (truncated) fs.writeFileSync(p, JSON.stringify(d, null, 2));
if (errors) process.exit(1);
console.log('\n✅ OK');

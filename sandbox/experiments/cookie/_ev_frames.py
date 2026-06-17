# 確認用: event 名 → 開始フレームを一覧表示
import json
import re
from pathlib import Path

src = (Path(__file__).parent / "scriptData.ts").read_text(encoding="utf-8")
starts = json.loads(re.search(r"LINE_STARTS: number\[\] = (\[.*?\])", src).group(1))
for i, m in enumerate(re.finditer(r"^\s+\{ speaker.*", src, re.MULTILINE)):
    ev = re.search(r'event: "([^"]+)"', m.group(0))
    if ev:
        print(f"{starts[i]:6d}  {ev.group(1)}")

"""Build transcript.md from ocr_raw.txt and frames/times.txt.

Usage:
    python build_transcript.py <video_dir> [--source <youtube_url>] [--title <title>]
"""
import argparse
import re
from pathlib import Path

def parse_times(path):
    out = {}
    with open(path, encoding="utf-8") as f:
        for line in f:
            m = re.match(r"frame:(\d+)\s+pts:\d+\s+pts_time:([\d.]+)", line.strip())
            if m:
                out[int(m.group(1))] = float(m.group(2))
    return out

def parse_ocr(path):
    out = {}
    with open(path, encoding="utf-8") as f:
        for line in f:
            m = re.match(r"(\d{4})\|(.*)", line.strip())
            if m:
                out[int(m.group(1))] = m.group(2)
    return out

def fmt_ts(sec):
    h = int(sec // 3600)
    m = int((sec % 3600) // 60)
    s = sec - h * 3600 - m * 60
    return f"{h:02d}:{m:02d}:{s:06.3f}"

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("video_dir")
    ap.add_argument("--source", default="")
    ap.add_argument("--title", default="")
    args = ap.parse_args()

    base = Path(args.video_dir)
    times = parse_times(base / "frames" / "times.txt")
    ocr = parse_ocr(base / "ocr_raw.txt")

    lines = []
    prev = None
    for fid in sorted(ocr.keys()):
        text = ocr[fid]
        if text == "(none)" or text == prev:
            continue
        ts = times.get(fid - 1, 0.0)
        lines.append(f"[{fmt_ts(ts)}] {text}")
        prev = text

    title = args.title or base.name
    with open(base / "transcript.md", "w", encoding="utf-8") as f:
        f.write(f"# {title} — Reference Transcript\n\n")
        if args.source:
            f.write(f"Source: {args.source}\n\n")
        f.write("---\n\n")
        for line in lines:
            f.write(line + "\n\n")

    print(f"wrote {len(lines)} subtitle lines to {base / 'transcript.md'}")

if __name__ == "__main__":
    main()

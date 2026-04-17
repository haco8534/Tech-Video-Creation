import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { UploadIcon } from "../icons";
import { toJstIso } from "../utils";

export default function UploadPopover({ onSelect }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const popRef = useRef(null);
  const [style, setStyle] = useState({});

  // ポップオーバーが開いた直後にサイズを測って位置を決定
  useLayoutEffect(() => {
    if (!open || !btnRef.current || !popRef.current) return;
    const btnRect = btnRef.current.getBoundingClientRect();
    const popHeight = popRef.current.offsetHeight;
    const right = window.innerWidth - btnRect.right;
    const spaceBelow = window.innerHeight - btnRect.bottom - 6;

    if (spaceBelow >= popHeight) {
      setStyle({ top: btnRect.bottom + 6, right, bottom: "auto" });
    } else {
      setStyle({ bottom: window.innerHeight - btnRect.top + 6, right, top: "auto" });
    }
  }, [open]);

  useEffect(() => {
    function handleClick(e) {
      if (
        popRef.current && !popRef.current.contains(e.target) &&
        btnRef.current && !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  function toggle(e) {
    e.stopPropagation();
    setOpen(!open);
  }

  function pick(which) {
    let publishAt = null;
    if (which === "tomorrow") {
      const d = new Date(); d.setDate(d.getDate() + 1);
      publishAt = toJstIso(d, 18, 30);
    } else if (which === "dayafter") {
      const d = new Date(); d.setDate(d.getDate() + 2);
      publishAt = toJstIso(d, 18, 30);
    }
    setOpen(false);
    onSelect(publishAt);
  }

  function pickCustom(value) {
    if (!value) return;
    const scheduled = new Date(`${value}T18:30:00+09:00`);
    if (scheduled <= new Date()) {
      setOpen(false);
      onSelect(null);
      return;
    }
    setOpen(false);
    onSelect(scheduled.toISOString());
  }

  return (
    <>
      <button
        ref={btnRef}
        className="btn btn-sm btn-primary"
        onClick={toggle}
      >
        <UploadIcon /> アップロード
      </button>
      {open && (
        <div
          ref={popRef}
          className="upload-popover open"
          style={{ position: "fixed", ...style }}
        >
          <div className="popover-title">公開日を選択 (18:30公開)</div>
          <div className="popover-options">
            <button className="btn btn-sm btn-quick" onClick={() => pick("tomorrow")}>明日</button>
            <button className="btn btn-sm btn-quick" onClick={() => pick("dayafter")}>明後日</button>
          </div>
          <div className="popover-custom">
            <input
              type="date"
              className="popover-date-input"
              onChange={(e) => pickCustom(e.target.value)}
            />
          </div>
          <div className="popover-divider" />
          <button className="btn btn-sm btn-ghost popover-now-btn" onClick={() => pick("now")}>
            即時公開（予約なし）
          </button>
        </div>
      )}
    </>
  );
}

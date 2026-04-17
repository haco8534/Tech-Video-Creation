import { useState, useMemo } from "react";
import { EditIcon, FileTextIcon, CheckIcon } from "../icons";
import { useToast } from "./ToastContext";

export default function EditPanel({ project, onSave, onClose }) {
  const toast = useToast();

  const defaults = useMemo(() => {
    if (!project) return { title: "", description: "" };
    let origTitle = project.title;
    let origDesc = project.description || "";
    if (project.description) {
      const lines = project.description.split("\n");
      const titleLine = lines.find((l) => l.startsWith("# "));
      if (titleLine) origTitle = titleLine.replace(/^#\s+/, "");
      origDesc = lines.filter((l) => !l.startsWith("# ")).join("\n").trim();
    }
    return { title: origTitle, description: origDesc };
  }, [project]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // projectが変わったら初期値をリセット
  const [prevProject, setPrevProject] = useState(null);
  if (project !== prevProject) {
    setPrevProject(project);
    if (project) {
      setTitle(defaults.title);
      setDescription(defaults.description);
    }
  }

  if (!project) return null;

  return (
    <>
      <div className={`overlay ${project ? "open" : ""}`} onClick={onClose} />
      <div className={`desc-panel ${project ? "open" : ""}`}>
        <div className="desc-panel-header">
          <h3>投稿内容を編集</h3>
          <button className="desc-panel-close" onClick={onClose}>&times;</button>
        </div>
        <div className="desc-panel-body">
          <div className="panel-field">
            <label><EditIcon /> タイトル</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="panel-field">
            <label><FileTextIcon /> 概要欄</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
        </div>
        <div className="panel-actions">
          <button
            className="btn btn-primary"
            onClick={() => {
              onSave({ title, description });
              toast("編集内容を保存しました（アップロード時に反映）", "success");
              onClose();
            }}
          >
            <CheckIcon /> 保存
          </button>
          <button className="btn btn-ghost" onClick={onClose}>キャンセル</button>
        </div>
      </div>
    </>
  );
}

import express from "express";
import crypto from "crypto";
import fs from "fs";
import path from "path";

const router = express.Router();
const STORE_PATH = path.join(import.meta.dirname, "..", "prompt_templates.json");

function readStore() {
  if (!fs.existsSync(STORE_PATH)) return [];
  try {
    const raw = fs.readFileSync(STORE_PATH, "utf-8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function writeStore(templates) {
  fs.writeFileSync(STORE_PATH, JSON.stringify(templates, null, 2), "utf-8");
}

router.get("/", (req, res) => {
  res.json({ templates: readStore() });
});

router.post("/", (req, res) => {
  const { name, body } = req.body || {};
  if (!name || typeof name !== "string" || !body || typeof body !== "string") {
    return res.status(400).json({ error: "name と body (文字列) が必要です" });
  }
  const templates = readStore();
  const now = Date.now();
  const template = {
    id: crypto.randomUUID().slice(0, 8),
    name: name.trim(),
    body,
    createdAt: now,
    updatedAt: now,
  };
  templates.push(template);
  writeStore(templates);
  res.json({ template });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, body } = req.body || {};
  if (!name || typeof name !== "string" || !body || typeof body !== "string") {
    return res.status(400).json({ error: "name と body (文字列) が必要です" });
  }
  const templates = readStore();
  const idx = templates.findIndex((t) => t.id === id);
  if (idx === -1) return res.status(404).json({ error: "not found" });
  templates[idx] = { ...templates[idx], name: name.trim(), body, updatedAt: Date.now() };
  writeStore(templates);
  res.json({ template: templates[idx] });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const templates = readStore();
  const next = templates.filter((t) => t.id !== id);
  if (next.length === templates.length) return res.status(404).json({ error: "not found" });
  writeStore(next);
  res.json({ ok: true });
});

export default router;

// Utilitaires partagés par les scripts du dépôt : parcours des fichiers Markdown
// et lecture du front matter. Aucune dépendance externe.

import { readdirSync } from "node:fs";
import { join } from "node:path";

export function walk(dir) {
  const out = [];
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.isFile() && e.name.endsWith(".md") && e.name !== "README.md") out.push(p);
  }
  return out;
}

export function stripQuotes(s) {
  const t = s.trim();
  if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) {
    return t.slice(1, -1);
  }
  return t;
}

// Parseur de front matter volontairement minimal : scalaires, listes en ligne
// ([a, b]) et listes à tirets. Suffisant pour le format utilisé ici.
export function parseFrontMatter(raw) {
  if (!raw.startsWith("---")) return { data: {}, body: raw };
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return { data: {}, body: raw };
  const head = raw.slice(raw.indexOf("\n") + 1, end);
  const body = raw.slice(end + 4).replace(/^\r?\n/, "");
  const data = {};
  let currentKey = null;
  for (const line of head.split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const item = line.match(/^\s*-\s+(.*)$/);
    if (item && currentKey) {
      if (!Array.isArray(data[currentKey])) data[currentKey] = [];
      data[currentKey].push(stripQuotes(item[1]));
      continue;
    }
    const kv = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
    if (!kv) continue;
    const [, key, rest] = kv;
    currentKey = key;
    const value = rest.trim();
    if (value === "") {
      data[key] = [];
    } else if (value.startsWith("[") && value.endsWith("]")) {
      data[key] = value
        .slice(1, -1)
        .split(",")
        .map((v) => stripQuotes(v))
        .filter(Boolean);
    } else {
      data[key] = stripQuotes(value);
    }
  }
  return { data, body };
}

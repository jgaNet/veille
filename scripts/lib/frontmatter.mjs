// Lecture / écriture du front matter YAML utilisé dans tout le dépôt.
//
// Volontairement minimal et sans dépendance, dans le même esprit que le
// parseur embarqué dans build-feeds.mjs : scalaires, listes en ligne
// ([a, b]) et listes à tirets. Ce module sert aux fiches d'affirmations,
// qui utilisent les mêmes conventions que les alertes.

function stripQuotes(s) {
  const t = String(s).trim();
  if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) {
    return t.slice(1, -1);
  }
  return t;
}

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

// Une valeur scalaire est citée dès qu'elle pourrait casser le parseur
// (deux-points, guillemets, tirets en tête, apparence de liste).
function scalar(value) {
  const s = String(value);
  if (s === "") return '""';
  if (/^[0-9]+$/.test(s)) return s;
  // Dates ISO : laissées telles quelles, comme dans les alertes existantes.
  if (/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2})?([+-]\d{2}:\d{2}|Z)?)?$/.test(s)) return s;
  if (/[:#"']/.test(s) || /^[-[\]]/.test(s) || s !== s.trim()) {
    return `"${s.replace(/\\/g, "\\\\").replace(/"/g, "'")}"`;
  }
  return s;
}

export function serializeFrontMatter(data) {
  const lines = ["---"];
  for (const [key, value] of Object.entries(data)) {
    if (value === undefined || value === null) continue;
    if (Array.isArray(value)) {
      lines.push(`${key}:`);
      for (const v of value) lines.push(`  - ${scalar(v)}`);
    } else {
      lines.push(`${key}: ${scalar(value)}`);
    }
  }
  lines.push("---");
  return lines.join("\n");
}

export function renderDocument(data, body) {
  return `${serializeFrontMatter(data)}\n\n${body.replace(/\s*$/, "")}\n`;
}

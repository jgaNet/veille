// Version condensée d'un récapitulatif pour all.xml : le résumé, les titres des
// informations retenues (avec leur note) rubrique par rubrique, les phrases
// clés de « Ce qu'il faut retenir », et un lien vers le brief complet. Le texte
// intégral reste dans le flux du thème.
const MAX_HEADLINES = 15;
const SYNTHESIS = /retenir|surveiller|bruit|échéances|a faire|à faire/i;

export function condense(it) {
  const lines = it.body.split(/\r?\n/);
  const out = [];
  if (it.summary) out.push(it.summary, "");

  const grouped = []; // titres ### regroupés sous leur rubrique ##
  const bullets = []; // repli : puces de premier niveau (bulletin de fact-check)
  const keys = []; // phrases en gras de « Ce qu'il faut retenir »
  let section = "";
  let inSynthesis = false;
  let inKeep = false;

  const clean = (t) =>
    t
      .replace(/\s*—?\s*\[[^\]]*\]\([^)]*\)\s*$/, "") // lien final « [vérification](…) »
      .replace(/^\d+\.\s+/, "")
      .replace(/—\s*(?:confiance|note)\s+(\d)/gi, "— $1") // « — confiance 8/10 » → « — 8/10 »
      .trim();

  for (let i = 0; i < lines.length; i++) {
    const h = lines[i].match(/^(#{2,3})\s+(.*)$/);
    if (h) {
      const synth = SYNTHESIS.test(h[2]);
      if (h[1].length === 2 || synth) {
        inSynthesis = synth;
        inKeep = /retenir/i.test(h[2]);
        if (h[1].length === 2 && !synth) section = h[2].trim();
        continue;
      }
      if (!inSynthesis) grouped.push({ section, title: clean(h[2]) });
      continue;
    }
    if (inKeep) {
      const start = lines[i].match(/^\*\*(.*)$/);
      if (start) {
        let buf = start[1];
        while (!buf.includes("**") && i + 1 < lines.length && lines[i + 1].trim()) {
          buf += " " + lines[++i].trim();
        }
        const key = buf.split("**")[0].replace(/^\d+\.\s+/, "").trim();
        if (key) keys.push(key);
      }
      continue;
    }
    if (!inSynthesis) {
      const li = lines[i].match(/^[-*]\s+(.*)$/);
      if (li) bullets.push(clean(li[1]));
    }
  }

  if (grouped.length) {
    let current = null;
    for (const g of grouped.slice(0, MAX_HEADLINES)) {
      if (g.section !== current) {
        current = g.section;
        if (current) out.push("", `**${current}**`, "");
      }
      out.push(`- ${g.title}`);
    }
    if (grouped.length > MAX_HEADLINES) out.push(`- … et ${grouped.length - MAX_HEADLINES} autre(s)`);
  } else if (bullets.length) {
    for (const b of bullets.slice(0, MAX_HEADLINES)) out.push(`- ${b}`);
    if (bullets.length > MAX_HEADLINES) out.push(`- … et ${bullets.length - MAX_HEADLINES} autre(s)`);
  }

  if (keys.length) {
    out.push("", "**À retenir**", "");
    for (const k of keys.slice(0, 5)) out.push(`- ${k}`);
  }

  out.push("", `[Lire le brief complet](${it.link})`);
  return out.join("\n").replace(/\n{3,}/g, "\n\n");
}

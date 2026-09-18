#!/usr/bin/env node
// Vérifie la validité des flux RSS générés dans feeds/.
//
// Sans dépendance : contrôle la bonne formation du XML (imbrication des
// balises, CDATA, esperluettes non échappées) puis la présence des éléments
// RSS 2.0 obligatoires. Utilisé localement et en CI après build-feeds.mjs.
//
// Usage : node scripts/check-feeds.mjs [dossier]

import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const VOID_OK = new Set(["atom:link"]);

export function checkWellFormed(xml) {
  const errors = [];
  const stack = [];
  let i = 0;

  while (i < xml.length) {
    const lt = xml.indexOf("<", i);
    if (lt === -1) {
      if (xml.slice(i).includes("&") && !/&(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);/.test(xml.slice(i))) {
        errors.push("esperluette non échappée dans le texte final");
      }
      break;
    }

    const text = xml.slice(i, lt);
    const bareAmp = text.match(/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/);
    if (bareAmp) errors.push(`esperluette non échappée : « ${text.trim().slice(0, 60)} »`);

    if (xml.startsWith("<![CDATA[", lt)) {
      const end = xml.indexOf("]]>", lt);
      if (end === -1) {
        errors.push("bloc CDATA non refermé");
        break;
      }
      i = end + 3;
      continue;
    }
    if (xml.startsWith("<!--", lt)) {
      const end = xml.indexOf("-->", lt);
      if (end === -1) {
        errors.push("commentaire non refermé");
        break;
      }
      i = end + 3;
      continue;
    }
    if (xml.startsWith("<?", lt)) {
      const end = xml.indexOf("?>", lt);
      if (end === -1) {
        errors.push("instruction de traitement non refermée");
        break;
      }
      i = end + 2;
      continue;
    }

    const gt = xml.indexOf(">", lt);
    if (gt === -1) {
      errors.push("balise non refermée");
      break;
    }
    const tag = xml.slice(lt + 1, gt).trim();
    const name = tag.replace(/^\/?/, "").split(/[\s/>]/)[0];

    if (tag.startsWith("/")) {
      const open = stack.pop();
      if (open !== name) errors.push(`balise fermante </${name}> inattendue (ouverte : <${open ?? "aucune"}>)`);
    } else if (tag.endsWith("/")) {
      // balise auto-fermante
    } else {
      if (VOID_OK.has(name) && !tag.endsWith("/")) errors.push(`<${name}> devrait être auto-fermante`);
      stack.push(name);
    }
    i = gt + 1;
  }

  if (stack.length) errors.push(`balises non refermées : ${stack.join(", ")}`);
  return errors;
}

export function checkRss(xml) {
  const errors = checkWellFormed(xml);
  if (!/^<\?xml version="1\.0" encoding="UTF-8"\?>/.test(xml)) errors.push("déclaration XML manquante");
  if (!/<rss version="2\.0"/.test(xml)) errors.push("élément <rss version=\"2.0\"> manquant");
  for (const el of ["title", "link", "description", "lastBuildDate"]) {
    if (!new RegExp(`<channel>[\\s\\S]*<${el}>`).test(xml)) errors.push(`<${el}> manquant dans <channel>`);
  }
  const items = xml.split("<item>").slice(1);
  items.forEach((item, n) => {
    for (const el of ["title", "link", "guid", "pubDate"]) {
      if (!new RegExp(`<${el}[ >]`).test(item)) errors.push(`item #${n + 1} : <${el}> manquant`);
    }
    const date = /<pubDate>([^<]+)<\/pubDate>/.exec(item);
    if (date && Number.isNaN(Date.parse(date[1]))) errors.push(`item #${n + 1} : pubDate illisible « ${date[1]} »`);
  });
  return { errors, items: items.length };
}

function main() {
  const dir = process.argv[2] || join(process.cwd(), "feeds");
  let files;
  try {
    files = readdirSync(dir).filter((f) => f.endsWith(".xml"));
  } catch {
    console.error(`Dossier introuvable : ${dir}. Lancer d'abord node scripts/build-feeds.mjs`);
    process.exit(1);
  }
  if (files.length === 0) {
    console.error(`Aucun flux dans ${dir}.`);
    process.exit(1);
  }
  let failed = false;
  for (const f of files) {
    const { errors, items } = checkRss(readFileSync(join(dir, f), "utf8"));
    if (errors.length) {
      failed = true;
      console.error(`✗ ${f}`);
      for (const e of errors) console.error(`    ${e}`);
    } else {
      console.log(`✓ ${f} — XML valide, ${items} item(s)`);
    }
  }
  if (failed) process.exit(1);
}

if (process.argv[1] && process.argv[1].endsWith("check-feeds.mjs")) main();

// Loads the MDB Bootstrap + FACTS12 theme for a single card at a time.
//
// The two style sheets are injected inside a shadow root (see MdbScope) so their
// reboot never touches the Tailwind screens. A shadow tree has no document root,
// so the `:root` custom properties those sheets declare never match inside it —
// we lift them onto `:host` instead. Values are read straight out of the theme
// files, so no color literal is ever written by hand.

export const MDB_STYLESHEETS = [
  "https://tracking.carrierlogistics.com/carrierlogistics/mdb5/css/mdb.min.css",
  "https://tracking.carrierlogistics.com/carrierlogistics/css/facts12.mdb.css",
];

/** Pull every custom property declared inside a `:root` block of `css`. */
function customPropsFromRootBlocks(css: string): string[] {
  const declarations: string[] = [];
  let cursor = 0;

  while (true) {
    const at = css.indexOf(":root", cursor);
    if (at === -1) break;

    const open = css.indexOf("{", at);
    if (open === -1) break;

    const selector = css.slice(at, open);
    // Dark-theme blocks are skipped: the customer app ships the light theme only.
    if (selector.includes("dark")) {
      cursor = open + 1;
      continue;
    }

    let depth = 0;
    let close = open;
    for (let i = open; i < css.length; i++) {
      if (css[i] === "{") depth++;
      else if (css[i] === "}") {
        depth--;
        if (depth === 0) {
          close = i;
          break;
        }
      }
    }

    const body = css.slice(open + 1, close);
    const decl = /--[a-zA-Z0-9_-]+\s*:\s*[^;{}]+/g;
    let match: RegExpExecArray | null;
    while ((match = decl.exec(body))) declarations.push(`${match[0].trim()};`);

    cursor = close + 1;
  }

  return declarations;
}

let cache: Promise<string> | null = null;

/** `--token: value;` list taken from the theme sheets, ready for a `:host` rule. */
export function mdbThemeTokens(): Promise<string> {
  if (!cache) {
    cache = Promise.all(
      MDB_STYLESHEETS.map((href) => fetch(href).then((res) => res.text())),
    ).then((sheets) => sheets.flatMap(customPropsFromRootBlocks).join(""));
  }
  return cache;
}

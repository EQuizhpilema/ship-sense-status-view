import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { MDB_STYLESHEETS } from "@/lib/mdb-theme";
import { MDB_THEME_TOKENS } from "@/lib/mdb-theme-tokens";

// Reusable MDB/FACTS12 patterns the library itself cannot express, plus the
// Material Symbols rule (the copy in the document head cannot cross the shadow
// boundary). Colors come only from theme tokens.
const SHARED_PATTERNS = `
:host{display:block;font-family:var(--mdb-body-font-family);font-size:var(--mdb-body-font-size);font-weight:var(--mdb-body-font-weight);line-height:var(--mdb-body-line-height);color:var(--mdb-body-color)}
.material-symbols-outlined{font-family:'Material Symbols Outlined';font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;font-feature-settings:'liga';-webkit-font-smoothing:antialiased}
.cli-icon-tile{width:44px;height:44px;border-radius:.6rem;background:color-mix(in srgb,var(--mdb-primary) 10%,transparent);color:var(--mdb-primary);display:inline-flex;align-items:center;justify-content:center}
.cli-info-note,.cli-warning-note{border:1px solid;border-left:4px solid;border-radius:.75rem;padding:1rem}
.cli-info-note{background:var(--cli-alt-background-color);border-color:var(--cli-alt-border-color);border-left-color:var(--mdb-primary);color:var(--mdb-primary)}
.cli-warning-note{background:var(--mdb-warning-bg-subtle);border-color:var(--mdb-warning-border-subtle);border-left-color:var(--mdb-warning);color:var(--mdb-warning-text-emphasis)}
.cli-info-note a,.cli-warning-note a{text-decoration:none;min-width:0}
.cli-info-note a{color:var(--mdb-primary)}
.cli-warning-note a{color:var(--mdb-warning-text-emphasis)}
.cli-info-note a span:last-child,.cli-warning-note a span:last-child{overflow-wrap:break-word}
.cli-info-note a:hover,.cli-warning-note a:hover{text-decoration:underline}
.cli-info-note .material-symbols-outlined,.cli-warning-note .material-symbols-outlined,.cli-address .material-symbols-outlined{font-size:18px}
.cli-address p{letter-spacing:.02em}
`;

interface MdbScopeProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * Renders its children inside a shadow root carrying the MDB + FACTS12 sheets,
 * so MDB class names behave exactly as in the customer app while the rest of
 * the project keeps its own reset.
 */
export function MdbScope({ children, className, style }: MdbScopeProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [root, setRoot] = useState<ShadowRoot | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let shadow = host.shadowRoot;
    if (!shadow) {
      shadow = host.attachShadow({ mode: "open" });

      MDB_STYLESHEETS.forEach((href) => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        shadow!.appendChild(link);
      });

      const patterns = document.createElement("style");
      patterns.textContent = `${SHARED_PATTERNS}\n:host{${MDB_THEME_TOKENS}}`;
      shadow.appendChild(patterns);
    }

    setRoot(shadow);
  }, []);

  return (
    <div ref={hostRef} className={className} style={style}>
      {root ? createPortal(children, root) : null}
    </div>
  );
}

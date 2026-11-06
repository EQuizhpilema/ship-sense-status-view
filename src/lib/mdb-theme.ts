// The two sheets the FACTS12 / MDB Bootstrap stack is built from.
// They are injected inside a shadow root (see MdbScope) so their reboot never
// touches the Tailwind screens; their `:root` custom properties are re-declared
// on `:host` from the generated token file, because a shadow tree has no
// document root for `:root` to match.

export const MDB_STYLESHEETS = [
  "https://tracking.carrierlogistics.com/carrierlogistics/mdb5/css/mdb.min.css",
  "https://tracking.carrierlogistics.com/carrierlogistics/css/facts12.mdb.css",
];

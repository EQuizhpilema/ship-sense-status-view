# Roadmap

- Done: applied Font Awesome **truck-fast** (truck with speed lines) to the in-network statuses — At Origin Terminal, both In Transit cards, Arrived at Destination Terminal, and a new Transfer to Interline card. Out for Delivery keeps the plain truck. Verified in the preview: glyph renders on all five, no page errors, build OK.
- Open: set the favicon from the chosen mark — waiting for the user to confirm truck-fast is the pick.
- Open: delete the unused generated candidate PNGs in src/assets (logo-network-route, logo-interline-relay, logo-truck-motion-route/-chevrons and their -v2 versions) — waiting for go-ahead.
- Open: At Origin Terminal shows the truck bare on white while the other three sit in a dark badge — unify if the user wants.
- Done: added a second shipment history tab, 17561748 (6 events, 10/08–10/10), alongside 17560215; the sidebar lists both and each opens its own timeline. Verified in the preview: correct rows and order, "In Transit" pill on the trailer-departed row, "At Origin Terminal" on freight unloaded, build OK.
- Done: "Picked Up" event now shows a green Picked Up pill in the history rule set, so it appears in every history section (17560215 and 17561748). "Pickup Request Received" stays unbadged. Verified in the preview, build OK.

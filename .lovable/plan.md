

## Adding Arrival and Departure Times to Shipment Cards

To display arrival and departure times cleanly within the existing card layout, here are a few layout options using the current design framework:

### Recommended Approach: Inline Time Row

Add a compact two-column row below the delivery date, showing arrival and departure side by side. This fits naturally within the existing centered layout:

```text
+---------------------------+
|     Friday, February 6    |
|                           |
|  Arrived        Departed  |
|  2:43 pm        3:00 pm   |
+---------------------------+
```

### How It Works

- A new optional `arrivalTime` and `departureTime` prop will be added to the ShipmentCard component
- When both are provided, a small two-column row appears below the date
- Labels ("Arrived" / "Departed") in muted gray, times in bold -- matching the existing text styling
- If only arrival time is provided (no departure), it shows just the arrival column
- This keeps the existing card width and spacing intact

### Technical Details

1. **ShipmentCard props** -- add two optional fields:
   - `arrivalTime?: string` (e.g., "2:43 pm")
   - `departureTime?: string` (e.g., "3:00 pm")

2. **ShipmentCard template** -- add a flex row below the date section for delivered/completed statuses:
   - Two equal-width columns using `flex justify-center gap-8`
   - Each column: label on top (small gray text), time below (medium bold text)

3. **Index.tsx** -- update the delivered card data to include `arrivalTime: "2:43 pm"` and `departureTime: "3:00 pm"`

This approach reuses existing Tailwind utility classes and keeps the card visually consistent with the current design.


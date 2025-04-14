
# Detailed Shipment Tracking Status Card

A clean, modern shipment tracking card UI component built with React, TypeScript, and Tailwind CSS.

## Features

- Clean, professional design
- Responsive layout
- Detailed shipping information display:
  - Delivery status
  - Delivery date and time window
  - Appointment details
  - Delivery address
  - Shipping origin

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Lucide React icons

## Component Structure

The main component is a shipment tracking card that displays:

- Current shipment status
- Delivery date and time window
- Appointment details in a highlighted section
- Delivery address with map pin icon
- Shipping origin with map pin icon

## Usage

```tsx
import { ShipmentCard } from "@/components/ShipmentCard";

const shipmentData = {
  status: "Out for delivery",
  date: "Thursday, January 30",
  timeWindow: "7:30 am - 9:30 am",
  appointmentDetails: {
    date: "Thursday, January 10",
    timeWindow: "9 AM - 9 AM",
    contact: "EMAIL"
  },
  deliveryAddress: {
    city: "ALBANY",
    state: "OR",
    zip: "97321"
  },
  shipFromAddress: {
    city: "CINCINNATI",
    state: "OH",
    zip: "45246"
  }
};

<ShipmentCard {...shipmentData} />
```

Created with [Lovable](https://lovable.dev)

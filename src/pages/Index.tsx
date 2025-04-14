
import { ShipmentCard } from "@/components/ShipmentCard";
import { Check, Calendar } from "lucide-react";

const Index = () => {
  const shipmentData1 = {
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

  const shipmentData2 = {
    status: "In transit",
    date: "Monday, February 3",
    timeWindow: "1:00 pm - 4:00 pm",
    appointmentDetails: null,
    deliveryAddress: {
      city: "SEATTLE",
      state: "WA",
      zip: "98101"
    },
    shipFromAddress: {
      city: "DALLAS",
      state: "TX",
      zip: "75201"
    }
  };

  const shipmentData3 = {
    status: "Delivered",
    date: "Wednesday, April 9",
    timeWindow: "10:38",
    signedBy: "HECTOR",
    appointmentDetails: null,
    deliveryAddress: {
      name: "RED SMITH FOODS INC",
      city: "FORT LAUDERDALE",
      state: "FL",
      zip: "33314"
    },
    shipFromAddress: {
      name: "DCW CASING LLC",
      city: "MOUNT VERNON",
      state: "NY",
      zip: "10550"
    }
  };

  // New card - same as In Transit but with appointment details
  const shipmentData4 = {
    status: "In transit",
    date: "Monday, February 3",
    timeWindow: "1:00 pm - 4:00 pm",
    appointmentDetails: {
      date: "Monday, February 3",
      timeWindow: "9:00 am - 11:00 am",
      contact: "Nora"
    },
    deliveryAddress: {
      city: "PORTLAND",
      state: "OR",
      zip: "97201"
    },
    shipFromAddress: {
      city: "CHICAGO",
      state: "IL",
      zip: "60601"
    }
  };
  
  // Fifth card with Delivery Appointment Date status and calendar icon
  const shipmentData5 = {
    status: "Delivery Appointment Date",
    date: "Friday, April 18",
    timeWindow: "",
    appointmentDetails: {
      date: "Friday, April 18",
      timeWindow: "9:00 am - 2:00 pm",
      contact: "EMAIL"
    },
    deliveryAddress: {
      city: "BOSTON",
      state: "MA",
      zip: "02108"
    },
    shipFromAddress: {
      city: "NEW YORK",
      state: "NY",
      zip: "10001"
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Detailed Shipment Tracking Status Cards</h1>
      <div className="flex flex-wrap gap-6 justify-center">
        <ShipmentCard {...shipmentData1} />
        <ShipmentCard {...shipmentData2} />
        <ShipmentCard {...shipmentData3} customIcon={<Check />} />
        <ShipmentCard {...shipmentData4} />
        <ShipmentCard {...shipmentData5} customIcon={<Calendar className="h-6 w-6 text-white" />} />
      </div>
      <p className="mt-8 text-gray-500 text-sm">Track your packages in real-time with accurate delivery updates</p>
    </div>
  );
};

export default Index;

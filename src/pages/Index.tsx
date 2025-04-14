
import { ShipmentCard } from "@/components/ShipmentCard";
import { Check } from "lucide-react";

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
    timeWindow: "11:30 am - 11:33 am",
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Detailed Shipment Tracking Status Cards</h1>
      <div className="flex flex-wrap gap-6 justify-center">
        <ShipmentCard {...shipmentData1} />
        <ShipmentCard {...shipmentData2} />
        <ShipmentCard {...shipmentData3} customIcon={<Check />} />
      </div>
      <p className="mt-8 text-gray-500 text-sm">Track your packages in real-time with accurate delivery updates</p>
    </div>
  );
};

export default Index;


import { ShipmentCard } from "@/components/ShipmentCard";

const Index = () => {
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Detailed Shipment Tracking Status Card</h1>
      <ShipmentCard {...shipmentData} />
      <p className="mt-8 text-gray-500 text-sm">Track your package in real-time with accurate delivery updates</p>
    </div>
  );
};

export default Index;

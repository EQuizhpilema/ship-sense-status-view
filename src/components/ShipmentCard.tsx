
import { Truck, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ShipmentCardProps {
  status: string;
  date: string;
  timeWindow: string;
  appointmentDetails: {
    date: string;
    timeWindow: string;
    contact: string;
  };
  deliveryAddress: {
    city: string;
    state: string;
    zip: string;
  };
  shipFromAddress: {
    city: string;
    state: string;
    zip: string;
  };
}

export function ShipmentCard({
  status,
  date,
  timeWindow,
  appointmentDetails,
  deliveryAddress,
  shipFromAddress,
}: ShipmentCardProps) {
  // Helper function to convert to title case
  const toTitleCase = (str: string) => 
    str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

  return (
    <Card className="max-w-xs w-full overflow-hidden rounded-3xl shadow-md border border-gray-100 bg-white">
      <CardContent className="px-6 py-6 flex flex-col space-y-4">
        {/* Header with status */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-gray-900 p-2 rounded-sm">
            <Truck className="h-5 w-5 text-white" />
          </div>
          <h2 className="mt-3 text-lg font-bold text-gray-900">{toTitleCase(status)}</h2>
          <p className="text-base font-medium text-gray-900">{date}</p>
          <div className="text-sm text-gray-600 space-y-1">
            <p>Estimated Time of Arrival is Between</p>
            <p>{timeWindow}</p>
          </div>
        </div>
        
        {/* Appointment details */}
        <div className="bg-green-50 p-3 rounded-sm text-xs">
          <p className="font-bold">Your Current Delivery Appointment</p>
          <p className="text-gray-700">{appointmentDetails.date} between {appointmentDetails.timeWindow}</p>
          <p className="text-gray-700">Appointment Contact: Antonio</p>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-200"></div>
        
        {/* Origin address - Now first */}
        <div className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-gray-800 flex-shrink-0" strokeWidth={2.5} />
          <div>
            <h3 className="text-lg font-semibold">Origin</h3>
            <p className="text-gray-700 text-sm uppercase">{shipFromAddress.city}, {shipFromAddress.state} {shipFromAddress.zip}</p>
          </div>
        </div>
        
        {/* Destination address - Now second */}
        <div className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-gray-800 flex-shrink-0" strokeWidth={2.5} />
          <div>
            <h3 className="text-lg font-semibold">Destination</h3>
            <p className="text-gray-700 text-sm uppercase">{deliveryAddress.city}, {deliveryAddress.state} {deliveryAddress.zip}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

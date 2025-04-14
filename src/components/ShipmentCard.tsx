import { Truck, MapPin, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";
interface ShipmentCardProps {
  status: string;
  date: string;
  timeWindow: string;
  signedBy?: string;
  appointmentDetails: {
    date: string;
    timeWindow: string;
    contact: string;
  } | null;
  deliveryAddress: {
    name?: string;
    city: string;
    state: string;
    zip: string;
  };
  shipFromAddress: {
    name?: string;
    city: string;
    state: string;
    zip: string;
  };
  customIcon?: ReactNode;
}
export function ShipmentCard({
  status,
  date,
  timeWindow,
  signedBy,
  appointmentDetails,
  deliveryAddress,
  shipFromAddress,
  customIcon
}: ShipmentCardProps) {
  const toTitleCase = (str: string) => str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  return <Card className="max-w-xs w-full overflow-hidden rounded-3xl shadow-md border border-gray-100 bg-white">
      <CardContent className="px-6 py-6 flex flex-col space-y-4">
        {/* Header with status */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className={`
            ${status.toLowerCase() === "delivered" ? "bg-green-500 rounded-full p-3" : status.toLowerCase() === "in transit" ? "bg-gray-900 p-2 rounded-sm" : "bg-gray-900 p-2 rounded-sm"}`}>
            {customIcon ? customIcon : status.toLowerCase() === "delivered" ? <Check className="h-6 w-6 text-white" /> : <Truck className="h-5 w-5 text-white" />}
          </div>
          <h2 className="mt-3 text-lg font-bold text-gray-900">{toTitleCase(status)}</h2>
          
          {/* New condition for Delivered status */}
          {status.toLowerCase() === "delivered" && <>
              <p className="text-sm text-gray-600">Actual Delivery Date</p>
              <p className="text-base font-medium text-gray-900">{date}</p>
              <p className="text-sm text-gray-600">11:30 am - 11:30 am</p>
            </>}
          
          {/* For In Transit status, show "Estimated Delivery Date" before the date */}
          {status.toLowerCase() === "in transit" && <>
              <p className="text-sm text-gray-600">Estimated Delivery Date</p>
              <p className="text-base font-medium text-gray-900">{date}</p>
            </>}
          
          {/* For other statuses, show the date directly */}
          {status.toLowerCase() !== "in transit" && status.toLowerCase() !== "delivered" && <p className="text-base font-medium text-gray-900">{date}</p>}
          
          {signedBy && <p className="text-sm text-gray-600">Signed by: {signedBy}</p>}
          
          {!signedBy && status.toLowerCase() === "out for delivery" && <div className="text-sm text-gray-600 space-y-2">
              <p>Estimated Time of Arrival is Between</p>
              <p>{timeWindow}</p>
            </div>}
        </div>
        
        {/* Appointment details - only shown if data exists */}
        {appointmentDetails && <div className="bg-green-50 p-3 rounded-sm text-xs">
            <p className="font-bold">Your Current Delivery Appointment</p>
            <p className="text-gray-700">{appointmentDetails.date} between {appointmentDetails.timeWindow}</p>
            <p className="text-gray-700">Appointment Contact: {appointmentDetails.contact}</p>
          </div>}
        
        {/* Divider */}
        <div className="border-t border-gray-200"></div>
        
        {/* Origin address - Now first */}
        <div className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-gray-800 flex-shrink-0" strokeWidth={2.5} />
          <div>
            <h3 className="text-lg font-semibold">Origin</h3>
            {shipFromAddress.name && <p className="text-gray-700 text-sm">{shipFromAddress.name}</p>}
            <p className="text-gray-700 text-sm uppercase">
              {shipFromAddress.city}, {shipFromAddress.state} {shipFromAddress.zip}
            </p>
          </div>
        </div>
        
        {/* Destination address - Now second */}
        <div className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-gray-800 flex-shrink-0" strokeWidth={2.5} />
          <div>
            <h3 className="text-lg font-semibold">Destination</h3>
            {deliveryAddress.name && <p className="text-gray-700 text-sm">{deliveryAddress.name}</p>}
            <p className="text-gray-700 text-sm uppercase">
              {deliveryAddress.city}, {deliveryAddress.state} {deliveryAddress.zip}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>;
}
import { Truck, MapPin, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface ShipmentCardProps {
  status: string;
  statusDetail?: string;
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
    street?: string;
    city: string;
    state: string;
    zip: string;
  };
  shipFromAddress: {
    name?: string;
    street?: string;
    city: string;
    state: string;
    zip: string;
  };
  customIcon?: ReactNode;
  arrivalTime?: string;
  departureTime?: string;
  lastLocation?: {
    city: string;
    state: string;
  };
}

export function ShipmentCard({
  status,
  statusDetail,
  date,
  timeWindow,
  signedBy,
  appointmentDetails,
  deliveryAddress,
  shipFromAddress,
  customIcon,
  arrivalTime,
  departureTime,
  lastLocation
}: ShipmentCardProps) {
  const toTitleCase = (str: string) => str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

  return <Card className="max-w-xs w-full overflow-hidden rounded-3xl shadow-md border border-gray-100 bg-white">
      <CardContent className="px-6 py-6 flex flex-col space-y-4">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className={`
            ${status.toLowerCase() === "delivered" ? "bg-green-500 rounded-full p-3" : 
              status.toLowerCase() === "delivery exception" ? "bg-red-400 rounded-full p-3" :
              status.toLowerCase() === "in transit" ? "bg-gray-900 p-2 rounded-sm" : "bg-gray-900 p-2 rounded-sm"}`}>
            {customIcon ? customIcon : status.toLowerCase() === "delivered" ? <Check className="h-6 w-6 text-white" /> : <Truck className="h-5 w-5 text-white" />}
          </div>
          <h2 className="mt-3 text-lg font-bold text-gray-900">{toTitleCase(status)}</h2>
          
          {statusDetail && (
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded">
              {statusDetail}
            </span>
          )}
          
          {status.toLowerCase() === "delivered" && <>
              <p className="text-base font-medium text-gray-900">{date}</p>
            </>}
          
          {status.toLowerCase() === "in transit" && <>
              <p className="text-sm text-gray-600">Estimated Delivery Date</p>
              <p className="text-base font-medium text-gray-900">{date}</p>
            </>}
          
          {status.toLowerCase() === "delivery exception" && <>
              <p className="text-sm text-gray-600">Estimated Delivery</p>
              <p className="text-base font-medium text-gray-900">Tuesday, July 1</p>
            </>}
          
          {status.toLowerCase() !== "in transit" && status.toLowerCase() !== "delivered" && status.toLowerCase() !== "delivery exception" && <p className="text-base font-medium text-gray-900">{date}</p>}
          
          {arrivalTime && (
            <div className="flex justify-center gap-8 w-full">
              <div className="text-center">
                <p className="text-xs text-gray-500">Arrived</p>
                <p className="text-sm font-bold text-gray-900">{arrivalTime}</p>
              </div>
              {departureTime && (
                <div className="text-center">
                  <p className="text-xs text-gray-500">Departed</p>
                  <p className="text-sm font-bold text-gray-900">{departureTime}</p>
                </div>
              )}
            </div>
          )}
          
          {signedBy && <p className="text-sm text-gray-600">Signed by: {signedBy}</p>}
          
          {!signedBy && status.toLowerCase() === "out for delivery" && <div className="text-sm text-gray-600 space-y-2">
              <p>Estimated Time of Arrival is Between</p>
              <p>{timeWindow}</p>
            </div>}
        </div>
        
        {appointmentDetails && <div className="bg-green-50 p-3 rounded-sm text-xs">
            <p className="font-bold">Your Current Delivery Appointment</p>
            <p className="text-gray-700">{appointmentDetails.date} between {appointmentDetails.timeWindow}</p>
            <p className="text-gray-700">Appointment Contact: {appointmentDetails.contact}</p>
          </div>}
        
        {status.toLowerCase() === "delivery exception" && <div className="bg-red-50 p-3 rounded-sm text-xs">
            <p className="font-bold text-red-800">Road Closure</p>
            <p className="text-red-700">{date}</p>
          </div>}
        
        {status.toLowerCase() === "delivery exception" && lastLocation && (
          <div className="text-sm text-gray-700">
            <p>Last Location: {lastLocation.city}, {lastLocation.state}</p>
          </div>
        )}
        
        <div className="border-t border-gray-200"></div>
        
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-gray-900">
            {status.toLowerCase() === "delivered" ? "Ship from" : "Origin"}
          </h3>
          {shipFromAddress.name && <p className="text-gray-700 text-sm uppercase">{shipFromAddress.name}</p>}
          {shipFromAddress.street && <p className="text-gray-700 text-sm uppercase">{shipFromAddress.street}</p>}
          <p className="text-gray-700 text-sm uppercase">
            {shipFromAddress.city}, {shipFromAddress.state} {shipFromAddress.zip}
          </p>
        </div>
        
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-gray-900">
            {status.toLowerCase() === "delivered" ? "Delivered to" : "Destination"}
          </h3>
          {deliveryAddress.name && <p className="text-gray-700 text-sm uppercase">{deliveryAddress.name}</p>}
          {deliveryAddress.street && <p className="text-gray-700 text-sm uppercase">{deliveryAddress.street}</p>}
          <p className="text-gray-700 text-sm uppercase">
            {deliveryAddress.city}, {deliveryAddress.state} {deliveryAddress.zip}
          </p>
        </div>
        
        {status.toLowerCase() !== "delivered" && status.toLowerCase() !== "delivery exception" && lastLocation && (
          <div className="text-sm text-gray-700">
            <p>Last Location: {lastLocation.city}, {lastLocation.state}</p>
          </div>
        )}
      </CardContent>
    </Card>;
}

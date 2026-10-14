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
    state?: string;
  };
  etaLabel?: string;
  etaDate?: string;
  linehaulEta?: { date: string; label?: string; terminal?: string };
  iconClassName?: string;
  title?: string;
  subtitle?: string;
  alertNote?: {
    text: string;
    tone?: "amber" | "red" | "blue";
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
  lastLocation,
  etaLabel,
  etaDate,
  linehaulEta,
  iconClassName,
  title,
  subtitle,
  alertNote
}: ShipmentCardProps) {
  const toTitleCase = (str: string) => str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  const isTerminal = /terminal|network/.test(status.toLowerCase());
  // Bootstrap alert colours: pale field, dark text, solid accent bar down the left edge
  const alertTones = {
    amber: { box: "bg-amber-100 text-amber-900 border-l-amber-500" },
    red: { box: "bg-red-100 text-red-900 border-l-red-500" },
    blue: { box: "bg-blue-100 text-blue-900 border-l-blue-500" }
  };
  const alertTone = alertTones[alertNote?.tone ?? "amber"];

  return <Card className="max-w-xs w-full overflow-hidden rounded-3xl shadow-md border border-gray-100 bg-white">
      <CardContent className="px-6 py-6 flex flex-col space-y-4">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className={iconClassName ?? (status.toLowerCase() === "delivered" || status.toLowerCase() === "delivery exception"
            ? "bg-white rounded-full p-3 shadow-sm"
            : "bg-white p-2 rounded-sm shadow-sm")}>
            {customIcon ? customIcon : status.toLowerCase() === "delivered" ? <Check className="h-7 w-7 text-gray-700" /> : <Truck className="h-6 w-6 text-gray-700" />}
          </div>
          <div className="mt-3 flex flex-col items-center">
            <h2 className="text-lg font-bold leading-tight text-gray-900">{toTitleCase(title ?? status)}</h2>
            {subtitle && <p className="mt-0.5 text-xs font-medium text-gray-500">{subtitle}</p>}
          </div>
          {subtitle && <div className="h-1" aria-hidden="true" />}
          
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
              <p className="!mt-0.5 text-base font-medium text-gray-900">{date}</p>

            </>}
          
          {status.toLowerCase() === "delivery exception" && <>
              <p className="text-sm text-gray-600">Estimated Delivery</p>
              <p className="!mt-0.5 text-base font-medium text-gray-900">Tuesday, July 1</p>

            </>}
          
          {status.toLowerCase() !== "in transit" && status.toLowerCase() !== "delivered" && status.toLowerCase() !== "delivery exception" && <>
              {etaDate && <p className="text-sm text-gray-500">{date}</p>}
              {etaLabel && <p className={`text-sm text-gray-600 ${etaDate ? "!mt-3" : ""}`}>{etaLabel}</p>}
              <p className={`text-base font-medium text-gray-900 ${etaLabel ? "!mt-0.5" : ""}`}>{etaDate ?? date}</p>

            </>}

          {linehaulEta && (
            <div className="w-full rounded-md bg-gray-100 text-gray-800 px-3 py-2 text-center">
              <p className="text-xs font-medium">{linehaulEta.label ?? "Est. Arrival at Destination Terminal"}</p>
              <p className="text-sm font-semibold">{linehaulEta.date}</p>
              {linehaulEta.terminal && <p className="text-xs">{linehaulEta.terminal}</p>}
            </div>
          )}
          
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
          
          {!signedBy && status.toLowerCase() === "out for delivery" && <div className="text-sm text-gray-600">
              <p>Estimated Time of Arrival is Between</p>
              <p className="mt-0.5">{timeWindow}</p>
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
        
        {alertNote && <div className={`rounded-r-md rounded-l-none border-l-4 p-3 pl-4 text-xs ${alertTone.box}`}>
            <p className="font-semibold">{alertNote.text}</p>
          </div>}
        
        {(status.toLowerCase() === "delivery exception" || isTerminal) && lastLocation && (
          <div className={`text-sm text-gray-700 ${isTerminal ? "text-center" : ""}`}>
            <p>{isTerminal ? "Last location" : "Last Location"}: {lastLocation.city}{lastLocation.state ? `, ${lastLocation.state}` : ""}</p>
          </div>
        )}
        
        <div className="border-t border-gray-200"></div>
        
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-1">
            {isTerminal && <MapPin className="h-4 w-4" />}
            {status.toLowerCase() === "delivered" || isTerminal ? "Ship from" : "Origin"}
          </h3>
          {shipFromAddress.name && <p className="text-gray-700 text-sm uppercase">{shipFromAddress.name}</p>}
          {shipFromAddress.street && <p className="text-gray-700 text-sm uppercase">{shipFromAddress.street}</p>}
          <p className="text-gray-700 text-sm uppercase">
            {shipFromAddress.city}, {shipFromAddress.state} {shipFromAddress.zip}
          </p>
        </div>
        
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-1">
            {isTerminal && <MapPin className="h-4 w-4" />}
            {status.toLowerCase() === "delivered" ? "Delivered to" : isTerminal ? "Deliver to" : "Destination"}
          </h3>
          {deliveryAddress.name && <p className="text-gray-700 text-sm uppercase">{deliveryAddress.name}</p>}
          {deliveryAddress.street && <p className="text-gray-700 text-sm uppercase">{deliveryAddress.street}</p>}
          <p className="text-gray-700 text-sm uppercase">
            {deliveryAddress.city}, {deliveryAddress.state} {deliveryAddress.zip}
          </p>
        </div>
        
        {status.toLowerCase() !== "delivered" && status.toLowerCase() !== "delivery exception" && !isTerminal && lastLocation && (
          <div className="text-sm text-gray-700">
            <p>Last Location: {lastLocation.city}{lastLocation.state ? `, ${lastLocation.state}` : ""}</p>
          </div>
        )}
      </CardContent>
    </Card>;
}

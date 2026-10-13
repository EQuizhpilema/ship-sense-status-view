import { useState } from "react";
import { History, ChevronUp, ChevronDown } from "lucide-react";

export interface HistoryEvent {
  date: string;
  time: string;
  event: string;
  location: string;
}

interface ShipmentHistoryProps {
  proNumber: string;
  events: HistoryEvent[];
}

export function ShipmentHistory({ proNumber, events }: ShipmentHistoryProps) {
  const [open, setOpen] = useState(true);

  return (
    <div className="w-full max-w-5xl bg-white border border-gray-200 rounded">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 border-b border-gray-200"
      >
        <span className="flex items-center gap-2 text-amber-500">
          <History className="h-5 w-5" />
          Shipment history - {proNumber}
        </span>
        {open ? <ChevronUp className="h-5 w-5 text-blue-600" /> : <ChevronDown className="h-5 w-5 text-blue-600" />}
      </button>
      {open && (
        <div className="px-6 py-4">
          {events.map((e, i) => (
            <div key={i} className="grid grid-cols-[1fr_2fr_1fr] items-center gap-4 px-5 py-3 border-b border-gray-200 text-sm text-gray-700 hover:bg-gray-50">
              <div>
                <p>{e.date}</p>
                <p>{e.time}</p>
              </div>
              <div>
                <p>{e.event}</p>
                <p>{e.location}</p>
              </div>
              <div className="flex justify-end">
                {(() => {
                  const ev = e.event.toLowerCase();
                  if (ev === "freight unloaded")
                    return <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">At Origin Terminal</span>;
                  if (ev.startsWith("trailer departed"))
                    return <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">In Transit</span>;
                  if (ev.startsWith("trailer arrived"))
                    return <span className="bg-teal-100 text-teal-800 text-xs font-semibold px-3 py-1 rounded-full">Arrived at Destination Terminal</span>;
                  if (ev === "picked up")
                    return <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">Picked Up</span>;
                  if (ev === "appointment required for delivery")
                    return <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded">Delivery Appointment Needed</span>;
                  return null;
                })()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

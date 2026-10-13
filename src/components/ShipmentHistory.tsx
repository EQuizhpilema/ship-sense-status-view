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
            <div key={i} className="grid grid-cols-[1fr_2fr] gap-4 px-5 py-3 border-b border-gray-200 text-sm text-gray-700 hover:bg-gray-50">
              <div>
                <p>{e.date}</p>
                <p>{e.time}</p>
              </div>
              <div>
                <p>{e.event}</p>
                <p>{e.location}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

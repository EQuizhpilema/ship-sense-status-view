import { useState } from "react";
import { History, ChevronUp, ChevronDown } from "lucide-react";

export interface HistoryEvent {
  date: string;
  time: string;
  event: string;
  location: string;
}

export interface PendingStep {
  label: string;
  note?: string;
  tone?: "amber" | "gray";
  /** Destination terminal ETA, shown as plain blue text */
  info?: string;
}

interface ShipmentHistoryProps {
  proNumber: string;
  events: HistoryEvent[];
  /** Show a vertical progress rail connecting the pills */
  showProgress?: boolean;
  /** Upcoming steps shown as ghost rows at the top (nearest step last) */
  pendingSteps?: PendingStep[];
  /** Estimated delivery date shown on the Out for Delivery ghost row */
  etaDate?: string;
}

const pill = "text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap";

function badgeFor(event: string) {
  const ev = event.toLowerCase();
  if (ev === "freight unloaded") return { label: "At Origin Terminal", cls: "bg-gray-100 text-gray-800", dot: "bg-gray-500" };
  if (ev.startsWith("trailer departed")) return { label: "In Transit", cls: "bg-blue-100 text-blue-800", dot: "bg-blue-600" };
  if (ev.startsWith("trailer arrived")) return { label: "Arrived at Destination Terminal", cls: "bg-teal-100 text-teal-800", dot: "bg-teal-600" };
  if (ev === "picked up") return { label: "Picked Up", cls: "bg-green-100 text-green-800", dot: "bg-green-600" };
  if (ev === "appointment required for delivery") return { label: "Delivery Appointment Needed", cls: "bg-amber-100 text-amber-800 !rounded", dot: "bg-amber-500" };
  return null;
}

export function ShipmentHistory({ proNumber, events, showProgress = false, pendingSteps = [], etaDate }: ShipmentHistoryProps) {
  const [open, setOpen] = useState(true);

  const milestoneIdx = events.map((e, i) => (badgeFor(e.event) ? i : -1)).filter((i) => i >= 0);
  const firstMilestone = milestoneIdx[0] ?? -1;
  const lastMilestone = milestoneIdx[milestoneIdx.length - 1] ?? -1;
  const hasPending = showProgress && pendingSteps.length > 0;

  // Rail segment for a completed row: top half / bottom half visibility
  const railFor = (i: number) => {
    if (!showProgress || firstMilestone < 0 || i > lastMilestone) return null;
    const top = i > firstMilestone || hasPending;
    const bottom = i < lastMilestone;
    if (i < firstMilestone && !hasPending) return null;
    return { top, bottom };
  };

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
          {hasPending &&
            pendingSteps.map((s, i) => (
              <div key={`p-${i}`} className="grid grid-cols-[1fr_2fr_1fr] items-center gap-4 px-5 py-3 border-b border-dashed border-gray-200 text-sm text-gray-400">
                <div><p>Upcoming</p></div>
                <div>
                  {s.note && <p className={s.tone === "amber" ? "text-amber-700" : ""}>{s.note}</p>}
                  {s.info && <p className="text-blue-600">{s.info}</p>}
                  {etaDate && s.label.toLowerCase() === "out for delivery" && (
                    <p>Estimated Delivery {etaDate}</p>
                  )}
                </div>
                <div className="relative flex items-center justify-end self-stretch pr-8">
                  <span className={`absolute right-[11px] bottom-[-13px] border-l-2 border-dashed border-gray-300 ${i === 0 ? "top-1/2" : "top-[-13px]"}`} />
                  <span className={`absolute right-[6px] h-3 w-3 rounded-full border-2 border-dashed bg-white ${s.tone === "amber" ? "border-amber-500" : "border-gray-400"}`} />
                  <span className={`${pill} border border-dashed ${s.tone === "amber" ? "border-amber-400 text-amber-700 bg-amber-50" : "border-gray-300 text-gray-500"}`}>
                    {s.label}
                  </span>
                </div>
              </div>
            ))}
          {events.map((e, i) => {
            const b = badgeFor(e.event);
            const rail = railFor(i);
            return (
              <div key={i} className="grid grid-cols-[1fr_2fr_1fr] items-center gap-4 px-5 py-3 border-b border-gray-200 text-sm text-gray-700 hover:bg-gray-50">
                <div>
                  <p>{e.date}</p>
                  <p>{e.time}</p>
                </div>
                <div>
                  <p>{e.event}</p>
                  <p>{e.location}</p>
                </div>
                <div className={`relative flex items-center justify-end ${showProgress ? "self-stretch pr-8" : ""}`}>
                  {rail?.top && (
                    <span className={`absolute right-[11px] top-[-13px] bottom-1/2 ${i === 0 && hasPending ? "border-l-2 border-dashed border-gray-300" : "w-0.5 bg-gray-400"}`} />
                  )}
                  {rail?.bottom && <span className="absolute right-[11px] top-1/2 bottom-[-13px] w-0.5 bg-gray-400" />}
                  {showProgress && b && <span className={`absolute right-[6px] h-3 w-3 rounded-full ring-2 ring-white ${b.dot}`} />}
                  {b && <span className={`${pill} ${b.cls}`}>{b.label}</span>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

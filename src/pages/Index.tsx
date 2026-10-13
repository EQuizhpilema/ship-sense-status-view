import { useState } from "react";
import { ShipmentCard } from "@/components/ShipmentCard";
import { ShipmentHistory, type HistoryEvent } from "@/components/ShipmentHistory";
import { Check, Calendar, Triangle } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckFast } from "@fortawesome/free-solid-svg-icons";

const Index = () => {
  const [selected, setSelected] = useState<number | null | "history">(null);
  // Font Awesome "truck-fast": a truck in motion, used for the in-network statuses
  const networkIcon = <FontAwesomeIcon icon={faTruckFast} className="h-5 w-5 text-white" />;
  const networkIconBare = <FontAwesomeIcon icon={faTruckFast} className="h-8 w-8 text-gray-700" />;

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
    },
    lastLocation: {
      city: "Portland",
      state: "OR"
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
    },
    lastLocation: {
      city: "Boise",
      state: "ID"
    }
  };

  const shipmentData3 = {
    status: "Delivered",
    statusDetail: "DELIVERED CLEAR",
    date: "Friday, February 6",
    timeWindow: "",
    signedBy: "SCOTT KARR",
    appointmentDetails: null,
    deliveryAddress: {
      name: "TECH DATA RETURNS",
      street: "5104 LIBERTY WAY DOCK DOOR 10",
      city: "AURORA",
      state: "CO",
      zip: "80019"
    },
    shipFromAddress: {
      name: "PARAGON SYSTEMS INTEGRATION",
      street: "20 SUNSET DR",
      city: "BASALT",
      state: "CO",
      zip: "81621"
    },
    arrivalTime: "2:43pm",
    departureTime: "3:00pm"
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
    },
    lastLocation: {
      city: "Salt Lake City",
      state: "UT"
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
    },
    lastLocation: {
      city: "Hartford",
      state: "CT"
    }
  };

  // New delivery exception card
  const shipmentData6 = {
    status: "Delivery Exception",
    date: "Monday, June 30 10:05am",
    timeWindow: "",
    appointmentDetails: null,
    deliveryAddress: {
      city: "SACRAMENTO",
      state: "CA",
      zip: "95814"
    },
    shipFromAddress: {
      city: "LOS ANGELES",
      state: "CA",
      zip: "90210"
    },
    lastLocation: {
      city: "Bakersfield",
      state: "CA"
    }
  };

  const cards: { label: string; node: React.ReactNode }[] = [
    { label: "Out for Delivery", node: <ShipmentCard {...shipmentData1} /> },
    { label: "In Transit", node: <ShipmentCard {...shipmentData2} customIcon={networkIcon} /> },
    { label: "Delivered", node: <ShipmentCard {...shipmentData3} customIcon={<Check />} /> },
    { label: "In Transit (with Appointment)", node: <ShipmentCard {...shipmentData4} customIcon={networkIcon} /> },
    { label: "Delivery Appointment Date", node: <ShipmentCard {...shipmentData5} customIcon={<Calendar className="h-6 w-6 text-white" />} /> },
    { label: "Delivery Exception", node: <ShipmentCard {...shipmentData6} customIcon={<Triangle className="h-6 w-6 text-white" />} /> },
    {
      label: "Arrived at Destination Terminal",
      node: (
        <ShipmentCard
          status="Arrived at Destination Terminal"
          date="Monday, October 12 2:00pm"
          timeWindow=""
          appointmentDetails={null}
          customIcon={networkIcon}
          shipFromAddress={{ name: "AFX INC", street: "2345 ERNIE KRUEGER CIRCLE", city: "WAUKEGAN", state: "IL", zip: "60087" }}
          deliveryAddress={{ name: "SYNC LIGHTING AND DESIGN LLC", street: "530 CHESTNUT RIDGE RD", city: "WOODCLIFF LAKE", state: "NJ", zip: "07677" }}
          lastLocation={{ city: "Woodbridge", state: "NJ" }}
        />
      ),
    },
    {
      label: "At Origin Terminal",
      node: (
        <ShipmentCard
          status="At Origin Terminal"
          date="Thursday, October 8 7:43am"
          timeWindow=""
          appointmentDetails={null}
          customIcon={networkIconBare}
          iconClassName="bg-transparent p-0"
          shipFromAddress={{ name: "ENERGY LIGHT", street: "1881 ROSE RD", city: "LAKE ZURICH", state: "IL", zip: "60047" }}
          deliveryAddress={{ name: "VOSS LIGHTING", street: "1251 RED FOX RD", city: "ARDEN HILLS", state: "MN", zip: "55112" }}
          lastLocation={{ city: "The Custom Companies" }}
        />
      ),
    },
    {
      label: "Transfer to Interline",
      node: (
        <ShipmentCard
          status="Transfer to Interline"
          date="Friday, October 9 4:15pm"
          timeWindow=""
          appointmentDetails={null}
          customIcon={networkIcon}
          shipFromAddress={{ name: "ENERGY LIGHT", street: "1881 ROSE RD", city: "LAKE ZURICH", state: "IL", zip: "60047" }}
          deliveryAddress={{ name: "VOSS LIGHTING", street: "1251 RED FOX RD", city: "ARDEN HILLS", state: "MN", zip: "55112" }}
          lastLocation={{ city: "The Custom Companies" }}
        />
      ),
    },
    {
      label: "In Transit, Freight Moving Through Carrier Network",
      node: (
        <ShipmentCard
          status="In Transit, freight moving through carrier network"
          date="Tuesday, October 13 12:00pm"
          timeWindow=""
          appointmentDetails={null}
          customIcon={networkIcon}
          shipFromAddress={{ name: "STERLING SPRING LLC", street: "5432 W 54TH STREET", city: "CHICAGO", state: "IL", zip: "60638" }}
          deliveryAddress={{ name: "MOTORCAR PARTS & ACCESS", street: "2306 AVENIDA COSTA ESTE", city: "SAN DIEGO", state: "CA", zip: "92154" }}
          lastLocation={{ city: "San Diego", state: "CA" }}
        />
      ),
    },
  ];

  // Shipment history — add new events to the top of this list
  const historyEvents: HistoryEvent[] = [
    { date: "10/09/26", time: "1:25pm", event: "Trailer Departed", location: "Northlake, IL" },
    { date: "10/09/26", time: "10:23am", event: "Loaded On Trailer", location: "Northlake, IL" },
    { date: "10/08/26", time: "7:11am", event: "Scanned On Dock", location: "The Custom Companies" },
    { date: "10/08/26", time: "12:48am", event: "Freight Unloaded", location: "Northlake, IL" },
    { date: "10/08/26", time: "12:47am", event: "Reclass", location: "In Transit" },
    { date: "10/07/26", time: "2:54pm", event: "Picked Up", location: "Lake Zurich, IL" },
    { date: "10/07/26", time: "4:27am", event: "Appointment Required For Delivery", location: "Pending" },
    { date: "10/07/26", time: "4:08am", event: "Pickup Request Received", location: "Customer Care Center" },
  ];

  const navBtn = (active: boolean) =>
    `text-left text-sm px-3 py-2 rounded ${active ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"}`;

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-72 shrink-0 border-r border-gray-200 bg-white p-4 sticky top-0 h-screen overflow-y-auto">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3 px-2">Status Cards</h2>
        <nav className="flex flex-col gap-1">
          <button onClick={() => setSelected(null)} className={navBtn(selected === null)}>
            Show All
          </button>
          {cards.map((c, i) => (
            <button key={c.label + i} onClick={() => setSelected(i)} className={navBtn(selected === i)}>
              {c.label}
            </button>
          ))}
        </nav>
        <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mt-6 mb-3 px-2">Shipment History</h2>
        <nav className="flex flex-col gap-1">
          <button onClick={() => setSelected("history")} className={navBtn(selected === "history")}>
            Shipment History - 17560215
          </button>
        </nav>
      </aside>
      <main className="flex-1 flex flex-col items-center p-8">
        {selected === "history" ? (
          <ShipmentHistory proNumber="17560215" events={historyEvents} />
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-8 text-gray-800">
              {selected === null ? "Detailed Shipment Tracking Status Cards" : cards[selected].label}
            </h1>
            <div className="flex flex-wrap gap-6 justify-center">
              {selected === null ? cards.map((c, i) => <div key={i}>{c.node}</div>) : cards[selected].node}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Index;

import { ShipmentCard } from "@/components/ShipmentCard";
import { Check, Calendar, Triangle } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckFast } from "@fortawesome/free-solid-svg-icons";

const Index = () => {
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Detailed Shipment Tracking Status Cards</h1>
      <div className="flex flex-wrap gap-6 justify-center">
        <ShipmentCard {...shipmentData1} />
        <ShipmentCard {...shipmentData2} customIcon={networkIcon} />
        <ShipmentCard {...shipmentData3} customIcon={<Check />} />
        <ShipmentCard {...shipmentData4} customIcon={networkIcon} />
        <ShipmentCard {...shipmentData5} customIcon={<Calendar className="h-6 w-6 text-white" />} />
        <ShipmentCard {...shipmentData6} customIcon={<Triangle className="h-6 w-6 text-white" />} />
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
      </div>
      <p className="mt-8 text-gray-500 text-sm">Track your packages in real-time with accurate delivery updates</p>
    </div>
  );
};

export default Index;

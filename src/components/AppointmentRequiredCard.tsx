import { MdbScope } from "@/components/MdbScope";

interface Address {
  name?: string;
  street?: string;
  city: string;
  state: string;
  zip?: string;
}

interface AppointmentRequiredCardProps {
  title?: string;
  lastLocation?: string;
  estimatedDelivery: string;
  contact: {
    heading?: string;
    phone: string;
    email: string;
  };
  shipFrom: Address;
  deliverTo: Address;
}

const line = (a: Address) =>
  [a.name, a.street, `${a.city}, ${a.state}${a.zip ? ` ${a.zip}` : ""}`].filter(Boolean);

// A zero-width space after the "@" lets a long address wrap there instead of
// mid-word when the card is narrow.
const wrapEmail = (email: string) => email.replace("@", "@\u200B");

const addressBlock = (heading: string, a: Address) => (
  <div className="cli-address mb-3">
    <h3 className="h6 d-flex align-items-center gap-2 mb-1">
      <span className="material-symbols-outlined">place</span>
      {heading}
    </h3>
    {line(a).map((text) => (
      <p key={text} className="text-muted small text-uppercase mb-0">
        {text}
      </p>
    ))}
  </div>
);

/**
 * "Appointment Required For Delivery" status card.
 *
 * Built on the MDB Bootstrap + FACTS12 conventions: `card` / `card-body` /
 * `alert` markup, Material Symbols Outlined icons, and theme color tokens only.
 * `edit_calendar` is the appointment glyph with a pencil — the calendar icon,
 * but signalling the reader still has to set the appointment up.
 */
export function AppointmentRequiredCard({
  title = "Appointment Required For Delivery",
  lastLocation,
  estimatedDelivery,
  contact,
  shipFrom,
  deliverTo,
}: AppointmentRequiredCardProps) {
  const phoneHref = `tel:${contact.phone.replace(/[^\d+]/g, "")}`;

  return (
    <MdbScope className="w-full max-w-xs">
      <div className="card border rounded-4 shadow-1">
        <div className="card-body p-4">
          <div className="d-flex flex-column align-items-center text-center">
            <span className="cli-icon-tile">
              <span className="material-symbols-outlined">edit_calendar</span>
            </span>
            <h2 className="h5 fw-bold mt-3 mb-1">{title}</h2>
            {lastLocation && <p className="text-muted small mb-0">Last location: {lastLocation}</p>}
          </div>

          <div className="text-center mt-4">
            <p className="text-muted text-uppercase small mb-1">Estimated Delivery</p>
            <p className="fw-bold mb-0">{estimatedDelivery}</p>
          </div>

          <div className="alert cli-info-note mt-4 mb-0" role="alert">
            <p className="fw-bold mb-2">{contact.heading ?? "Contact Customer Service at"}</p>
            <a className="cli-contact d-flex align-items-center gap-2 mb-1" href={phoneHref}>
              <span className="material-symbols-outlined">call</span>
              <span>{contact.phone}</span>
            </a>
            <a className="cli-contact d-flex align-items-center gap-2" href={`mailto:${contact.email}`}>
              <span className="material-symbols-outlined">mail</span>
              <span>{wrapEmail(contact.email)}</span>
            </a>
          </div>

          <hr className="my-4" />

          {addressBlock("Ship from", shipFrom)}
          {addressBlock("Deliver to", deliverTo)}
        </div>
      </div>
    </MdbScope>
  );
}

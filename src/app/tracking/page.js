import TrackingClient from "@/components/TrackingClient/TrackingClient";

export const metadata = {
  title: "Track a Shipment",
  description:
    "Access shipment status, documents and your responsible contact at Crystal Express.",
};

export default function TrackingPage() {
  return <TrackingClient />;
}

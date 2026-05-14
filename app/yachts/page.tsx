import type { Metadata } from "next";
import YachtsPageClient from "./YachtsPageClient";

export const metadata: Metadata = {
  title: "Yacht Fleet | Party Yacht Goa",
  description: "Browse our fleet of 11 premium yachts for charter in Goa. Sunset cruises, birthday parties, bachelor parties, DJ nights & corporate events. Prices from ₹8,000.",
  alternates: { canonical: "/yachts" },
};

export default function YachtsPage() {
  return <YachtsPageClient />;
}

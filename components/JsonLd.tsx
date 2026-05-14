// JSON-LD Structured Data for SEO
// Adds LocalBusiness + Service schema to every page

export default function JsonLd() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "TouristInformationCenter"],
    "@id": "https://partyyachtgoa.com/#business",
    name: "Party Yacht Goa",
    description:
      "Goa's premier luxury yacht charter service. Private yacht charters for parties, sunset cruises, birthdays, bachelor parties, corporate events, and romantic experiences on the Arabian Sea.",
    url: "https://partyyachtgoa.com",
    logo: "https://partyyachtgoa.com/favicon.png",
    image: [
      "https://partyyachtgoa.com/yachts/sunset-42/sunset-42-1.jpeg",
      "https://partyyachtgoa.com/yachts/orca/orca-1.jpeg",
      "https://partyyachtgoa.com/yachts/polaris/polaris-1.jpeg",
    ],
    telephone: "+918960070105",
    email: "hello@partyyachtgoa.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Panaji Marina",
      addressLocality: "Panaji",
      addressRegion: "Goa",
      postalCode: "403001",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 15.4909,
      longitude: 73.8278,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "08:00",
        closes: "22:00",
      },
    ],
    priceRange: "₹₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, Credit Card, UPI, Bank Transfer",
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: { "@type": "GeoCoordinates", latitude: 15.4909, longitude: 73.8278 },
      geoRadius: "50000",
    },
    sameAs: [
      "https://instagram.com/partyyachtgoa",
      "https://facebook.com/partyyachtgoa",
      "https://youtube.com/@partyyachtgoa",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "247",
      bestRating: "5",
      worstRating: "1",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Yacht Charter Services",
      itemListElement: [
        { "@type": "Offer", name: "Sunset Cruise", price: "8000", priceCurrency: "INR" },
        { "@type": "Offer", name: "Birthday Party Yacht", price: "12000", priceCurrency: "INR" },
        { "@type": "Offer", name: "Bachelor Party Yacht", price: "15000", priceCurrency: "INR" },
        { "@type": "Offer", name: "Corporate Yacht Event", price: "20000", priceCurrency: "INR" },
        { "@type": "Offer", name: "DJ Yacht Night", price: "18000", priceCurrency: "INR" },
        { "@type": "Offer", name: "Proposal Setup Yacht", price: "12000", priceCurrency: "INR" },
      ],
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much does it cost to rent a yacht in Goa?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yacht rentals in Goa start from ₹8,000 for a 2-hour sunset cruise for small groups. Party yachts for larger groups typically range from ₹15,000 to ₹25,000+ per cruise. Prices depend on the yacht, duration, and group size.",
        },
      },
      {
        "@type": "Question",
        name: "How many guests can a party yacht in Goa accommodate?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our fleet accommodates groups from 2 to 50 guests. Small yachts like Sea Ray and Manta Ray are perfect for intimate groups of up to 10-12. Our largest vessel, Sunset 42, can host up to 50 guests for parties.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide DJ and music on the yacht?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Our party yachts like Sunset 42 and MV Krishna come equipped with professional DJ systems, full LED lighting rigs, and premium sound systems. We also provide Bluetooth audio on smaller yachts.",
        },
      },
      {
        "@type": "Question",
        name: "Can I bring my own food and drinks on the yacht?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you are welcome to bring your own food and beverages. We also have bar setup services available. Please inform us during booking if you have specific catering requirements.",
        },
      },
      {
        "@type": "Question",
        name: "How do I book a yacht in Goa?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can book via WhatsApp at +91 89600 70105, or use our online booking form. Simply tell us your date, group size, and occasion — we'll confirm availability and send you a quote within 15 minutes.",
        },
      },
      {
        "@type": "Question",
        name: "Are your yachts safe? Do you have safety equipment?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. All our yachts are fully insured, regularly inspected, and carry life jackets, first aid kits, and emergency equipment. Every voyage has a trained, certified crew on board.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

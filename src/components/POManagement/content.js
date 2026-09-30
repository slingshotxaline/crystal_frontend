// All approved copy for the PO Management page lives here so business sign-off
// only ever touches one file. Agency notes from the brief are NOT included.

export const HERO = {
  eyebrow: "Purchase Order Management",
  title: "Keep Your Orders Moving",
  intro:
    "Give your sourcing plans a clearer path to shipment. Crystal Express Limited helps connect order requirements with the preparation and movement of your cargo.",
  primaryCta: "Discuss Your Requirements",
  secondaryCta: "Explore the Process",
};

export const OVERVIEW = {
  title: "A Clearer Picture of Every Order",
  paragraphs: [
    "A purchase order brings together products, quantities and delivery expectations. As plans change, keeping that information aligned across suppliers and freight arrangements becomes essential.",
    "Crystal Express Limited works with your nominated contacts to organise order updates and identify the actions needed to prepare cargo for shipment. We agree the responsibilities and communication routine at the outset, giving your team a practical basis for decisions throughout the order cycle.",
  ],
  flow: [
    { label: "Order", detail: "References, quantities, dates" },
    { label: "Readiness", detail: "Supplier updates, actions" },
    { label: "Shipment", detail: "Preparation, freight handover" },
  ],
};

export const SCOPE = {
  title: "Support Built Around Your Orders",
  intro:
    "Select the activities that fit your sourcing operation, with responsibilities defined before the service begins.",
  items: [
    {
      icon: "document",
      title: "Order information",
      text: "Bring the agreed order references, quantities, dates and instructions into a consistent working record.",
    },
    {
      icon: "chat",
      title: "Supplier communication",
      text: "Establish who provides each update and how changes are communicated to the relevant contacts.",
    },
    {
      icon: "box",
      title: "Shipping preparation",
      text: "Review readiness information alongside the intended shipping arrangement and flag decisions that need customer input.",
    },
    {
      icon: "report",
      title: "Progress reporting",
      text: "Use an agreed report to show the current position, outstanding actions and the next update required.",
    },
  ],
  note: "Service coverage, reporting frequency and available tools are agreed for each customer. Any connection to customer systems is assessed separately.",
};

export const WORKFLOW = {
  id: "process",
  title: "How We Coordinate Your Orders",
  intro:
    "An agreed working process helps everyone understand the next action and the information needed to move forward.",
  steps: [
    {
      title: "Agree the working plan",
      text: "Define the order data, contact points, update schedule and matters that require your approval.",
    },
    {
      title: "Establish the order record",
      text: "Check the information received and resolve missing references or instructions with the nominated contacts.",
    },
    {
      title: "Review progress and changes",
      text: "Collect updates at agreed intervals and highlight differences from the working plan for review.",
    },
    {
      title: "Prepare the shipping handover",
      text: "Connect the latest order position with cargo preparation and the agreed freight arrangements. Refer changes requiring authorisation to your team.",
    },
    {
      title: "Record the agreed outcome",
      text: "Update the record using available shipment or receipt information, and identify any open items that need follow-up.",
    },
  ],
};

export const VALUE = {
  title: "More Clarity for Your Next Decision",
  items: [
    {
      icon: "flag",
      title: "Know what needs attention",
      text: "See outstanding actions and changed dates in a consistent format so your team can prioritise its follow-up.",
    },
    {
      icon: "share",
      title: "Plan with shared information",
      text: "Give sourcing and logistics contacts a common view of the order position when discussing shipping decisions.",
    },
    {
      icon: "trace",
      title: "Keep decisions traceable",
      text: "Maintain a useful record of updates and approvals to support handovers and later review.",
    },
  ],
};

export const FAQ = {
  title: "Frequently Asked Questions",
  items: [
    {
      q: "Who is this service intended for?",
      a: "It is intended for businesses that need a more organised way to coordinate purchase order updates with their suppliers and shipping arrangements. The appropriate scope depends on the sourcing model and available information.",
    },
    {
      q: "What should we share for an initial discussion?",
      a: "A summary of your supplier locations, order volumes, transport needs and current reporting process is a useful starting point. Detailed order data can be shared later through an agreed channel.",
    },
    {
      q: "How often will updates be provided?",
      a: "The reporting schedule is agreed when the service is set up. Update availability also depends on the information received from the participating contacts.",
    },
    {
      q: "What happens when an order changes?",
      a: "Changes are recorded and referred to the agreed contacts. Decisions affecting quantities, dates or shipping instructions remain subject to the customer’s approval process.",
    },
    {
      q: "Can the service work with our existing tools?",
      a: "Your current workflow can be reviewed during the initial discussion. Access to systems, data exchange and any development work must be agreed before implementation.",
    },
  ],
};

export const ENQUIRY = {
  id: "enquiry",
  title: "Let Us Understand Your Order Flow",
  body: "Tell us where your orders originate, how you receive updates and where you need better coordination. We can discuss a working approach that fits your requirements.",
  privacyNote:
    "Please do not send confidential purchase order files through this form. Detailed order data can be shared later through an agreed channel.",
  button: "Contact Crystal Express",
  success:
    "Thank you for your enquiry. Your message has been submitted to Crystal Express Limited.",
  failure:
    "Your message could not be sent. Please try again or use the contact details on our",
};



// Optional photography. Leave a slot as null until the selected image is
// approved. Text is never baked into photos. Example once approved:
// hero: { src: '/images/po-management/hero.webp', width: 2400, height: 1029 }
export const PO_IMAGES = {
  hero: { src: "/assets/Digital/pobanner2.jpg", width: 2400, height: 1029 },
   overview: {
    src: "/assets/Digital/posec1.jpg",   // file goes in /public/images/
    alt: "Purchase order documents and a buyer reviewing orders",
    width: 1600,
    height: 686,
    caption: "Purchase order documents and a buyer reviewing orders", // optional
  },
  workflow: [
    {
      src: "/assets/Digital/poworkflow1.jpg",
      alt: "Cargo being packed at a warehouse",
      width: 800,
      height: 600,
      caption: "Cargo being packed at a warehouse",
    },
    {
    src: "/assets/Digital/poworkflow2.jpg",
      alt: "Containers being loaded at port",
      width: 800,
      height: 600,
      caption: "Containers being loaded at port",
    },
    {
    src: "/assets/Digital/poworkflow3.jpg",
      alt: "Shipment handover to a freight truck",
      width: 800,
      height: 600,
      caption: "Shipment handover to a freight truck",
    },
  ],
  faq: {
   src: "/assets/Digital/pofaqoverimage.jpg",
    alt: "Air and ocean freight moving cargo worldwide",
    width: 1600,
    height: 686,
    caption: "Air and ocean freight moving cargo worldwide",
  },
};

export const services = [
  { number: "01", title: "Homes", text: "Interiors, exteriors, trim, doors, ceilings, and detailed finish work for lived-in spaces.", tag: "Residential", image: "/FB_IMG_1787616069960.jpg" },
  { number: "02", title: "Decks & fences", text: "Preparation, paint, and stain systems that help outdoor surfaces stand up to the elements.", tag: "Outdoor", image: "/FB_IMG_1787616116250.jpg" },
  { number: "03", title: "Businesses", text: "Professional painting for offices, storefronts, rentals, and light commercial environments.", tag: "Commercial", image: "/theater-wide-hd.webp" },
  { number: "04", title: "Objects & more", text: "Picnic tables, furniture, sheds, railings, and one-off projects that still deserve a fine finish.", tag: "Specialty", image: "/FB_IMG_1787616132492.jpg" },
];

export const projects = [
  {
    title: "Blue exterior transformation",
    type: "Exterior",
    note: "Siding · Trim · Entry",
    images: [
      "/FB_IMG_1787616069960.jpg", "/FB_IMG_1787616054378.jpg", "/FB_IMG_1787616025908.jpg",
      "/FB_IMG_1787616016254.jpg", "/FB_IMG_1787616064801.jpg", "/FB_IMG_1787616087430.jpg",
      "/FB_IMG_1787616093875.jpg",
    ],
  },
  {
    title: "Deck & red exterior refresh",
    type: "Outdoor",
    note: "Deck · Siding · Railings",
    images: ["/FB_IMG_1787616116250.jpg", "/FB_IMG_1787616110560.jpg", "/FB_IMG_1787616113747.jpg"],
  },
  {
    title: "Historic home exterior",
    type: "Exterior",
    note: "Siding · Trim · Details",
    images: [
      "/FB_IMG_1787616132492.jpg", "/FB_IMG_1787616142092.jpg", "/FB_IMG_1787616135052.jpg",
      "/FB_IMG_1787616129533.jpg", "/FB_IMG_1787616145974.jpg",
    ],
  },
  {
    title: "Custom home theater",
    type: "Interior",
    note: "Walls · Ceiling · Trim",
    images: ["/theater-wide-hd.webp", "/theater-room-hd.webp", "/theater-detail-hd.webp"],
  },
];

export const reviews = [
  { quote: "The site can feature a short client story here—what changed, what the experience felt like, and the detail the customer appreciated most.", name: "Verified client name", project: "Interior painting" },
  { quote: "This space is designed for a concise, specific review that gives future customers confidence in the preparation, communication, and finish.", name: "Verified client name", project: "Exterior project" },
  { quote: "Add an owner-approved review here, ideally with the project type and town. Specific feedback always feels more credible than generic praise.", name: "Verified client name", project: "Deck refinishing" },
];

export const projectFilters = ["All", "Exterior", "Interior", "Outdoor"];

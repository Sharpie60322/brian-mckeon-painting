import { services } from "../site-data";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const route = (path: string) => `${basePath}${path}`;

const serviceDetails = [
  { title: "Interior painting", items: ["Walls and ceilings", "Trim, doors, and built-ins", "Careful protection of occupied spaces", "Color changes and refresh work"] },
  { title: "Exterior painting", items: ["Siding and trim", "Entries, doors, and shutters", "Preparation suited to the surface", "Complete exterior color changes"] },
  { title: "Outdoor surfaces", items: ["Decks and railings", "Fences and gates", "Sheds and picnic tables", "Paint and stain applications"] },
  { title: "Commercial & specialty", items: ["Offices and storefronts", "Rentals and light commercial spaces", "Furniture and one-off objects", "Owner-reviewed specialty requests"] },
];

export default function ServicesPage() {
  return <>
    <section className="inner-hero inner-hero-services" id="top"><div><p className="eyebrow"><span /> Services</p><h1>One careful approach.<br /><em>Endless applications.</em></h1><p>Explore the spaces, surfaces, and project types Brian McKeon Painting is prepared to discuss.</p></div><aside><span>01</span><p>Every project begins with a clear scope, the right preparation plan, and a finish selected for how the surface will actually be used.</p></aside></section>

    <section className="section services page-services"><div className="services-grid">{services.map((service, index) => <article className="service-card reveal" key={service.title} style={{ transitionDelay: `${index * 70}ms` }}><div className="service-top"><span>{service.number}</span><i>↗</i></div><div className="service-symbol" aria-hidden="true"><b /><b /><b /></div><p className="service-tag">{service.tag}</p><h3>{service.title}</h3><p>{service.text}</p></article>)}</div></section>

    <section className="service-depth"><div className="service-depth-head reveal"><p className="kicker">Project possibilities</p><h2>Detailed enough for the work.<br /><em>Simple enough to understand.</em></h2></div><div className="service-detail-grid">{serviceDetails.map((service, index) => <article className="service-detail reveal" key={service.title}><span>0{index + 1}</span><h3>{service.title}</h3><ul>{service.items.map((item) => <li key={item}>{item}<b>↗</b></li>)}</ul></article>)}</div></section>

    <section className="process-section"><div className="process-intro reveal"><p className="kicker light">A clear process</p><h2>From first look<br />to <em>final coat.</em></h2><p>Good work starts with a shared understanding of the surfaces, preparation, schedule, and finish.</p></div><ol className="process-list"><li className="reveal"><span>01</span><div><h3>Share the project</h3><p>Tell us what you would like painted, where it is, and the timeline you have in mind.</p></div><b>↘</b></li><li className="reveal"><span>02</span><div><h3>Review &amp; estimate</h3><p>Review the surfaces and scope, answer questions, and prepare a written estimate.</p></div><b>↘</b></li><li className="reveal"><span>03</span><div><h3>Prep &amp; paint</h3><p>Prepare the surfaces, protect nearby areas, and apply the planned finish with care.</p></div><b>↘</b></li><li className="reveal"><span>04</span><div><h3>Final walkthrough</h3><p>Review the work together, confirm the details, and close out the project cleanly.</p></div><b>✓</b></li></ol></section>

    <section className="faq-section"><div className="faq-head reveal"><p className="kicker">Service questions</p><h2>Before work <em>begins.</em></h2></div><div className="faq-list reveal"><details><summary>What kinds of projects do you take on?<span>+</span></summary><p>Homes, decks, fences, businesses, picnic tables, furniture, and other paintable objects. Final project minimums and availability should be confirmed with the owner.</p></details><details><summary>How is preparation determined?<span>+</span></summary><p>The preparation plan depends on the current coating, surface condition, material, exposure, and desired finish. Those details belong in the written scope.</p></details><details><summary>Can I supply my own paint or color?<span>+</span></summary><p>Confirm product and color responsibilities with the owner before work begins so they can be included in the written project scope.</p></details></div></section>

    <section className="page-cta"><p className="kicker light">Have a surface in mind?</p><h2>Let&apos;s shape the<br /><em>right scope.</em></h2><div><a className="button button-cream" href={route("/contact/")}>Request an estimate <span>↗</span></a><a href={route("/work/")}>See completed work</a></div></section>
  </>;
}

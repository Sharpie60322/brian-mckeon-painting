"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;

const services = [
  { number: "01", title: "Homes", text: "Interiors, exteriors, trim, doors, ceilings, and detailed finish work for lived-in spaces.", tag: "Residential" },
  { number: "02", title: "Decks & fences", text: "Preparation, paint, and stain systems that help outdoor surfaces stand up to the elements.", tag: "Outdoor" },
  { number: "03", title: "Businesses", text: "Professional painting for offices, storefronts, rentals, and light commercial environments.", tag: "Commercial" },
  { number: "04", title: "Objects & more", text: "Picnic tables, furniture, sheds, railings, and the one-off projects that still deserve a fine finish.", tag: "Specialty" },
];

const projects = [
  { title: "Exterior refresh", type: "Residential", note: "Siding · Trim · Detail work", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85" },
  { title: "Living spaces", type: "Residential", note: "Walls · Ceilings · Trim", image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85" },
  { title: "Modern workspace", type: "Commercial", note: "Walls · Doors · Finishes", image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85" },
  { title: "Outdoor living", type: "Outdoor", note: "Decking · Rails · Stain", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85" },
  { title: "Kitchen renewal", type: "Residential", note: "Cabinetry · Walls · Detail", image: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1400&q=85" },
  { title: "Clean storefront", type: "Commercial", note: "Interior · Exterior · Touch-ups", image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=85" },
];

const reviews = [
  { quote: "The site can feature a short client story here—what changed, what the experience felt like, and the detail the customer appreciated most.", name: "Verified client name", project: "Interior painting" },
  { quote: "This space is designed for a concise, specific review that gives future customers confidence in the preparation, communication, and finish.", name: "Verified client name", project: "Exterior project" },
  { quote: "Add an owner-approved review here, ideally with the project type and town. Specific feedback always feels more credible than generic praise.", name: "Verified client name", project: "Deck refinishing" },
];

const legalContent = {
  privacy: {
    title: "Privacy notice",
    body: "This demo prepares the request in the visitor’s own email application and does not store form entries on this website. If the visitor sends the email, the submitted information is delivered to b.mckeonpainting@gmail.com and retained in that mailbox according to the owner’s email practices. Before public launch, confirm the retention period, deletion-request process, and whether any analytics or cookies will be enabled.",
  },
  terms: {
    title: "Website terms",
    body: "Information on this website is general and does not create a contract or guarantee. Project availability, scope, pricing, materials, preparation, scheduling, and warranty terms are confirmed only in a written estimate or service agreement after the project has been reviewed.",
  },
  insurance: {
    title: "Insurance disclosure",
    body: "The business owner has stated that Brian McKeon Painting carries general liability insurance. Before public launch, insert and verify the carrier name, policy number or certificate reference, coverage limits, and effective dates. Proof of current coverage can then be described as available upon request.",
  },
  accessibility: {
    title: "Accessibility statement",
    body: "Brian McKeon Painting aims to make this website usable for as many people as possible. If you have difficulty accessing information or completing the request form, call 603 858 1206. Before launch, this statement should be reviewed alongside a final accessibility check.",
  },
} as const;

type LegalKey = keyof typeof legalContent;

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [filter, setFilter] = useState("All");
  const [review, setReview] = useState(0);
  const [legalOpen, setLegalOpen] = useState<LegalKey | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const filteredProjects = useMemo(
    () => filter === "All" ? projects : projects.filter((project) => project.type === filter),
    [filter],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.13 },
    );
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setLegalOpen(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `Painting request from ${data.get("name")}`;
    const body = [
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      `Email: ${data.get("email")}`,
      `Project location: ${data.get("location")}`,
      `Project type: ${data.get("type")}`,
      `Ideal timing: ${data.get("timing") || "Flexible"}`,
      "",
      "Project details:",
      `${data.get("details")}`,
    ].join("\n");
    setSubmitted(true);
    window.location.href = `mailto:b.mckeonpainting@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <main>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <a className="brand" href="#top" aria-label="Brian McKeon Painting home" onClick={closeMenu}>
          <span className="brand-mark"><img src={asset("/bmp-mark.jpeg")} alt="" /></span>
          <span><strong>Brian McKeon</strong><small>Painting</small></span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#services">Services</a>
          <a href="#work">Our work</a>
          <a href="#reviews">Reviews</a>
          <a href="#about">About</a>
          <a className="nav-cta" href="#estimate">Request an estimate</a>
        </nav>
        <button className={`menu-button ${menuOpen ? "active" : ""}`} type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span />
        </button>
      </header>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu-inner">
          <p>Explore</p>
          {[ ["Services", "#services"], ["Our work", "#work"], ["Reviews", "#reviews"], ["About", "#about"], ["Request an estimate", "#estimate"] ].map(([label, href], index) => (
            <a key={label} href={href} onClick={closeMenu}><span>0{index + 1}</span>{label}</a>
          ))}
          <div className="mobile-contact"><span>Prefer to talk?</span><a href="tel:+16038581206">603 858 1206</a></div>
        </div>
      </div>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Residential · Commercial · Specialty</p>
          <h1>Craftsmanship<br />in <em>every coat.</em></h1>
          <p className="hero-lede">Thoughtful preparation. Clean, confident finishes. Painting that makes homes, decks, businesses, and outdoor spaces feel considered again.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#estimate">Start your project <span>↗</span></a>
            <a className="text-link" href="tel:+16038581206">Call 603 858 1206</a>
          </div>
          <div className="trust-note"><span className="shield">✓</span><p><b>General liability insured</b><small>Policy details available after owner verification</small></p></div>
        </div>

        <div className="hero-art" aria-label="Brian McKeon Painting brand artwork">
          <div className="glow" />
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="logo-frame"><img src={asset("/bmp-mark.jpeg")} alt="BMP paintbrush emblem" /></div>
          <div className="finish-card"><span>01</span><p>Fine finishes<br /><b>Built to last</b></p></div>
          <div className="swatch swatch-one" /><div className="swatch swatch-two" /><div className="swatch swatch-three" />
          <p className="art-caption">The art of a better finish <span>Since ———</span></p>
        </div>
        <a className="scroll-cue" href="#services"><span>Scroll</span><i /></a>
      </section>

      <section className="service-strip" aria-label="Featured services">
        <div className="ticker">
          <p>Interior &amp; exterior</p><span>✦</span><p>Decks &amp; fences</p><span>✦</span><p>Commercial spaces</p><span>✦</span><p>Furniture &amp; objects</p><span>✦</span>
          <p>Interior &amp; exterior</p><span>✦</span><p>Decks &amp; fences</p><span>✦</span><p>Commercial spaces</p><span>✦</span><p>Furniture &amp; objects</p><span>✦</span>
        </div>
      </section>

      <section className="section services" id="services">
        <div className="section-heading reveal">
          <div><p className="kicker">What we paint</p><h2>One careful approach.<br /><em>Endless applications.</em></h2></div>
          <p>From complete rooms to the picnic table out back, every project starts with listening, surface preparation, and the right finish for the job.</p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <article className="service-card reveal" key={service.title} style={{ transitionDelay: `${index * 70}ms` }}>
              <div className="service-top"><span>{service.number}</span><i>↗</i></div>
              <div className="service-symbol" aria-hidden="true"><b /><b /><b /></div>
              <p className="service-tag">{service.tag}</p>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="why-section" id="about">
        <div className="why-visual reveal">
          <img src={asset("/bmp-brand.jpeg")} alt="Brian McKeon Painting logo and phone number" />
          <div className="paint-stroke stroke-one" /><div className="paint-stroke stroke-two" />
          <div className="why-badge"><b>Made for</b><span>the details</span></div>
        </div>
        <div className="why-copy reveal">
          <p className="kicker light">The difference is in the prep</p>
          <h2>A finish should look good <em>up close.</em></h2>
          <p className="why-lede">A professional result is more than color on a surface. It is the preparation underneath, the care around your property, and the clear communication all the way through.</p>
          <div className="principles">
            <div><span>01</span><p><b>Clear scope</b>Know what is being painted, prepared, and protected before work begins.</p></div>
            <div><span>02</span><p><b>Respectful work</b>A tidy jobsite, considered scheduling, and direct communication.</p></div>
            <div><span>03</span><p><b>Right-size solutions</b>Recommendations suited to the surface, use, and desired finish.</p></div>
          </div>
          <a className="button button-cream" href="#estimate">Tell us about your project <span>↗</span></a>
        </div>
      </section>

      <section className="section work" id="work">
        <div className="work-head reveal">
          <div><p className="kicker">Selected work</p><h2>Surfaces, <em>transformed.</em></h2></div>
          <div className="filter-list" role="group" aria-label="Filter portfolio projects">
            {["All", "Residential", "Commercial", "Outdoor"].map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}
          </div>
        </div>
        <p className="demo-disclosure reveal">Demo gallery photography — replace with the owner’s completed-project photos before public launch.</p>
        <div className="project-grid">
          {filteredProjects.map((project, index) => (
            <article className={`project-card reveal project-${index % 3}`} key={project.title}>
              <div className="project-image" style={{ backgroundImage: `url(${project.image})` }} role="img" aria-label={`Sample image for ${project.title}`}>
                <span className="view-project">View project <i>↗</i></span>
              </div>
              <div className="project-meta"><div><p>{project.type}</p><h3>{project.title}</h3></div><span>{project.note}</span></div>
            </article>
          ))}
        </div>
        <div className="work-cta reveal"><p><span>Have project photos?</span> This gallery is ready for before-and-after images, captions, and job details.</p><a href="#estimate">Add your next project <b>↗</b></a></div>
      </section>

      <section className="process-section">
        <div className="process-intro reveal"><p className="kicker light">A simple process</p><h2>From first look<br />to <em>final coat.</em></h2><p>Good work starts with a clear plan. The final workflow can be tailored to how the owner estimates and schedules projects.</p></div>
        <ol className="process-list">
          <li className="reveal"><span>01</span><div><h3>Share the project</h3><p>Tell us what you would like painted, where it is, and the timeline you have in mind.</p></div><b>↘</b></li>
          <li className="reveal"><span>02</span><div><h3>Review &amp; estimate</h3><p>We review the surfaces and scope, answer questions, and prepare a written estimate.</p></div><b>↘</b></li>
          <li className="reveal"><span>03</span><div><h3>Prep &amp; paint</h3><p>Surfaces are prepared, nearby areas protected, and the planned finish applied with care.</p></div><b>↘</b></li>
          <li className="reveal"><span>04</span><div><h3>Final walkthrough</h3><p>Review the work together, confirm the details, and close out the project cleanly.</p></div><b>✓</b></li>
        </ol>
      </section>

      <section className="reviews-section" id="reviews">
        <div className="reviews-side reveal"><p className="kicker">Client notes</p><h2>Good work gets <em>remembered.</em></h2><p>Sample review layout. Replace these cards with owner-approved, verifiable client feedback before launch.</p><div className="review-controls"><button aria-label="Previous review" onClick={() => setReview((review - 1 + reviews.length) % reviews.length)}>←</button><span>{review + 1} / {reviews.length}</span><button aria-label="Next review" onClick={() => setReview((review + 1) % reviews.length)}>→</button></div></div>
        <article className="review-card reveal" key={review}>
          <div className="quote-mark">“</div>
          <p>{reviews[review].quote}</p>
          <div className="review-person"><span>{reviews[review].name.charAt(0)}</span><div><b>{reviews[review].name}</b><small>{reviews[review].project} · Demo review</small></div></div>
        </article>
        <div className="review-pattern" aria-hidden="true"><span>B</span><span>M</span><span>P</span></div>
      </section>

      <section className="insurance-section">
        <div className="insurance-card reveal">
          <div className="insurance-icon">✓</div>
          <div><p className="kicker light">Customer confidence</p><h2>General liability <em>insured.</em></h2><p>The owner has confirmed that the business carries general liability insurance. Add the verified certificate details below before the site is made public.</p></div>
          <div className="policy-grid"><p><span>Carrier</span><b>[Confirm with owner]</b></p><p><span>Policy / COI</span><b>[Add reference]</b></p><p><span>Coverage dates</span><b>[Add effective dates]</b></p><p><span>Proof of coverage</span><b>Available on request*</b></p></div>
          <small>*Publish only after confirming current documentation, limits, and wording with the insurer or agent.</small>
        </div>
      </section>

      <section className="estimate-section" id="estimate">
        <div className="estimate-copy reveal">
          <p className="kicker">Start a conversation</p><h2>What can we<br /><em>paint for you?</em></h2><p>Share a few details and the owner can follow up to discuss the space, timing, and next step.</p>
          <div className="direct-contact"><span>Prefer to call or email?</span><a href="tel:+16038581206">603 858 1206 <b>↗</b></a><a className="email-link" href="mailto:b.mckeonpainting@gmail.com">b.mckeonpainting@gmail.com</a><small>Your device will open its phone or email app.</small></div>
          <div className="form-note"><b>Shareable demo</b><p>The form prepares a detailed request to b.mckeonpainting@gmail.com in the visitor’s email app. The website itself does not store the submission.</p></div>
        </div>
        <div className="form-shell reveal">
          {submitted ? (
            <div className="success-state" role="status"><span>✓</span><p className="kicker">Request prepared</p><h3>Check your email app.</h3><p>A message to b.mckeonpainting@gmail.com has been prepared with your project details. Review it and press send to deliver the request.</p><button className="button button-primary" onClick={() => setSubmitted(false)}>Prepare another request <b>↗</b></button></div>
          ) : (
            <form onSubmit={submitRequest}>
              <div className="form-progress"><span>Project request</span><b>01 / 01</b></div>
              <div className="field-row"><label>Full name<input name="name" autoComplete="name" placeholder="Your name" required /></label><label>Phone number<input name="phone" type="tel" autoComplete="tel" placeholder="(603) 555-0123" required /></label></div>
              <div className="field-row"><label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label><label>Project location<input name="location" autoComplete="street-address" placeholder="Town or address" required /></label></div>
              <div className="field-row"><label>Project type<select name="type" defaultValue="" required><option value="" disabled>Select one</option><option>Interior painting</option><option>Exterior painting</option><option>Deck or fence</option><option>Commercial space</option><option>Furniture or object</option><option>Something else</option></select></label><label>Ideal timing<select name="timing" defaultValue=""><option value="">Flexible</option><option>As soon as possible</option><option>Within 1 month</option><option>1–3 months</option><option>Planning ahead</option></select></label></div>
              <label>Tell us about the project<textarea name="details" rows={5} placeholder="What would you like painted? Include the approximate size, current condition, and any timing details." required /></label>
              <label className="consent"><input type="checkbox" required /><span>I agree to be contacted about this request and understand that my email app will open with a prepared message.</span></label>
              <button className="button button-primary form-submit" type="submit">Prepare email request <span>↗</span></button>
            </form>
          )}
        </div>
      </section>

      <section className="faq-section">
        <div className="faq-head reveal"><p className="kicker">Before we begin</p><h2>Common <em>questions.</em></h2></div>
        <div className="faq-list reveal">
          <details><summary>What kinds of projects do you take on?<span>+</span></summary><p>Homes, decks, fences, businesses, picnic tables, furniture, and other paintable objects. Final service descriptions and project minimums should be confirmed with the owner.</p></details>
          <details><summary>Is Brian McKeon Painting insured?<span>+</span></summary><p>The owner has confirmed general liability coverage. Carrier, limits, policy reference, and effective dates should be verified and added before public launch.</p></details>
          <details><summary>How do estimates work?<span>+</span></summary><p>Use the form or call to share the project. The owner can then confirm the preferred review, estimate, scheduling, and deposit process.</p></details>
          <details><summary>Can I supply my own paint or color?<span>+</span></summary><p>This is a useful question for the owner to answer in the final content. Product and color responsibilities should be included in the written project scope.</p></details>
        </div>
      </section>

      <footer>
        <div className="footer-brand"><img src={asset("/bmp-mark.jpeg")} alt="BMP paintbrush emblem" /><div><h2>Let&apos;s give it<br /><em>a better finish.</em></h2><a href="#estimate">Request an estimate <span>↗</span></a></div></div>
        <div className="footer-grid">
          <div><p>Brian McKeon Painting</p><span>Residential · Commercial · Specialty</span><a href="tel:+16038581206">603 858 1206</a><a className="footer-email" href="mailto:b.mckeonpainting@gmail.com">b.mckeonpainting@gmail.com</a></div>
          <div><p>Explore</p><a href="#services">Services</a><a href="#work">Our work</a><a href="#reviews">Reviews</a><a href="#estimate">Request form</a></div>
          <div><p>Legal &amp; trust</p><button onClick={() => setLegalOpen("privacy")}>Privacy notice</button><button onClick={() => setLegalOpen("terms")}>Website terms</button><button onClick={() => setLegalOpen("insurance")}>Insurance disclosure</button><button onClick={() => setLegalOpen("accessibility")}>Accessibility</button></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Brian McKeon Painting. Demo website.</span><a href="#top">Back to top ↑</a></div>
      </footer>

      <a className="mobile-estimate" href="#estimate">Request an estimate <span>↗</span></a>

      {legalOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setLegalOpen(null)}>
          <section className="legal-modal" role="dialog" aria-modal="true" aria-labelledby="legal-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setLegalOpen(null)} aria-label="Close">×</button>
            <p className="kicker">Legal placeholder</p><h2 id="legal-title">{legalContent[legalOpen].title}</h2><p>{legalContent[legalOpen].body}</p>
            <button className="button button-primary" onClick={() => setLegalOpen(null)}>Close <span>×</span></button>
          </section>
        </div>
      )}
    </main>
  );
}

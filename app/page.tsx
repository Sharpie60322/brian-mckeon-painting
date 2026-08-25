"use client";

import { type CSSProperties, type FormEvent, useEffect, useMemo, useState } from "react";
import { projectFilters, projects, reviews, services } from "./site-data";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;

const transformations = [
  {
    number: "01",
    shortTitle: "Exterior siding",
    title: "A weathered exterior, brought back with clarity.",
    description: "A controlled look at the full coating transformation—from careful surface preparation to a crisp blue-gray finish with bright white trim.",
    before: "/slider-preparation-hd.webp",
    after: "/slider-completed-hd.webp",
    beforeAlt: "Red exterior siding in a carefully prepared condition",
    afterAlt: "The same exterior viewpoint with completed blue-gray siding and white trim",
    facts: ["Scrape & feather-sand", "Prime prepared areas", "Blue-gray finish · white trim"],
    view: "Matched exterior angle",
    finish: "Blue-gray siding",
  },
  {
    number: "02",
    shortTitle: "Blue-gray exterior",
    title: "A complete exterior transformation from prep to finish.",
    description: "The real preparation photograph is paired with an angle-matched completion view based on the owner’s supplied finished reference, so every architectural line stays locked while you compare the coating work.",
    before: "/Project 1 Before.jpg",
    after: "/project-1-finished-angle-matched.webp",
    beforeAlt: "Owner-supplied Project 1 exterior during preparation",
    afterAlt: "Angle-matched visualization of the completed blue-gray Project 1 exterior",
    facts: ["Extensive scrape & sand", "Siding and trim preparation", "Blue-gray finish · white trim"],
    view: "Matched to the real before frame",
    finish: "Blue-gray exterior",
  },
  {
    number: "03",
    shortTitle: "Historic sunroom",
    title: "Historic details restored with a clean, lasting finish.",
    description: "The real weathered view is paired with an angle-matched completion study based on the owner’s finished reference, making the restored clapboards and detailed trim easy to compare in place.",
    before: "/Project 2 Before.jpg",
    after: "/project-2-finished-angle-matched.webp",
    beforeAlt: "Owner-supplied Project 2 historic exterior before restoration",
    afterAlt: "Angle-matched visualization of the completed Project 2 historic exterior",
    facts: ["Loose coating removed", "Detailed woodwork prepared", "Clean white finish"],
    view: "Matched to the real before frame",
    finish: "Restored white exterior",
  },
] as const;

export default function Home() {
  const [comparison, setComparison] = useState(50);
  const [comparisonProject, setComparisonProject] = useState(0);
  const [filter, setFilter] = useState("All");
  const [review, setReview] = useState(0);
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const filteredProjects = useMemo(() => filter === "All" ? projects : projects.filter((project) => project.type === filter), [filter]);
  const activeTransformation = transformations[comparisonProject];

  function chooseTransformation(index: number) {
    setComparisonProject(index);
    setComparison(50);
  }

  function flipTransformation(direction: -1 | 1) {
    chooseTransformation((comparisonProject + direction + transformations.length) % transformations.length);
  }

  useEffect(() => { if (selectedProject) setGalleryIndex(0); }, [selectedProject]);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
      if (!selectedProject || selectedProject.images.length < 2) return;
      if (event.key === "ArrowLeft") setGalleryIndex((current) => (current - 1 + selectedProject.images.length) % selectedProject.images.length);
      if (event.key === "ArrowRight") setGalleryIndex((current) => (current + 1) % selectedProject.images.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedProject]);

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

  return <>
    <section className="hero hero-theater hero-calm" id="top">
      <div className="hero-aurora" aria-hidden="true" />
      <div className="hero-copy">
        <p className="eyebrow"><span /> New Hampshire painting craftsmanship</p>
        <p className="hero-pretitle">Residential · Commercial · Specialty</p>
        <h1>Color with<br /><em>character.</em><br />Work with care.</h1>
        <p className="hero-lede">Professional painting for homes, decks, businesses, fences, furniture, and the projects that deserve more than an ordinary finish.</p>
        <div className="hero-actions">
          <a className="button button-gold" href="#estimate">Request an estimate <span>↗</span></a>
          <a className="hero-phone" href="tel:+16038581206"><small>Call Brian directly</small><strong>603 858 1206</strong></a>
        </div>
      </div>

      <div className="hero-logo-stage" aria-label="Brian McKeon Painting company logo">
        <div className="logo-orbit orbit-one" aria-hidden="true" />
        <div className="logo-orbit orbit-two" aria-hidden="true" />
        <span className="logo-spark spark-one" aria-hidden="true">✦</span>
        <span className="logo-spark spark-two" aria-hidden="true">✦</span>
        <div className="hero-logo-frame"><img src={asset("/bmp-brand-hd.webp")} alt="Brian McKeon Painting, 603 858 1206" /></div>
        <div className="hero-proof"><i>✓</i><p><small>Protected workmanship</small><b>General liability insured</b></p></div>
        <div className="hero-edition"><span>BMP</span><small>Craft · Color · Care</small></div>
      </div>

      <div className="hero-bottomline" aria-hidden="true"><span>Built on preparation</span><i /><span>Finished with precision</span></div>
      <a className="scroll-cue" href="#services"><span>Explore the work</span><i /></a>
    </section>

    <section className="proof-ribbon" aria-label="Company highlights">
      <p><span>01</span><b>Owner-operated</b><small>Direct, personal communication</small></p>
      <p><span>02</span><b>General liability insured</b><small>Proof available after verification</small></p>
      <p><span>03</span><b>Built for New England</b><small>Preparation suited to the surface</small></p>
      <a href="#about"><span>Meet the standard</span><b>↓</b></a>
    </section>

    <section className="recognition-scroll" id="recognition" aria-labelledby="recognition-title">
      <div className="recognition-sticky">
        <div className="recognition-halo recognition-halo-one" aria-hidden="true" />
        <div className="recognition-halo recognition-halo-two" aria-hidden="true" />
        <p className="recognition-ghost" aria-hidden="true">NEIGHBORHOOD</p>
        <div className="recognition-layout">
          <div className="recognition-copy">
            <p className="kicker light"><span className="recognition-pulse" /> Community recognition · 2024</p>
            <span className="recognition-overline">Voted by local neighbors</span>
            <h2 id="recognition-title">Loved by the people<br /><em>right next door.</em></h2>
            <p>Brian McKeon Painting was voted a <strong>2024 Nextdoor Neighborhood Fave</strong>—a community-chosen recognition from the people who know the work close to home.</p>
            <div className="recognition-proof-row"><p><span>01</span><b>Community voted</b></p><p><span>02</span><b>Locally recognized</b></p><p><span>03</span><b>Earned in 2024</b></p></div>
            <a href="#work" className="recognition-link">See the work neighbors noticed <i>↓</i></a>
          </div>
          <div className="recognition-evidence">
            <div className="recognition-medallion" aria-label="2024 Neighborhood Fave"><small>2024</small><span>Neighborhood</span><b>FAVE</b><i>Community voted</i></div>
            <figure className="recognition-document"><span>Official recognition</span><img src={asset("/FB_IMG_1787622774260.jpg")} alt="Official 2024 Nextdoor Neighborhood Fave recognition received by Brian McKeon Painting" /><figcaption><b>Original recognition notice</b><small>Owner-supplied documentation · 2024</small></figcaption></figure>
            <p className="recognition-stamp" aria-hidden="true"><span>LOCAL</span><b>LOVE</b><i>✦</i></p>
          </div>
        </div>
        <div className="recognition-scroll-note" aria-hidden="true"><span>Scroll to reveal</span><i /></div>
      </div>
    </section>

    <section className="section services home-services" id="services">
      <div className="section-heading reveal"><div><p className="kicker">One painter. Many possibilities.</p><h2>What should feel<br /><em>new again?</em></h2></div><p>From the rooms you live in to the decks, fences, storefronts, and objects around them—every surface gets a project-specific plan.</p></div>
      <div className="services-grid services-image-grid">{services.map((service, index) => <article className="service-card service-image-card reveal" key={service.title} style={{ "--service-image": `url(${asset(service.image)})`, transitionDelay: `${index * 70}ms` } as CSSProperties}><div className="service-photo" /><div className="service-shade" /><div className="service-top"><span>{service.number}</span><i>↘</i></div><div className="service-card-copy"><p className="service-tag">{service.tag}</p><h3>{service.title}</h3><p>{service.text}</p></div></article>)}</div>
    </section>

    <section className="brand-manifesto" id="about">
      <div className="manifesto-photo reveal"><img src={asset("/paint-artwork.webp")} alt="Original abstract blue and gold paint artwork" /><div className="manifesto-seal"><img src={asset("/bmp-mark-hd.webp")} alt="" /><span>Brian McKeon Painting</span></div></div>
      <div className="manifesto-copy reveal"><p className="kicker light">More than a color change</p><h2>The difference is in what happens <em>before the brush moves.</em></h2><p>Careful protection. Honest surface preparation. Clean lines. The right finish for the way the space is used. That is how a paint job becomes craftsmanship.</p><div className="manifesto-details"><span><b>01</b>Clear scope</span><span><b>02</b>Careful preparation</span><span><b>03</b>Confident finish</span></div><a className="button button-cream" href="#estimate">Tell us about your project <span>↓</span></a></div>
      <p className="manifesto-word" aria-hidden="true">CRAFT</p>
    </section>

    <section className="transformation-showcase" id="comparison" aria-labelledby="comparison-title">
      <header className="transformation-head reveal">
        <div><p className="kicker light">Transformation studio · 03 matched studies</p><h2 id="comparison-title">Preparation you can <em>see.</em><br />Finishes you can feel.</h2></div>
        <div className="transformation-intro"><span>Choose · flip · drag to compare</span><p>Move through three real project examples, then drag across each image to compare preparation with the finished work.</p><div className="transformation-flip"><button type="button" onClick={() => flipTransformation(-1)} aria-label="Previous transformation">←</button><b>Example {String(comparisonProject + 1).padStart(2, "0")} of {String(transformations.length).padStart(2, "0")}</b><button type="button" onClick={() => flipTransformation(1)} aria-label="Next transformation">→</button></div></div>
      </header>

      <div className="transformation-selector reveal" role="tablist" aria-label="Choose a transformation">
        {transformations.map((item, index) => <button key={item.shortTitle} type="button" role="tab" aria-selected={comparisonProject === index} aria-controls="transformation-panel" className={comparisonProject === index ? "active" : ""} onClick={() => chooseTransformation(index)}><span className="transformation-thumb"><img src={asset(item.after)} alt="" /></span><span className="transformation-tab-copy"><small>{item.number} · Case study</small><b>{item.shortTitle}</b></span><i>{comparisonProject === index ? "Viewing" : "View"} ↗</i></button>)}
      </div>

      <div className="transformation-stage" id="transformation-panel" role="tabpanel" aria-live="polite">
        <div className="comparison-copy" key={`copy-${comparisonProject}`}><p className="kicker">Case study {activeTransformation.number}</p><h3>{activeTransformation.title}</h3><p>{activeTransformation.description}</p><div className="comparison-facts">{activeTransformation.facts.map((fact, index) => <p key={fact}><span>0{index + 1}</span><b>{fact}</b></p>)}</div><small className="comparison-disclosure">Every before image is owner-supplied. Studies 02 and 03 use angle-matched completion visualizations derived from the owner’s real finished reference photos; those originals remain in the project galleries.</small></div>
        <div className="comparison-wrap" style={{ "--reveal": `${comparison}%` } as CSSProperties} key={`slider-${comparisonProject}`}>
          <div className="comparison-frame"><img className="comparison-after" src={asset(activeTransformation.after)} alt={activeTransformation.afterAlt} /><div className="comparison-before"><img src={asset(activeTransformation.before)} alt={activeTransformation.beforeAlt} /></div><div className="comparison-divider"><span>↔</span></div><span className="comparison-label label-before">Preparation</span><span className="comparison-label label-after">Completed</span><input type="range" min="3" max="97" value={comparison} onChange={(event) => setComparison(Number(event.target.value))} aria-label={`Compare preparation and completed states for ${activeTransformation.shortTitle}`} /></div>
          <div className="comparison-caption"><p><span>Viewpoint</span>{activeTransformation.view}</p><p><span>Completed finish</span>{activeTransformation.finish}</p><p className="drag-note"><span aria-hidden="true">↔</span> Drag across the image</p></div>
        </div>
      </div>
    </section>

    <section className="section work one-page-work" id="work">
      <div className="work-head album-library-head reveal"><div><p className="kicker">The project library</p><h2>Real work.<br /><em>Organized with purpose.</em></h2></div><div className="album-library-summary"><span>06 curated albums</span><p>Explore 76 owner-supplied project photographs across complete collections.</p></div></div>
      <div className="album-toolbar reveal"><p>Browse by project type</p><div className="filter-list" role="group" aria-label="Filter portfolio projects">{projectFilters.map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}</div><span>{String(filteredProjects.length).padStart(2, "0")} collections</span></div>
      <div className="album-grid">
        {filteredProjects.map((project, index) => <article className={`album-card reveal is-visible ${index === 0 && filter === "All" ? "album-featured" : ""}`} key={project.title}>
          <button className="album-cover" onClick={() => setSelectedProject(project)} aria-label={`View ${project.title} gallery with ${project.images.length} photos`}>
            <span className="album-cover-main"><img src={asset(project.images[0])} alt={`${project.title} featured project view`} loading={index < 2 ? "eager" : "lazy"} decoding="async" /></span>
            <span className="album-cover-pair"><img src={asset(project.images[1] ?? project.images[0])} alt="" loading="lazy" decoding="async" /><img src={asset(project.images[2] ?? project.images[0])} alt="" loading="lazy" decoding="async" /></span>
            <span className="album-photo-count">{String(project.images.length).padStart(2, "0")} photos</span>
            <span className="album-open"><b>View project</b><i>↗</i></span>
          </button>
          <div className="album-details"><span className="album-index">{String(index + 1).padStart(2, "0")}</span><div><p>{project.type}</p><h3>{project.title}</h3><span>{project.note}</span></div><button type="button" onClick={() => setSelectedProject(project)} aria-label={`Open ${project.title}`}>Open album <i>→</i></button></div>
        </article>)}
      </div>
      <p className="album-disclosure">All galleries use the owner’s supplied project photography. The three custom home theater lead images were clarity-enhanced from those originals.</p>
    </section>

    <section className="process-section" id="process">
      <div className="process-intro reveal"><p className="kicker light">A clear process</p><h2>From first look<br />to <em>final coat.</em></h2><p>Good work starts with a shared understanding of the surfaces, preparation, schedule, and finish.</p></div>
      <ol className="process-list"><li className="reveal"><span>01</span><div><h3>Share the project</h3><p>Tell Brian what you would like painted, where it is, and the timeline you have in mind.</p></div><b>↓</b></li><li className="reveal"><span>02</span><div><h3>Review &amp; estimate</h3><p>Review the surfaces and scope, answer questions, and prepare a written estimate.</p></div><b>↓</b></li><li className="reveal"><span>03</span><div><h3>Prep &amp; paint</h3><p>Prepare the surfaces, protect nearby areas, and apply the planned finish with care.</p></div><b>↓</b></li><li className="reveal"><span>04</span><div><h3>Final walkthrough</h3><p>Review the work together, confirm the details, and close out the project cleanly.</p></div><b>✓</b></li></ol>
    </section>

    <section className="reviews-section" id="reviews">
      <div className="reviews-side reveal"><p className="kicker">Client notes</p><h2>Good work gets <em>remembered.</em></h2><p>This polished review area is ready for owner-approved, verifiable customer feedback.</p><div className="review-controls"><button aria-label="Previous review" onClick={() => setReview((review - 1 + reviews.length) % reviews.length)}>←</button><span>{review + 1} / {reviews.length}</span><button aria-label="Next review" onClick={() => setReview((review + 1) % reviews.length)}>→</button></div></div>
      <article className="review-card reveal" key={review}><div className="quote-mark">“</div><p>{reviews[review].quote}</p><div className="review-person"><span>{reviews[review].name.charAt(0)}</span><div><b>{reviews[review].name}</b><small>{reviews[review].project} · Review placeholder</small></div></div></article>
      <div className="review-pattern" aria-hidden="true"><span>B</span><span>M</span><span>P</span></div>
    </section>

    <section className="insurance-section" id="insurance"><div className="insurance-card reveal"><div className="insurance-icon">✓</div><div><p className="kicker light">Customer confidence</p><h2>General liability <em>insured.</em></h2><p>The owner has confirmed that Brian McKeon Painting carries general liability insurance. Verified certificate details can be inserted below when provided.</p></div><div className="policy-grid"><p><span>Carrier</span><b>[Confirm with owner]</b></p><p><span>Policy / COI</span><b>[Add reference]</b></p><p><span>Coverage dates</span><b>[Add effective dates]</b></p><p><span>Proof of coverage</span><b>Available on request*</b></p></div><small>*Publish policy details only after confirming current documentation, limits, and wording with the insurer or agent.</small></div></section>

    <section className="estimate-section" id="estimate">
      <div className="estimate-copy reveal"><p className="kicker">Start a conversation</p><h2>What can Brian<br /><em>paint for you?</em></h2><p>Share a few details and the owner can follow up to discuss the space, timing, and next step.</p><div className="direct-contact"><span>Prefer to call or email?</span><a href="tel:+16038581206">603 858 1206 <b>↗</b></a><a className="email-link" href="mailto:b.mckeonpainting@gmail.com">b.mckeonpainting@gmail.com</a><small>Your device will open its phone or email app.</small></div><div className="form-note"><b>Privacy-minded request</b><p>The form prepares an email to b.mckeonpainting@gmail.com. This website does not store the submission.</p></div></div>
      <div className="form-shell reveal">{submitted ? <div className="success-state" role="status"><span>✓</span><p className="kicker">Request prepared</p><h3>Check your email app.</h3><p>Review the prepared message and press send to deliver the request to Brian.</p><button className="button button-primary" onClick={() => setSubmitted(false)}>Prepare another request <b>↗</b></button></div> : <form onSubmit={submitRequest}><div className="form-progress"><span>Project request</span><b>01 / 01</b></div><div className="field-row"><label>Full name<input name="name" autoComplete="name" placeholder="Your name" required /></label><label>Phone number<input name="phone" type="tel" autoComplete="tel" placeholder="(603) 555-0123" required /></label></div><div className="field-row"><label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label><label>Project location<input name="location" autoComplete="street-address" placeholder="Town or address" required /></label></div><div className="field-row"><label>Project type<select name="type" defaultValue="" required><option value="" disabled>Select one</option><option>Interior painting</option><option>Exterior painting</option><option>Deck or fence</option><option>Commercial space</option><option>Furniture or object</option><option>Something else</option></select></label><label>Ideal timing<select name="timing" defaultValue=""><option value="">Flexible</option><option>As soon as possible</option><option>Within 1 month</option><option>1–3 months</option><option>Planning ahead</option></select></label></div><label>Tell us about the project<textarea name="details" rows={5} placeholder="What would you like painted? Include the approximate size, current condition, and any timing details." required /></label><label className="consent"><input type="checkbox" required /><span>I agree to be contacted about this request and understand that my email app will open with a prepared message.</span></label><button className="button button-primary form-submit" type="submit">Prepare email request <span>↗</span></button></form>}</div>
    </section>

    <section className="faq-section" id="questions"><div className="faq-head reveal"><p className="kicker">Before we begin</p><h2>Common <em>questions.</em></h2></div><div className="faq-list reveal"><details><summary>What kinds of projects do you take on?<span>+</span></summary><p>Homes, decks, fences, businesses, picnic tables, furniture, and other paintable objects. Final project minimums and availability should be confirmed with the owner.</p></details><details><summary>Is Brian McKeon Painting insured?<span>+</span></summary><p>The owner has confirmed general liability coverage. Carrier, limits, policy reference, and effective dates can be added after verification.</p></details><details><summary>How do estimates work?<span>+</span></summary><p>Use the form or call to share the project. Brian can then confirm the preferred review, written estimate, scheduling, and deposit process.</p></details><details><summary>Does the website store my information?<span>+</span></summary><p>No. The form prepares a message in your own email application for you to review and send.</p></details></div></section>

    {selectedProject && <div className="modal-backdrop gallery-backdrop" role="presentation" onMouseDown={() => setSelectedProject(null)}><section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-gallery-title" onMouseDown={(event) => event.stopPropagation()}><header className="project-modal-head"><div className="gallery-heading"><p>{selectedProject.type} · Project album</p><h2 id="project-gallery-title">{selectedProject.title}</h2><span>{selectedProject.note}</span></div><div className="gallery-status"><b>{String(galleryIndex + 1).padStart(2, "0")}</b><i>/</i><span>{String(selectedProject.images.length).padStart(2, "0")}</span></div><button className="gallery-close" onClick={() => setSelectedProject(null)} aria-label="Close project gallery">×</button><div className="gallery-progress" aria-hidden="true"><span style={{ transform: `scaleX(${(galleryIndex + 1) / selectedProject.images.length})` }} /></div></header><div className="gallery-stage"><img src={asset(selectedProject.images[galleryIndex])} alt={`${selectedProject.title}, photo ${galleryIndex + 1} of ${selectedProject.images.length}`} />{selectedProject.images.length > 1 && <><button className="gallery-nav gallery-prev" onClick={() => setGalleryIndex((galleryIndex - 1 + selectedProject.images.length) % selectedProject.images.length)} aria-label="Previous photo">←</button><button className="gallery-nav gallery-next" onClick={() => setGalleryIndex((galleryIndex + 1) % selectedProject.images.length)} aria-label="Next photo">→</button></>}</div><footer className="gallery-footer"><p><b>Project photography</b><span>Use arrow keys or select a thumbnail</span></p><div className="gallery-thumbs" aria-label="Choose a project photo">{selectedProject.images.map((image, index) => <button key={image} className={galleryIndex === index ? "active" : ""} onClick={() => setGalleryIndex(index)} aria-label={`Show photo ${index + 1}`} aria-current={galleryIndex === index ? "true" : undefined}><img src={asset(image)} alt="" loading="lazy" decoding="async" /><span>{String(index + 1).padStart(2, "0")}</span></button>)}</div></footer></section></div>}
  </>;
}

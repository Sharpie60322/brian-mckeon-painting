"use client";

import { type CSSProperties, useRef, useState } from "react";
import { projects, services } from "./site-data";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;
const route = (path: string) => `${basePath}${path}`;

export default function Home() {
  const [comparison, setComparison] = useState(53);
  const heroRef = useRef<HTMLElement>(null);

  const moveHero = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    event.currentTarget.style.setProperty("--pointer-x", x.toFixed(3));
    event.currentTarget.style.setProperty("--pointer-y", y.toFixed(3));
  };

  const resetHero = () => {
    heroRef.current?.style.setProperty("--pointer-x", "0");
    heroRef.current?.style.setProperty("--pointer-y", "0");
  };

  return <>
    <section className="hero hero-theater" id="top" ref={heroRef} onPointerMove={moveHero} onPointerLeave={resetHero}>
      <div className="hero-aurora" aria-hidden="true" />
      <div className="hero-copy">
        <p className="eyebrow"><span /> New Hampshire painting craftsmanship</p>
        <p className="hero-pretitle">Residential · Commercial · Specialty</p>
        <h1>Color with<br /><em>character.</em><br />Work with care.</h1>
        <p className="hero-lede">Professional painting for homes, decks, businesses, fences, furniture, and the projects that deserve more than an ordinary finish.</p>
        <div className="hero-actions">
          <a className="button button-gold" href={route("/contact/")}>Request an estimate <span>↗</span></a>
          <a className="hero-phone" href="tel:+16038581206"><small>Call Brian directly</small><strong>603 858 1206</strong></a>
        </div>
      </div>

      <div className="hero-logo-stage" aria-label="Brian McKeon Painting company logo">
        <div className="logo-orbit orbit-one" aria-hidden="true" />
        <div className="logo-orbit orbit-two" aria-hidden="true" />
        <span className="logo-spark spark-one" aria-hidden="true">✦</span>
        <span className="logo-spark spark-two" aria-hidden="true">✦</span>
        <div className="hero-logo-frame"><img src={asset("/bmp-brand.jpeg")} alt="Brian McKeon Painting, 603 858 1206" /></div>
        <div className="hero-proof"><i>✓</i><p><small>Protected workmanship</small><b>General liability insured</b></p></div>
        <div className="hero-edition"><span>BMP</span><small>Craft · Color · Care</small></div>
      </div>

      <div className="hero-bottomline" aria-hidden="true"><span>Built on preparation</span><i /><span>Finished with precision</span></div>
      <a className="scroll-cue" href="#overview"><span>Explore the work</span><i /></a>
    </section>

    <section className="proof-ribbon" aria-label="Company highlights">
      <p><span>01</span><b>Owner-operated</b><small>Direct, personal communication</small></p>
      <p><span>02</span><b>General liability insured</b><small>Proof available after verification</small></p>
      <p><span>03</span><b>Built for New England</b><small>Preparation suited to the surface</small></p>
      <a href={route("/about/")}><span>Meet the standard</span><b>↗</b></a>
    </section>

    <section className="section services home-services" id="overview">
      <div className="section-heading reveal"><div><p className="kicker">One painter. Many possibilities.</p><h2>What should feel<br /><em>new again?</em></h2></div><p>From the rooms you live in to the decks, fences, storefronts, and objects around them—every surface gets a project-specific plan.</p></div>
      <div className="services-grid services-image-grid">{services.map((service, index) => <a className="service-card service-image-card reveal" href={route("/services/")} key={service.title} style={{ "--service-image": `url(${asset(service.image)})`, transitionDelay: `${index * 70}ms` } as CSSProperties}><div className="service-photo" /><div className="service-shade" /><div className="service-top"><span>{service.number}</span><i>↗</i></div><div className="service-card-copy"><p className="service-tag">{service.tag}</p><h3>{service.title}</h3><p>{service.text}</p></div></a>)}</div>
      <div className="section-more"><a href={route("/services/")}>Explore every service <span>↗</span></a></div>
    </section>

    <section className="brand-manifesto">
      <div className="manifesto-photo reveal"><img src={asset("/paint-artwork.webp")} alt="Original abstract blue and gold paint artwork" /><div className="manifesto-seal"><img src={asset("/bmp-mark.jpeg")} alt="" /><span>Brian McKeon Painting</span></div></div>
      <div className="manifesto-copy reveal"><p className="kicker light">More than a color change</p><h2>The difference is in what happens <em>before the brush moves.</em></h2><p>Careful protection. Honest surface preparation. Clean lines. The right finish for the way the space is used. That is how a paint job becomes craftsmanship.</p><div className="manifesto-details"><span><b>01</b>Clear scope</span><span><b>02</b>Careful preparation</span><span><b>03</b>Confident finish</span></div><a className="button button-cream" href={route("/about/")}>Discover the approach <span>↗</span></a></div>
      <p className="manifesto-word" aria-hidden="true">CRAFT</p>
    </section>

    <section className="comparison-section" aria-labelledby="comparison-title">
      <div className="comparison-copy reveal"><p className="kicker">A real project study</p><h2 id="comparison-title">See what careful prep can <em>change.</em></h2><p>Drag the control to compare preparation in progress with the completed blue exterior. These photographs are from Brian McKeon Painting’s actual work.</p><div className="comparison-facts"><p><span>01</span><b>Surface preparation</b></p><p><span>02</span><b>Complete color change</b></p><p><span>03</span><b>Clean white trim</b></p></div></div>
      <div className="comparison-wrap reveal" style={{ "--reveal": `${comparison}%` } as CSSProperties}><div className="comparison-frame"><img className="comparison-after" src={asset("/FB_IMG_1787616069960.jpg")} alt="Completed blue exterior with crisp white trim" /><div className="comparison-before"><img src={asset("/FB_IMG_1787616087430.jpg")} alt="Red exterior during surface preparation" /></div><div className="comparison-divider"><span>↔</span></div><span className="comparison-label label-before">Preparation</span><span className="comparison-label label-after">Completed</span><input type="range" min="15" max="85" value={comparison} onChange={(event) => setComparison(Number(event.target.value))} aria-label="Compare preparation and finished exterior" /></div><div className="comparison-caption"><p><span>Project</span>Exterior transformation</p><p><span>Finish</span>Blue siding · White trim</p></div></div>
    </section>

    <section className="section work home-work">
      <div className="work-head reveal"><div><p className="kicker">The proof is in the finish</p><h2>Actual projects.<br /><em>Not stock photos.</em></h2></div><a className="text-link" href={route("/work/")}>Explore the complete portfolio</a></div>
      <div className="project-grid home-project-grid">{projects.slice(0, 3).map((project, index) => <article className={`project-card project-feature project-feature-${index + 1} reveal`} key={project.title}><a className="project-image" href={route("/work/")} style={{ backgroundImage: `url(${asset(project.images[0])})` }} aria-label={`Explore ${project.title} in the portfolio`}><span className="photo-count">{String(project.images.length).padStart(2, "0")} photos</span><span className="view-project">Open project <i>↗</i></span></a><div className="project-meta"><div><p>{project.type}</p><h3>{project.title}</h3></div><span>{project.note}</span></div></article>)}</div>
    </section>

    <section className="page-cta page-cta-premium"><div className="cta-mark"><img src={asset("/bmp-mark.jpeg")} alt="" /></div><div className="cta-copy"><p className="kicker light">Your space is next</p><h2>Bring the project.<br /><em>We&apos;ll bring the finish.</em></h2><div><a className="button button-gold" href={route("/contact/")}>Request an estimate <span>↗</span></a><a href="tel:+16038581206">Call 603 858 1206</a></div></div></section>
  </>;
}

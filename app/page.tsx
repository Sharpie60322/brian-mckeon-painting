"use client";

import { type CSSProperties, useState } from "react";
import { projects, services } from "./site-data";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;
const route = (path: string) => `${basePath}${path}`;

export default function Home() {
  const [comparison, setComparison] = useState(53);

  return <>
    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow"><span /> Residential · Commercial · Specialty</p>
        <h1>Craftsmanship<br />in <em>every coat.</em></h1>
        <p className="hero-lede">Thoughtful preparation. Clean, confident finishes. Painting that makes homes, decks, businesses, and outdoor spaces feel considered again.</p>
        <div className="hero-actions"><a className="button button-primary" href={route("/contact/")}>Start your project <span>↗</span></a><a className="text-link" href={route("/work/")}>Explore completed work</a></div>
        <div className="trust-note"><span className="shield">✓</span><p><b>General liability insured</b><small>Proof of current coverage available after details are verified</small></p></div>
      </div>

      <div className="hero-art" aria-label="Original artwork celebrating professional paint craftsmanship">
        <div className="hero-image-shell"><img src={asset("/hero-craft.webp")} alt="" /></div>
        <div className="hero-brand-lockup"><img src={asset("/bmp-mark.jpeg")} alt="BMP paintbrush emblem" /><p><span>Brian McKeon</span><b>Painting</b></p></div>
        <div className="finish-card"><span>01</span><p>Preparation first<br /><b>Finish with confidence</b></p></div>
        <div className="palette-card"><p>Signature palette</p><span className="palette-dot palette-navy" /><span className="palette-dot palette-blue" /><span className="palette-dot palette-cyan" /><span className="palette-dot palette-gold" /></div>
        <p className="art-caption">Original BMP studio artwork <span>Craft · Color · Care</span></p>
      </div>
      <a className="scroll-cue" href="#overview"><span>Discover</span><i /></a>
    </section>

    <section className="service-strip" aria-label="Featured services"><div className="ticker"><p>Interior &amp; exterior</p><span>✦</span><p>Decks &amp; fences</p><span>✦</span><p>Commercial spaces</p><span>✦</span><p>Furniture &amp; objects</p><span>✦</span><p>Interior &amp; exterior</p><span>✦</span><p>Decks &amp; fences</p><span>✦</span><p>Commercial spaces</p><span>✦</span><p>Furniture &amp; objects</p><span>✦</span></div></section>

    <section className="section services home-services" id="overview">
      <div className="section-heading reveal"><div><p className="kicker">Choose your path</p><h2>What can we<br /><em>transform?</em></h2></div><p>Start with the type of project you have in mind, then explore the details on the dedicated services page.</p></div>
      <div className="services-grid">{services.map((service, index) => <a className="service-card reveal" href={route("/services/")} key={service.title} style={{ transitionDelay: `${index * 70}ms` }}><div className="service-top"><span>{service.number}</span><i>↗</i></div><div className="service-symbol" aria-hidden="true"><b /><b /><b /></div><p className="service-tag">{service.tag}</p><h3>{service.title}</h3><p>{service.text}</p></a>)}</div>
      <div className="section-more"><a href={route("/services/")}>Explore every service <span>↗</span></a></div>
    </section>

    <section className="home-story">
      <div className="home-story-art reveal"><img src={asset("/paint-artwork.webp")} alt="Original abstract blue and gold paint artwork" /><span>Original BMP studio artwork</span></div>
      <div className="home-story-copy reveal"><p className="kicker light">The standard behind the work</p><h2>A professional finish starts <em>before the can opens.</em></h2><p>Clear scope, careful protection, the right preparation, and direct communication create the result people remember.</p><a className="button button-cream" href={route("/about/")}>How Brian works <span>↗</span></a></div>
    </section>

    <section className="comparison-section" aria-labelledby="comparison-title">
      <div className="comparison-copy reveal"><p className="kicker">A real project study</p><h2 id="comparison-title">See what careful prep can <em>change.</em></h2><p>Drag the control to compare preparation in progress with the completed blue exterior. These photographs are from Brian McKeon Painting’s actual work.</p><div className="comparison-facts"><p><span>01</span><b>Surface preparation</b></p><p><span>02</span><b>Complete color change</b></p><p><span>03</span><b>Clean white trim</b></p></div></div>
      <div className="comparison-wrap reveal" style={{ "--reveal": `${comparison}%` } as CSSProperties}><div className="comparison-frame"><img className="comparison-after" src={asset("/FB_IMG_1787616069960.jpg")} alt="Completed blue exterior with crisp white trim" /><div className="comparison-before"><img src={asset("/FB_IMG_1787616087430.jpg")} alt="Red exterior during surface preparation" /></div><div className="comparison-divider"><span>↔</span></div><span className="comparison-label label-before">Prep</span><span className="comparison-label label-after">Finish</span><input type="range" min="15" max="85" value={comparison} onChange={(event) => setComparison(Number(event.target.value))} aria-label="Compare preparation and finished exterior" /></div><div className="comparison-caption"><p><span>Project</span>Exterior transformation</p><p><span>Finish</span>Blue siding · White trim</p></div></div>
    </section>

    <section className="section work home-work">
      <div className="work-head reveal"><div><p className="kicker">Selected work</p><h2>Real projects.<br /><em>Closer look.</em></h2></div><a className="text-link" href={route("/work/")}>Open the full portfolio</a></div>
      <div className="project-grid home-project-grid">{projects.slice(0, 2).map((project) => <article className="project-card reveal" key={project.title}><a className="project-image" href={route("/work/")} style={{ backgroundImage: `url(${asset(project.images[0])})` }} aria-label={`Explore ${project.title} in the portfolio`}><span className="photo-count">{String(project.images.length).padStart(2, "0")} photos</span><span className="view-project">Open portfolio <i>↗</i></span></a><div className="project-meta"><div><p>{project.type}</p><h3>{project.title}</h3></div><span>{project.note}</span></div></article>)}</div>
    </section>

    <section className="page-cta"><p className="kicker light">Ready when you are</p><h2>Bring the project.<br /><em>We&apos;ll bring the finish.</em></h2><div><a className="button button-cream" href={route("/contact/")}>Request an estimate <span>↗</span></a><a href="tel:+16038581206">Call 603 858 1206</a></div></section>
  </>;
}

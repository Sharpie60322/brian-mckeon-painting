"use client";

import { useState } from "react";
import { reviews } from "../site-data";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;
const route = (path: string) => `${basePath}${path}`;

export default function AboutPage() {
  const [review, setReview] = useState(0);

  return <>
    <section className="inner-hero inner-hero-about" id="top"><div><p className="eyebrow"><span /> About the work</p><h1>Care you can see.<br /><em>Clarity you can feel.</em></h1><p>A premium result is built through preparation, communication, and respect for the property—not just the final color.</p></div><aside><span>03</span><p>The website is designed to make the owner’s approach visible before the first conversation begins.</p></aside></section>

    <section className="why-section about-why"><div className="why-visual reveal"><img className="why-art-image" src={asset("/paint-artwork.webp")} alt="Original abstract blue and gold paint artwork" /><div className="why-brand-plaque"><img src={asset("/bmp-mark.jpeg")} alt="" /><p><strong>Craft is visible</strong><span>in the smallest details</span></p></div><div className="why-badge"><b>Made for</b><span>the details</span></div></div><div className="why-copy reveal"><p className="kicker light">The difference is in the prep</p><h2>A finish should look good <em>up close.</em></h2><p className="why-lede">A professional result is more than color on a surface. It is the preparation underneath, the care around your property, and the clear communication all the way through.</p><div className="principles"><div><span>01</span><p><b>Clear scope</b>Know what is being painted, prepared, and protected before work begins.</p></div><div><span>02</span><p><b>Respectful work</b>A tidy jobsite, considered scheduling, and direct communication.</p></div><div><span>03</span><p><b>Right-size solutions</b>Recommendations suited to the surface, use, and desired finish.</p></div></div><a className="button button-cream" href={route("/contact/")}>Tell us about your project <span>↗</span></a></div></section>

    <section className="about-values"><div className="about-values-head reveal"><p className="kicker">Working principles</p><h2>Professional does not need to feel <em>complicated.</em></h2></div><div className="values-grid"><article className="reveal"><span>01</span><h3>Listen first</h3><p>Understand the space, desired result, timing, and practical concerns before recommending the work.</p></article><article className="reveal"><span>02</span><h3>Protect the property</h3><p>Treat adjacent surfaces, belongings, landscaping, and occupied areas as part of the project plan.</p></article><article className="reveal"><span>03</span><h3>Communicate clearly</h3><p>Keep scope, scheduling, changes, and expectations visible from estimate through final walkthrough.</p></article></div></section>

    <section className="reviews-section" id="reviews"><div className="reviews-side reveal"><p className="kicker">Client notes</p><h2>Good work gets <em>remembered.</em></h2><p>Sample review layout. Replace these cards with owner-approved, verifiable client feedback before launch.</p><div className="review-controls"><button aria-label="Previous review" onClick={() => setReview((review - 1 + reviews.length) % reviews.length)}>←</button><span>{review + 1} / {reviews.length}</span><button aria-label="Next review" onClick={() => setReview((review + 1) % reviews.length)}>→</button></div></div><article className="review-card reveal" key={review}><div className="quote-mark">“</div><p>{reviews[review].quote}</p><div className="review-person"><span>{reviews[review].name.charAt(0)}</span><div><b>{reviews[review].name}</b><small>{reviews[review].project} · Demo review</small></div></div></article><div className="review-pattern" aria-hidden="true"><span>B</span><span>M</span><span>P</span></div></section>

    <section className="insurance-section"><div className="insurance-card reveal"><div className="insurance-icon">✓</div><div><p className="kicker light">Customer confidence</p><h2>General liability <em>insured.</em></h2><p>The owner has confirmed that the business carries general liability insurance. Add the verified certificate details below before the final public launch.</p></div><div className="policy-grid"><p><span>Carrier</span><b>[Confirm with owner]</b></p><p><span>Policy / COI</span><b>[Add reference]</b></p><p><span>Coverage dates</span><b>[Add effective dates]</b></p><p><span>Proof of coverage</span><b>Available on request*</b></p></div><small>*Publish details only after confirming current documentation, limits, and wording with the insurer or agent.</small></div></section>

    <section className="page-cta"><p className="kicker light">A better first conversation</p><h2>Tell us what needs<br /><em>a fresh start.</em></h2><div><a className="button button-cream" href={route("/contact/")}>Request an estimate <span>↗</span></a><a href={route("/work/")}>Explore the portfolio</a></div></section>
  </>;
}

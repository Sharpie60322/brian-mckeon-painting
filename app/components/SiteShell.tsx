"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const route = (path: string) => `${basePath}${path}`;
const asset = (path: string) => `${basePath}${path}`;

const navigation = [
  { label: "Services", href: "/#services" },
  { label: "Transformations", href: "/#comparison" },
  { label: "Portfolio", href: "/#work" },
  { label: "Process", href: "/#process" },
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

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [legalOpen, setLegalOpen] = useState<LegalKey | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    setMenuOpen(false);
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMenuOpen(false); setLegalOpen(null); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => { window.removeEventListener("keydown", onKeyDown); observer.disconnect(); };
  }, [pathname]);

  return <>
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <a className="brand" href={route("/#top")} aria-label="Brian McKeon Painting home">
        <span className="brand-mark"><img src={asset("/bmp-mark-hd.webp")} alt="" /></span>
        <span><strong>Brian McKeon</strong><small>Painting</small></span>
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation.map((item) => <a key={item.label} href={route(item.href)}>{item.label}</a>)}
        <a className="nav-cta" href={route("/#estimate")}>Request an estimate</a>
      </nav>
      <button className={`menu-button ${menuOpen ? "active" : ""}`} type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
      <span className="scroll-progress" style={{ transform: `scaleX(${scrollProgress})` }} aria-hidden="true" />
    </header>

    <div className={`mobile-menu ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
      <div className="mobile-menu-inner">
        <p>Explore</p>
        {[...navigation, { label: "Request an estimate", href: "/#estimate" }].map((item, index) => <a key={item.label} href={route(item.href)} onClick={() => setMenuOpen(false)}><span>0{index + 1}</span>{item.label}</a>)}
        <div className="mobile-contact"><span>Prefer to talk?</span><a href="tel:+16038581206">603 858 1206</a></div>
      </div>
    </div>

    <main>{children}</main>

    <footer>
      <div className="footer-brand"><img className="footer-full-brand" src={asset("/bmp-brand-hd.webp")} alt="Brian McKeon Painting, 603 858 1206" /><div><h2>Let&apos;s give it<br /><em>a better finish.</em></h2><a href={route("/#estimate")}>Request an estimate <span>↗</span></a></div></div>
      <div className="footer-grid">
        <div><p>Brian McKeon Painting</p><span>Residential · Commercial · Specialty</span><a href="tel:+16038581206">603 858 1206</a><a className="footer-email" href="mailto:b.mckeonpainting@gmail.com">b.mckeonpainting@gmail.com</a></div>
        <div><p>Explore</p>{navigation.map((item) => <a key={item.label} href={route(item.href)}>{item.label}</a>)}<a href={route("/#estimate")}>Contact</a></div>
        <div><p>Legal &amp; trust</p><button onClick={() => setLegalOpen("privacy")}>Privacy notice</button><button onClick={() => setLegalOpen("terms")}>Website terms</button><button onClick={() => setLegalOpen("insurance")}>Insurance disclosure</button><button onClick={() => setLegalOpen("accessibility")}>Accessibility</button></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Brian McKeon Painting. Demo website.</span><a href="#top">Back to top ↑</a></div>
    </footer>

    <a className="mobile-estimate" href={route("/#estimate")}>Request an estimate <span>↗</span></a>

    {legalOpen && <div className="modal-backdrop" role="presentation" onMouseDown={() => setLegalOpen(null)}><section className="legal-modal" role="dialog" aria-modal="true" aria-labelledby="legal-title" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setLegalOpen(null)} aria-label="Close">×</button><p className="kicker">Legal placeholder</p><h2 id="legal-title">{legalContent[legalOpen].title}</h2><p>{legalContent[legalOpen].body}</p><button className="button button-primary" onClick={() => setLegalOpen(null)}>Close <span>×</span></button></section></div>}
  </>;
}

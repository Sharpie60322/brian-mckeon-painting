"use client";

import { useEffect, useMemo, useState } from "react";
import { projectFilters, projects } from "../site-data";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;
const route = (path: string) => `${basePath}${path}`;

export default function WorkPage() {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const filteredProjects = useMemo(() => filter === "All" ? projects : projects.filter((project) => project.type === filter), [filter]);

  useEffect(() => { if (selectedProject) setGalleryIndex(0); }, [selectedProject]);
  useEffect(() => { const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setSelectedProject(null); window.addEventListener("keydown", onKeyDown); return () => window.removeEventListener("keydown", onKeyDown); }, []);

  return <>
    <section className="inner-hero inner-hero-work" id="top"><div><p className="eyebrow"><span /> Portfolio</p><h1>Real surfaces.<br /><em>Real transformations.</em></h1><p>Explore completed work from Brian McKeon Painting. Open any project to move through its full set of owner-provided photographs.</p></div><aside><span>02</span><p>Every image in this portfolio comes from the owner’s completed work—not stock photography or generated project imagery.</p></aside></section>

    <section className="section work work-page"><div className="work-head reveal"><div><p className="kicker">Completed projects</p><h2>Take a<br /><em>closer look.</em></h2></div><div className="filter-list" role="group" aria-label="Filter portfolio projects">{projectFilters.map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}</div></div><p className="demo-disclosure reveal">Completed-project photography from Brian McKeon Painting. Select a project to explore the full gallery.</p><div className="project-grid">{filteredProjects.map((project) => <article className="project-card reveal" key={project.title}><button className="project-image" style={{ backgroundImage: `url(${asset(project.images[0])})` }} onClick={() => setSelectedProject(project)} aria-label={`View ${project.title} gallery with ${project.images.length} photos`}><span className="photo-count">{String(project.images.length).padStart(2, "0")} photos</span><span className="view-project">View gallery <i>↗</i></span></button><div className="project-meta"><div><p>{project.type}</p><h3>{project.title}</h3></div><span>{project.note}</span></div></article>)}</div></section>

    <section className="portfolio-note"><span>04</span><div><p className="kicker light">More work is always underway</p><h2>Your project could be <em>next.</em></h2></div><a className="button button-cream" href={route("/contact/")}>Start a conversation <b>↗</b></a></section>

    {selectedProject && <div className="modal-backdrop gallery-backdrop" role="presentation" onMouseDown={() => setSelectedProject(null)}><section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-gallery-title" onMouseDown={(event) => event.stopPropagation()}><header className="project-modal-head"><div><p>{selectedProject.type} · {galleryIndex + 1} of {selectedProject.images.length}</p><h2 id="project-gallery-title">{selectedProject.title}</h2></div><button className="gallery-close" onClick={() => setSelectedProject(null)} aria-label="Close project gallery">×</button></header><div className="gallery-stage"><img src={asset(selectedProject.images[galleryIndex])} alt={`${selectedProject.title}, photo ${galleryIndex + 1} of ${selectedProject.images.length}`} />{selectedProject.images.length > 1 && <><button className="gallery-nav gallery-prev" onClick={() => setGalleryIndex((galleryIndex - 1 + selectedProject.images.length) % selectedProject.images.length)} aria-label="Previous photo">←</button><button className="gallery-nav gallery-next" onClick={() => setGalleryIndex((galleryIndex + 1) % selectedProject.images.length)} aria-label="Next photo">→</button></>}</div><div className="gallery-thumbs" aria-label="Choose a project photo">{selectedProject.images.map((image, index) => <button key={image} className={galleryIndex === index ? "active" : ""} onClick={() => setGalleryIndex(index)} aria-label={`Show photo ${index + 1}`} aria-current={galleryIndex === index ? "true" : undefined}><img src={asset(image)} alt="" /></button>)}</div></section></div>}
  </>;
}

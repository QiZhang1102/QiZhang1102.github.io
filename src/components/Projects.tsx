import { projects } from '../data/projects'
import { Section } from './Section'
import { Tag } from './Tag'

export function Projects() {
  return (
    <Section id="projects" title="Projects" eyebrow="Selected Work">
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <article key={project.title} className="academic-card card-hover flex min-h-[360px] flex-col">
            <div className="mb-6 h-28 rounded-xl border border-slate-200 bg-[linear-gradient(135deg,#F7F9FB,#EAF1F6)] p-5">
              <div className="h-full rounded-lg border border-dashed border-academicBlue/30 bg-white/60" aria-hidden="true" />
            </div>
            <h3 className="font-serif text-2xl font-semibold text-navy">{project.title}</h3>
            <p className="mt-4 flex-1 leading-7 text-muted">{project.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <Tag key={technology}>{technology}</Tag>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a className="small-button" href={project.githubUrl} aria-label={`${project.title} GitHub`}>
                GitHub
              </a>
              {project.demoUrl ? (
                <a className="small-button small-button-primary" href={project.demoUrl} aria-label={`${project.title} demo`}>
                  Demo
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}

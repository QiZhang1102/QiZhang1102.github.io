import { experiences } from '../data/experience'
import { Section } from './Section'
import { Tag } from './Tag'

export function Experience() {
  return (
    <Section id="experience" title="Experience" eyebrow="Academic & Technical">
      <div className="relative ml-2 border-l border-slate-200 pl-8">
        {experiences.map((experience) => (
          <article key={`${experience.role}-${experience.organization}`} className="relative pb-10 last:pb-0">
            <span className="absolute -left-[41px] top-2 h-4 w-4 rounded-full border-4 border-white bg-academicBlue shadow-sm" aria-hidden="true" />
            <div className="academic-card">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-navy">{experience.role}</h3>
                  <p className="mt-1 font-semibold text-academicBlue">{experience.organization}</p>
                </div>
                <p className="rounded-full bg-slate-50 px-4 py-2 text-sm font-semibold text-muted">{experience.date}</p>
              </div>
              <p className="mt-4 leading-7 text-muted">{experience.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {experience.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}

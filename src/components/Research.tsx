import { researchInterests } from '../data/research'
import { Section } from './Section'
import { Tag } from './Tag'

export function Research() {
  return (
    <Section id="research" title="Research Interests" eyebrow="Research">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {researchInterests.map((item) => (
          <article key={item.title} className="academic-card card-hover">
            <h3 className="font-serif text-2xl font-semibold leading-tight text-navy">{item.title}</h3>
            <p className="mt-4 leading-7 text-muted">{item.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}

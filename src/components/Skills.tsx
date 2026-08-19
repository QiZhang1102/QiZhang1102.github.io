import { skillGroups } from '../data/skills'
import { Section } from './Section'
import { Tag } from './Tag'

export function Skills() {
  return (
    <Section id="skills" title="Technical Skills" eyebrow="Methods & Tools" className="py-10 md:py-14">
      <div className="grid gap-5 md:grid-cols-2">
        {skillGroups.map((group) => (
          <article key={group.title} className="academic-card">
            <h3 className="font-serif text-xl font-semibold text-navy">{group.title}</h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <Tag key={skill}>{skill}</Tag>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}

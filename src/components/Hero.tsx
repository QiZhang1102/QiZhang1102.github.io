import profileImage from '../assets/profile-placeholder.svg'
import { profile } from '../data/profile'
import { DocumentIcon, GithubIcon, LinkedinIcon, MailIcon, ScholarIcon } from './Icons'

const socialLinks = [
  { label: 'Email', href: profile.links.email, icon: MailIcon },
  { label: 'GitHub', href: profile.links.github, icon: GithubIcon },
  { label: 'LinkedIn', href: profile.links.linkedin, icon: LinkedinIcon },
  { label: 'Resume', href: profile.links.resume, icon: DocumentIcon },
  { label: 'Google Scholar', href: profile.links.scholar, icon: ScholarIcon },
]

export function Hero() {
  return (
    <section id="about" className="scroll-mt-28 pb-14 pt-14 md:pb-20 md:pt-20">
      <div className="grid items-center gap-10 md:grid-cols-[300px_1fr] lg:gap-16">
        <div className="flex justify-center md:justify-start">
          <img
            src={profileImage}
            alt="Replaceable academic profile placeholder for Qi Zhang"
            className="h-[240px] w-[240px] rounded-[22px] border-2 border-academicGold object-cover shadow-academic"
          />
        </div>
        <div className="text-center md:text-left">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-muted">{profile.affiliation}</p>
          <h1 className="font-serif text-[clamp(2.45rem,10vw,3.25rem)] font-semibold leading-[1.04] text-navy md:text-[clamp(3.1rem,7vw,4rem)]">
            <span className="block md:inline">Qi (Mia)</span> <span className="block md:inline">Zhang</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base font-semibold uppercase tracking-[0.14em] text-academicBlue md:mx-0 md:text-lg md:tracking-[0.18em]">
            {profile.headline}
          </p>
          <div className="mx-auto mt-8 grid max-w-sm grid-cols-1 gap-3 sm:flex sm:max-w-none sm:flex-wrap sm:justify-center md:mx-0 md:justify-start">
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <a key={link.label} href={link.href} className="social-button" aria-label={link.label}>
                  <Icon className="h-5 w-5 text-academicBlue" />
                  <span>{link.label}</span>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

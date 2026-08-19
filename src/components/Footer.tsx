import { profile } from '../data/profile'

export function Footer() {
  return (
    <footer className="mt-10 bg-navy text-white">
      <div className="mx-auto max-w-[1300px] px-5 py-10 md:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="font-serif text-2xl font-semibold">Qi Zhang</p>
            <p className="mt-2 text-sm uppercase tracking-[0.16em] text-white/70">Data Science · Machine Learning · AI Research</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm font-semibold text-white/80">
            <a className="focus-ring hover:text-academicGold" href={profile.links.email}>Email</a>
            <a className="focus-ring hover:text-academicGold" href={profile.links.github}>GitHub</a>
            <a className="focus-ring hover:text-academicGold" href={profile.links.linkedin}>LinkedIn</a>
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-2 border-t border-white/10 pt-5 text-sm text-white/60 md:flex-row">
          <p>© 2026 Qi Zhang. All rights reserved.</p>
          <p>Built with React and TypeScript.</p>
        </div>
      </div>
    </footer>
  )
}

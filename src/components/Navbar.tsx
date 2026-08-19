import { useEffect, useState } from 'react'
import { navigationItems } from '../data/profile'
import { CloseIcon, MenuIcon } from './Icons'

export function Navbar() {
  const [activeId, setActiveId] = useState('about')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const sections = navigationItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible?.target.id) {
          setActiveId(visible.target.id)
        }
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: [0.08, 0.2, 0.4] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const links = navigationItems.map((item) => (
    <a
      key={item.id}
      href={`#${item.id}`}
      className={`nav-link ${activeId === item.id ? 'nav-link-active' : ''}`}
      onClick={() => setIsOpen(false)}
    >
      {item.label}
    </a>
  ))

  return (
    <header className="sticky top-0 z-50 bg-navy shadow-lg shadow-navy/10">
      <nav className="mx-auto flex h-20 max-w-[1300px] items-center justify-center px-5 md:px-8" aria-label="Main navigation">
        <div className="hidden items-center justify-center gap-12 lg:flex">{links}</div>
        <button
          type="button"
          className="focus-ring ml-auto inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/20 text-white lg:hidden"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>
      {isOpen ? (
        <div className="border-t border-white/10 bg-navy px-5 pb-5 lg:hidden">
          <div className="mx-auto grid max-w-[1300px] gap-1">{links}</div>
        </div>
      ) : null}
    </header>
  )
}

type IconProps = {
  className?: string
}

export function MailIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 6h16v12H4V6Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

export function GithubIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 19c-4 1.2-4-2-5.5-2.5M15 21v-3.4c0-1 .1-1.4-.5-2 2.7-.3 5.5-1.3 5.5-6A4.7 4.7 0 0 0 18.7 6c.1-.3.6-1.7-.1-3.5 0 0-1-.3-3.6 1.3A12.4 12.4 0 0 0 8.5 4C6 2.2 5 2.5 5 2.5 4.3 4.3 4.8 5.7 4.9 6A4.7 4.7 0 0 0 3.6 9.6c0 4.6 2.8 5.6 5.5 6-.4.4-.7 1-.7 2V21"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function LinkedinIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 9h3v10H5V9Zm1.5-4a1.7 1.7 0 1 1 0 3.4 1.7 1.7 0 0 1 0-3.4Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 9h3v1.5c.7-1 1.8-1.8 3.4-1.8 2.5 0 4.1 1.7 4.1 5.1V19h-3v-4.8c0-1.7-.7-2.6-2-2.6-1.5 0-2.5 1-2.5 3V19h-3V9Z" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  )
}

export function DocumentIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 3h7l4 4v14H7V3Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M14 3v5h5M9.5 13h5M9.5 17h5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

export function ScholarIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m3 9 9-5 9 5-9 5-9-5Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M7 12v4.2c1.3 1.3 3 2 5 2s3.7-.7 5-2V12" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

export function MenuIcon({ className = 'h-6 w-6' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function CloseIcon({ className = 'h-6 w-6' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

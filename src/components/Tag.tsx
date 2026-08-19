type TagProps = {
  children: string
}

export function Tag({ children }: TagProps) {
  return <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-muted">{children}</span>
}

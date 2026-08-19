export function StatusBox() {
  return (
    <aside className="mt-10 flex gap-4 rounded-2xl border border-slate-200 border-l-4 border-l-academicBlue bg-[#F3F7FA] p-6 shadow-sm">
      <span className="mt-2 h-3 w-3 shrink-0 rounded-full bg-emerald-500 ring-4 ring-emerald-100" aria-hidden="true" />
      <p className="text-base leading-7 text-ink">
        <strong className="font-semibold text-navy">Current Focus</strong>{' '}
        Exploring research directions in LLM reasoning, test-time optimization, agentic AI systems, and AI for scientific discovery.
      </p>
    </aside>
  )
}

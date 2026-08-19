import { StatusBox } from './StatusBox'

export function About() {
  return (
    <div className="max-w-5xl">
      <div className="space-y-6 text-[1.08rem] leading-8 text-ink md:text-[1.28rem] md:leading-10">
        <p>
          Hi! I am currently a Data Science undergraduate at UC San Diego. My interests lie at the intersection of{' '}
          <strong className="font-semibold text-navy">machine learning</strong>,{' '}
          <span className="text-academicBlue">large language models</span>, and{' '}
          <span className="text-academicBlue">AI for scientific discovery</span>.
        </p>
        <p>
          My current research interests include LLM reasoning, test-time optimization, agentic AI systems, scientific machine learning,
          and spatiotemporal data analysis.
        </p>
        <p>
          I have experience with Python, pandas, NumPy, PyTorch, scikit-learn, Spark, Dask, AWS EC2, distributed computing,
          time-series analysis, machine learning pipelines, and data visualization.
        </p>
        <p>
          I am particularly interested in applying machine learning methods to both fundamental AI research problems and real-world
          scientific and engineering applications.
        </p>
      </div>
      <StatusBox />
    </div>
  )
}

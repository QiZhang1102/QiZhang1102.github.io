import { About } from './components/About'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Projects } from './components/Projects'
import { Research } from './components/Research'
import { Skills } from './components/Skills'

function App() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-[1300px] px-5 md:px-8">
        <Hero />
        <About />
        <Research />
        <Projects />
        <Experience />
        <Skills />
      </main>
      <Footer />
    </>
  )
}

export default App

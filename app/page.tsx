import About from '@/components/About'
import Features from '@/components/Features'
import Hero from '@/components/Hero'
import NavBar from '@/components/NavBar'

const Home = () => {
  return (
    <main className='relative min-h-screen w-screen overflow-hidden'>
      <NavBar />
      <Hero />
      <About />
      <Features />
    </main>
  )
}

export default Home
import About from '@/components/About'
import Hero from '@/components/Hero'
import NavBar from '@/components/NavBar'

const Home = () => {
  return (
    <main className='relative min-h-screen w-screen overflow-hidden'>
      <NavBar />
      <Hero />
      <About />
    </main>
  )
}

export default Home
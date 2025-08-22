import About from '@/components/About'
import Hero from '@/components/Hero'

const Home = () => {
  return (
    <main className='relative min-h-screen w-screen overflow-hidden'>
      <Hero />
      <About />
    </main>
  )
}

export default Home
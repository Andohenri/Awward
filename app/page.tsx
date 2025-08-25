import About from '@/components/About'
import Features from '@/components/Features'
import Hero from '@/components/Hero'
import NavBar from '@/components/NavBar'
import Story from '@/components/Story'

const Home = () => {
  return (
    <main className='relative min-h-screen w-screen overflow-hidden'>
      <NavBar />
      <Hero />
      <About />
      <Features />
      <Story />
    </main>
  )
}

export default Home
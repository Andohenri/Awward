import About from '@/components/About'
import Contact from '@/components/Contact'
import Features from '@/components/Features'
import Footer from '@/components/Footer'
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
      <Contact />
      <Footer />
    </main>
  )
}

export default Home
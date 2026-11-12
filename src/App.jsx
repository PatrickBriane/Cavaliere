import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Listing from './components/Listing.jsx'
import Story from './components/Story.jsx'
import Footer from './components/Footer.jsx'

function App() {


  return (
    <>
      <Header
        isSolid={false}
        tagline="WHERE TRADITION WEARS A MONOCLE AND THE FUTURE WEARS CONFIDENCE."
      />
      <Hero />
      <Listing />
      <Story />
      <Footer />
    </>
  )
}

export default App

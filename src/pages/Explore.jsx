import { useEffect } from 'react'
import Listing from '../components/Listing.jsx'
import Footer from '../components/Footer.jsx'

export default function Explore() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Listing />
      <Footer />
    </>
  )
}

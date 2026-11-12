import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LegalModal from '../components/LegalModal.jsx'
import Header from '../components/Header.jsx'

export default function PrivacyPolicy() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(true)

  const handleClose = () => {
    setIsOpen(false)
    navigate(-1)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#18120F' }}>
      <Header isSolid={true} />
      <LegalModal isOpen={isOpen} onClose={handleClose} type="privacy" />
    </div>
  )
}

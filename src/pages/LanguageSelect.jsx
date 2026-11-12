import { Link, useNavigate } from 'react-router-dom'
import './LanguageSelect.css'
import brandLogo from '../assets/ICONS/BRAND-LOGO.svg'
import heroBg from '../assets/LANDING PAGE/LANDING-BANNER.jpg'

const regions = [
  {
    name: 'Americas',
    options: [
      'United States — English',
      'Canada — English',
      'Canada — Français',
      'México — Español',
      'Brasil — Português',
    ],
  },
  {
    name: 'Europe',
    options: [
      'United Kingdom — English',
      'France — Français',
      'Italia — Italiano',
      'España — Español',
      'Deutschland — Deutsch',
      'Nederland — Nederlands',
      'Switzerland — Deutsch',
    ],
  },
  {
    name: 'Asia',
    options: [
      '中国大陆 — 简体中文',
      '日本 — 日本語',
      '香港特別行政區 — 繁體中文',
      'Singapore — English',
      'Malaysia — English',
      '台湾地区 — 繁體中文',
      'ประเทศไทย — ไทย',
      'Viet Nam — Tiếng Việt',
      'Indonesia — English',
      'Indonesia — Bahasa Indonesia',
      'India — English',
      'Philippines — English',
    ],
  },
  {
    name: 'Oceania',
    options: [
      'Australia — English',
      'New Zealand — English',
    ],
  },
  {
    name: 'Middle East',
    options: [
      'UAE — English',
      'الإمارات العربية المتحدة — العربية',
      'Saudi Arabia — English',
      'المملكة العربية السعودية — العربية',
      'Kuwait — English',
      'الكويت — العربية',
      'Qatar — English',
      'قطر — العربية',
    ],
  },
]

export default function LanguageSelect() {
  const navigate = useNavigate()

  const handleSelect = () => {
    navigate('/')
  }

  return (
    <div className="lang-page">
      <div className="lang-bg" style={{ backgroundImage: `url(${heroBg})` }} />

      <header className="lang-header">
        <Link to="/" className="lang-brand">
          <img src={brandLogo} alt="Cavalière Logo" className="lang-logo" />
          <span className="lang-brand-name">CAVALIÈRE</span>
        </Link>
      </header>

      <main className="lang-main">
        <div className="lang-grid">
          {regions.map((region) => (
            <div key={region.name} className="lang-region">
              <h2 className="lang-region-title">{region.name}</h2>
              <ul className="lang-list">
                {region.options.map((option) => (
                  <li key={option}>
                    <button className="lang-option" onClick={handleSelect}>
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>

      <footer className="lang-footer">
        <span>Other Countries / Regions: </span>
        <button className="lang-intl" onClick={handleSelect}>
          International (English)
        </button>
      </footer>
    </div>
  )
}

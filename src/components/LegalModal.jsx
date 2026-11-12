import './LegalModal.css'

export default function LegalModal({ isOpen, onClose, type }) {
  if (!isOpen) return null

  const isTerms = type === 'terms'
  const title = isTerms ? 'TERMS & CONDITIONS' : 'PRIVACY POLICY'
  const subtitle = isTerms
    ? 'LAST UPDATED: WINTER 2026 · THE HOUSE OF CAVALIÈRE'
    : 'DATA GOVERNANCE & PRIVACY COMPACT · CAVALIÈRE CLIENT SERVICES'

  return (
    <div className="legal-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="legal-modal-card" onClick={e => e.stopPropagation()}>
        <div className="legal-modal-header">
          <div>
            <p className="legal-modal-brand">CAVALIÈRE</p>
            <h2 className="legal-modal-title">{title}</h2>
            <p className="legal-modal-subtitle">{subtitle}</p>
          </div>
          <button className="legal-modal-close" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        <div className="legal-modal-body">
          {isTerms ? (
            <>
              <section className="legal-section">
                <h3>1. Preamble & House Philosophy</h3>
                <p>
                  Welcome to the House of Cavalière. By accessing, browsing, or placing orders through our online salon or flagship boutiques, you enter into a binding covenant with Cavalière S.A.S. Our creations are offered under principles of discretion, peerless craftsmanship, and mutual respect.
                </p>
              </section>

              <section className="legal-section">
                <h3>2. Authenticity & Limited Editions</h3>
                <p>
                  Every Cavalière garment, timepiece, and leather accessory is crafted in limited numbers, accompanied by a serialized seal of authenticity. We reserve the exclusive right to allocate atelier orders based on seasonal availability and client seniority.
                </p>
              </section>

              <section className="legal-section">
                <h3>3. Bespoke Orders & Tailoring Consultations</h3>
                <p>
                  Commissions for made-to-measure tailoring and runway couture require a non-refundable retainer. Fitting revisions are conducted with our master tailors either in salon or via our private client concierge.
                </p>
              </section>

              <section className="legal-section">
                <h3>4. Shipping, White-Glove Delivery & Risk of Loss</h3>
                <p>
                  Orders are dispatched in archival presentation packaging via insured white-glove couriers. Title and risk of loss pass to the client upon recorded physical signature at the specified delivery address.
                </p>
              </section>

              <section className="legal-section">
                <h3>5. Returns & Exchange Policy</h3>
                <p>
                  Eligible ready-to-wear items in pristine, unworn condition with all security ribbons and seals intact may be returned within fourteen (14) days of delivery. Bespoke, personalized, and intimate accessories are final sale.
                </p>
              </section>

              <section className="legal-section">
                <h3>6. Intellectual Property & Emblem</h3>
                <p>
                  All silhouettes, photography, typography, the Cavalière wordmark, and the iconic heraldic crest are protected worldwide under trademark and copyright statutes. Unauthorized reproduction is strictly forbidden.
                </p>
              </section>
            </>
          ) : (
            <>
              <section className="legal-section">
                <h3>1. Commitment to Client Confidentiality</h3>
                <p>
                  Discretion is the cornerstone of modern nobility. The House of Cavalière safeguards your identity, measurements, purchase histories, and correspondence with the highest echelon of cryptographic security and diplomatic discretion.
                </p>
              </section>

              <section className="legal-section">
                <h3>2. Information Entrusted to the House</h3>
                <p>
                  We collect personal details necessary to facilitate bespoke service: your name, billing credentials, couture sizing profiles, boutique appointments, and delivery preferences. We do not engage in data harvesting or third-party ad brokers.
                </p>
              </section>

              <section className="legal-section">
                <h3>3. Bespoke Concierge & Communications</h3>
                <p>
                  Your contact details are utilized exclusively to coordinate private viewings, seasonal lookbooks, delivery dispatch updates, and direct communications from your dedicated Cavalière client liaison.
                </p>
              </section>

              <section className="legal-section">
                <h3>4. Cryptographic Storage & Security</h3>
                <p>
                  Payment transactions are executed across PCI-DSS compliant protocols with tokenized encryption. Sartorial size records are securely stored within our private European data vaults.
                </p>
              </section>

              <section className="legal-section">
                <h3>5. Your Rights as a Valued Patron</h3>
                <p>
                  You retain full sovereign authority over your personal dossier. At any point, you may request access, rectification, or complete erasure of your patron profile by writing to <span className="legal-highlight">concierge@cavaliere.com</span>.
                </p>
              </section>

              <section className="legal-section">
                <h3>6. Policy Updates</h3>
                <p>
                  This Privacy Compact may be refreshed periodically to mirror evolving global standards. Patrons will be notified through our official communications upon any material amendment.
                </p>
              </section>
            </>
          )}
        </div>

        <div className="legal-modal-footer">
          <button className="legal-modal-btn" onClick={onClose}>
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  )
}

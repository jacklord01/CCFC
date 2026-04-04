import Link from "next/link";
import "./Footer.css"; // Create this

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        
        <div className="footer-brand">
          <h2 style={{ color: 'white' }}>Castlebar Celtic FC</h2>
          <p>The pride of Mayo football since 1924. Developing players, promoting community, and setting standards.</p>
          <div className="social-links">
            <a href="https://www.facebook.com/castlebarcelticfc" target="_blank" rel="noopener noreferrer" className="social-btn">
              Facebook
            </a>
          </div>
        </div>
        
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/teams">Teams</Link></li>
            <li><Link href="/shop">Club Shop</Link></li>
            <li><Link href="/fundraise/lotto">Lotto</Link></li>
          </ul>
        </div>
        
        <div className="footer-policies">
          <h3>Club Policies & Legal</h3>
          <ul>
            <li><Link href="/policies/terms-and-conditions">Terms & Conditions</Link></li>
            <li><Link href="/policies/cookie-policy">Cookie Policy</Link></li>
            <li><Link href="/policies/gdpr">GDPR Privacy Policy</Link></li>
            <li><Link href="/policies/child-safeguarding">Child Safeguarding</Link></li>
            <li><Link href="/policies/code-of-conduct">Parent & Supporter Code</Link></li>
            <li><Link href="/policies/photography-consent">Photography & Media Consent</Link></li>
            <li><Link href="/policies/lotto-terms">Lotto Fundraising Terms</Link></li>
          </ul>
        </div>
        
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Castlebar Celtic FC. Built by Dev Admin.</p>
      </div>
    </footer>
  );
}

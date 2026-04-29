export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__section">
          <h4>About Ghana Stay</h4>
          <ul className="footer__links">
            <li><a href="#">Our Mission</a></li>
            <li><a href="#">Team</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>
        <div className="footer__section">
          <h4>Support</h4>
          <ul className="footer__links">
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Cancellation Policy</a></li>
          </ul>
        </div>
        <div className="footer__section">
          <h4>Legal</h4>
          <ul className="footer__links">
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Cookie Policy</a></li>
            <li><a href="#">Accessibility</a></li>
          </ul>
        </div>
        <div className="footer__section">
          <h4>Follow Us</h4>
          <ul className="footer__links">
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <p>&copy; 2024 Ghana Stay. All rights reserved.</p>
      </div>
    </footer>
  );
}

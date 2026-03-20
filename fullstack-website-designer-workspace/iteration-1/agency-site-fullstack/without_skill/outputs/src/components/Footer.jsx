export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <p className="footer__copy">
        © {year} Apex Studio. All rights reserved.
      </p>
      <nav aria-label="Footer navigation">
        <ul className="footer__links">
          <li><a href="#work">Work</a></li>
          <li><a href="#team">Team</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="/privacy">Privacy</a></li>
        </ul>
      </nav>
    </footer>
  );
}

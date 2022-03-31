export function Footer() {
  return (
    <footer className="pd-lg flex-col align-i-center gap-md">
      <ul className="d-flex footer-links gap-sm">
        <a
          aria-labelledby="twitter-icon"
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/kjais1720"
          className="tr-btn tr-btn-icon"
        >
          <p className="hide" id="twitter-icon">
            Twitter
          </p>
          <i className="fab fa-twitter"></i>
        </a>
        <a
          aria-labelledby="github-icon"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/kjais1720"
          className="tr-btn tr-btn-icon"
        >
          <p className="hide" id="github-icon">
            Github
          </p>
          <i className="fab fa-github"></i>
        </a>
        <a
          aria-labelledby="linkedin-icon"
          target="_blank"
          rel="noopener noreferrer"
          href="https://linkedin.com/in/krituraj-anand"
          className="tr-btn tr-btn-icon"
        >
          <p className="hide" id="linkedin-icon">
            Linkedin
          </p>
          <i className="fab fa-linkedin"></i>
        </a>
      </ul>
      <p className="copywright">
        Created by
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://kjais-portfolio.vercel.app"
          className="tr-btn tr-btn-link"
        >
          Krituraj Anand
        </a>{" "}
      </p>
    </footer>
  );
}

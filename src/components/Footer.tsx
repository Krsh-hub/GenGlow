import { Sparkles, Twitter, Linkedin, Github } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-secondary/30">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg gradient-bg flex items-center justify-center">
                <img src="/favicon.ico" alt="Logo" width="32" height="32" />
              </div>
              <span className="font-display font-bold text-lg text-foreground">
                GenGlow
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              © {currentYear} GenGlow. All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-lg bg-secondary hover:bg-muted flex items-center justify-center transition-colors duration-200 group"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-lg bg-secondary hover:bg-muted flex items-center justify-center transition-colors duration-200 group"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-lg bg-secondary hover:bg-muted flex items-center justify-center transition-colors duration-200 group"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { Sparkles } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">
              BrandGlow
            </span>
          </a>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <a
              href="#about"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium"
            >
              About
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Navbar = () => {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    // Initial session
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
    });

    // Listen to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <img src="/favicon.ico" alt="Logo" width={32} height={32} />
            </div>

            <span className="font-display font-bold text-xl text-foreground">
              GenGlow
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link
              to="/about"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium"
            >
              About
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  to="/settings"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium"
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium px-3 py-1.5 rounded-full border border-border/60 hover:bg-accent transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/AuditResults"
                  className="text-sm font-medium px-3 py-1.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

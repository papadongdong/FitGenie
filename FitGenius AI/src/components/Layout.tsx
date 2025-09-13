import { useMember } from '@/integrations';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useState } from 'react';

export default function Layout() {
  const { member, isAuthenticated, isLoading, actions } = useMember();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Chat', href: '/chat' },
    { name: 'BMI Calculator', href: '/bmi' },
    { name: 'Diet Plans', href: '/diet' },
    { name: 'Tips', href: '/tips' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-primary">
      {/* Navigation */}
      <nav className="relative z-50 bg-primary/95 backdrop-blur-sm border-b border-primary-foreground/10">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-highlightyellow rounded-lg flex items-center justify-center">
                <span className="text-primary font-heading font-bold text-lg">F</span>
              </div>
              <span className="font-heading text-xl font-bold text-primary-foreground uppercase tracking-wide">
                FitGenius AI
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-paragraph text-sm font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-highlightyellow'
                      : 'text-secondary-foreground hover:text-highlightyellow'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Auth Section */}
            <div className="hidden md:flex items-center space-x-4">
              {isLoading && <LoadingSpinner />}
              {!isAuthenticated && !isLoading && (
                <Button
                  onClick={actions.login}
                  className="bg-buttonbackground text-buttontext hover:bg-buttonbackground/90 font-paragraph font-semibold"
                >
                  Sign In
                </Button>
              )}
              {isAuthenticated && (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 text-secondary-foreground hover:text-highlightyellow transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span className="font-paragraph text-sm">
                      {member?.profile?.nickname || member?.contact?.firstName || 'Profile'}
                    </span>
                  </Link>
                  <Button
                    onClick={actions.logout}
                    variant="ghost"
                    size="sm"
                    className="text-secondary-foreground hover:text-highlightyellow hover:bg-secondary-foreground/10"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-secondary-foreground hover:text-highlightyellow"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-primary border-t border-primary-foreground/10">
            <div className="px-4 py-4 space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block font-paragraph text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-highlightyellow'
                      : 'text-secondary-foreground hover:text-highlightyellow'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Auth */}
              <div className="pt-3 border-t border-primary-foreground/10">
                {!isAuthenticated && !isLoading && (
                  <Button
                    onClick={() => {
                      actions.login();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full bg-buttonbackground text-buttontext hover:bg-buttonbackground/90 font-paragraph font-semibold"
                  >
                    Sign In
                  </Button>
                )}
                {isAuthenticated && (
                  <div className="space-y-2">
                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-2 text-secondary-foreground hover:text-highlightyellow transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span className="font-paragraph text-sm">
                        {member?.profile?.nickname || member?.contact?.firstName || 'Profile'}
                      </span>
                    </Link>
                    <Button
                      onClick={() => {
                        actions.logout();
                        setMobileMenuOpen(false);
                      }}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-secondary-foreground hover:text-highlightyellow hover:bg-secondary-foreground/10"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-secondary border-t border-secondary-foreground/10">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-highlightyellow rounded-lg flex items-center justify-center">
                  <span className="text-primary font-heading font-bold text-lg">F</span>
                </div>
                <span className="font-heading text-xl font-bold text-secondary-foreground uppercase tracking-wide">
                  FitGenius AI
                </span>
              </div>
              <p className="font-paragraph text-secondary-foreground/80 text-sm leading-relaxed max-w-md">
                Your personal AI fitness and nutrition coach. Get personalized advice, diet plans, and expert guidance to achieve your health goals.
              </p>
            </div>
            
            <div>
              <h3 className="font-heading text-secondary-foreground font-bold text-sm uppercase tracking-wide mb-4">
                Features
              </h3>
              <ul className="space-y-2">
                <li><Link to="/chat" className="font-paragraph text-secondary-foreground/80 text-sm hover:text-highlightyellow transition-colors">AI Chat</Link></li>
                <li><Link to="/bmi" className="font-paragraph text-secondary-foreground/80 text-sm hover:text-highlightyellow transition-colors">BMI Calculator</Link></li>
                <li><Link to="/diet" className="font-paragraph text-secondary-foreground/80 text-sm hover:text-highlightyellow transition-colors">Diet Plans</Link></li>
                <li><Link to="/tips" className="font-paragraph text-secondary-foreground/80 text-sm hover:text-highlightyellow transition-colors">Health Tips</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-heading text-secondary-foreground font-bold text-sm uppercase tracking-wide mb-4">
                Support
              </h3>
              <ul className="space-y-2">
                <li><span className="font-paragraph text-secondary-foreground/80 text-sm">Help Center</span></li>
                <li><span className="font-paragraph text-secondary-foreground/80 text-sm">Privacy Policy</span></li>
                <li><span className="font-paragraph text-secondary-foreground/80 text-sm">Terms of Service</span></li>
                <li><span className="font-paragraph text-secondary-foreground/80 text-sm">Contact Us</span></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-secondary-foreground/10 mt-8 pt-8">
            <p className="font-paragraph text-secondary-foreground/60 text-sm text-center">
              © 2025 FitGenius AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
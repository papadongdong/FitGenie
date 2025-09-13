import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Dumbbell, Home, MessageCircle, Calculator, UtensilsCrossed, Lightbulb } from "lucide-react";

export default function Navigation() {
  const [location] = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/chat", label: "Chat", icon: MessageCircle },
    { path: "/bmi", label: "BMI Calculator", icon: Calculator },
    { path: "/diet", label: "Diet Plans", icon: UtensilsCrossed },
    { path: "/tips", label: "Tips", icon: Lightbulb },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2" data-testid="link-home-logo">
            <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
              <Dumbbell className="text-secondary-foreground w-4 h-4" />
            </div>
            <span className="text-xl font-bold text-foreground">FITGENIUS AI</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                href={item.path}
                className={`text-muted-foreground hover:text-foreground transition-colors ${
                  location === item.path ? 'nav-link active' : 'nav-link'
                }`}
                data-testid={`link-nav-${item.label.toLowerCase().replace(' ', '-')}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          <Button variant="outline" data-testid="button-signin">
            Sign In
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border md:hidden z-50">
        <div className="flex justify-around py-2">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link 
                key={item.path} 
                href={item.path}
                className={`flex flex-col items-center p-2 ${
                  location === item.path ? 'mobile-nav active' : 'mobile-nav'
                }`}
                data-testid={`link-mobile-${item.label.toLowerCase().replace(' ', '-')}`}
              >
                <IconComponent className="w-5 h-5 mb-1" />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

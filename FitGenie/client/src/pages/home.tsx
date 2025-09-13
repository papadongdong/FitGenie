import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { Calculator, UtensilsCrossed, Lightbulb, ArrowRight, Heart, Zap } from "lucide-react";

export default function Home() {
  return (
    <section className="section">
      <div className="container mx-auto px-4 pt-20 relative">
        {/* Floating Elements */}
        <div className="absolute top-32 left-10 floating-element">
          <div className="w-16 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-xl"></div>
        </div>
        <div className="absolute top-48 right-16 floating-element">
          <div className="w-12 h-12 bg-secondary rounded-xl shadow-xl flex items-center justify-center">
            <Heart className="text-secondary-foreground w-6 h-6" />
          </div>
        </div>
        <div className="absolute bottom-32 left-20 floating-element">
          <div className="w-20 h-14 bg-card rounded-lg shadow-xl border border-border"></div>
        </div>
        <div className="absolute bottom-48 right-12 floating-element">
          <div className="w-14 h-14 bg-gradient-to-r from-accent to-secondary rounded-2xl shadow-xl flex items-center justify-center">
            <Zap className="text-accent-foreground w-6 h-6" />
          </div>
        </div>

        {/* Hero Content */}
        <div className="text-center max-w-5xl mx-auto">
          <p className="text-secondary font-medium mb-4 tracking-wide" data-testid="text-brand">FITGENIUS AI</p>
          <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-8 leading-tight" data-testid="text-hero-title">
            TRANSFORM YOUR<br />
            HEALTH JOURNEY<br />
            WITH AI-POWERED<br />
            GUIDANCE
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto" data-testid="text-hero-description">
            Get personalized fitness advice, nutrition plans, and health insights from our advanced AI coach. Your path to wellness starts here.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/chat">
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 group"
                data-testid="button-start-chatting"
              >
                <span>Start Chatting Now</span>
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button 
              className="bg-secondary text-secondary-foreground hover:bg-accent px-8 py-4 font-medium"
              data-testid="button-signup"
            >
              Sign Up Free
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <Link href="/bmi">
            <Card className="bg-card/50 backdrop-blur-sm p-6 border border-border hover:bg-card/70 transition-all duration-300 cursor-pointer" data-testid="card-feature-bmi">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4">
                <Calculator className="text-primary-foreground w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">BMI Calculator</h3>
              <p className="text-muted-foreground">Get instant BMI analysis with personalized health recommendations.</p>
            </Card>
          </Link>
          
          <Link href="/diet">
            <Card className="bg-card/50 backdrop-blur-sm p-6 border border-border hover:bg-card/70 transition-all duration-300 cursor-pointer" data-testid="card-feature-diet">
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mb-4">
                <UtensilsCrossed className="text-secondary-foreground w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Diet Planning</h3>
              <p className="text-muted-foreground">AI-powered meal plans tailored to your goals and preferences.</p>
            </Card>
          </Link>
          
          <Link href="/tips">
            <Card className="bg-card/50 backdrop-blur-sm p-6 border border-border hover:bg-card/70 transition-all duration-300 cursor-pointer" data-testid="card-feature-tips">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mb-4">
                <Lightbulb className="text-accent-foreground w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Health Tips</h3>
              <p className="text-muted-foreground">Personalized advice powered by advanced AI technology.</p>
            </Card>
          </Link>
        </div>
      </div>
    </section>
  );
}

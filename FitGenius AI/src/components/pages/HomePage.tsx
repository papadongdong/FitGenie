import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MessageCircle, Calculator, Utensils, Lightbulb, ArrowRight, Zap, Target, Heart, Shield, FileText } from 'lucide-react';
import { useMember } from '@/integrations';

export default function HomePage() {
  const { isAuthenticated, actions } = useMember();

  return (
    <div className="min-h-screen">
      {/* Hero Section - Inspired by the festival layout */}
      <section className="relative w-full max-w-[120rem] mx-auto min-h-screen flex items-center justify-center overflow-hidden bg-primary">
        {/* Floating Elements - Inspired by the scattered objects in the image */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top Left Card */}
          <div className="absolute top-20 left-8 w-32 h-24 bg-secondary rounded-lg transform -rotate-12 opacity-80">
            <div className="p-3 text-secondary-foreground text-xs font-paragraph">
              <div className="w-full h-2 bg-highlightyellow rounded mb-2"></div>
              <div className="space-y-1">
                <div className="w-3/4 h-1 bg-secondary-foreground/60 rounded"></div>
                <div className="w-1/2 h-1 bg-secondary-foreground/60 rounded"></div>
              </div>
            </div>
          </div>

          {/* Top Right Element */}
          <div className="absolute top-16 right-12 w-20 h-20 bg-highlightyellow rounded-xl transform rotate-12 flex items-center justify-center">
            <Heart className="w-8 h-8 text-primary" />
          </div>

          {/* Bottom Left Element */}
          <div className="absolute bottom-32 left-16 w-24 h-32 bg-buttonbackground rounded-lg transform rotate-6 shadow-lg">
            <div className="p-2 h-full flex flex-col">
              <div className="w-full h-16 bg-primary/10 rounded mb-2"></div>
              <div className="flex-1 space-y-1">
                <div className="w-full h-1 bg-primary/20 rounded"></div>
                <div className="w-2/3 h-1 bg-primary/20 rounded"></div>
              </div>
            </div>
          </div>

          {/* Bottom Right Complex Element */}
          <div className="absolute bottom-20 right-8 w-40 h-28 transform -rotate-6">
            <div className="relative">
              <div className="w-32 h-20 bg-secondary-foreground rounded-lg"></div>
              <div className="absolute -top-2 -right-2 w-12 h-12 bg-highlightyellow rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div className="absolute bottom-2 left-2 w-6 h-6 bg-primary rounded"></div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="mb-6">
            <span className="font-heading text-highlightyellow text-sm font-bold uppercase tracking-wider">
              FitGenius AI
            </span>
          </div>
          
          <h1 className="font-heading text-highlightyellow text-5xl sm:text-6xl lg:text-7xl font-black uppercase leading-tight mb-8 tracking-wide">
            Transform Your Health Journey with AI-Powered Guidance
          </h1>
          
          <p className="font-paragraph text-secondary-foreground text-lg sm:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Get personalized fitness advice, nutrition plans, and health insights from our advanced AI coach. Your path to wellness starts here.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              asChild
              className="bg-buttonbackground text-buttontext hover:bg-buttonbackground/90 font-paragraph font-bold text-lg px-8 py-4 h-auto"
            >
              <Link to="/chat">
                Start Chatting Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            
            {!isAuthenticated && (
              <Button
                onClick={actions.login}
                variant="outline"
                className="border-2 border-highlightyellow text-highlightyellow hover:bg-highlightyellow hover:text-primary font-paragraph font-bold text-lg px-8 py-4 h-auto"
              >
                Sign Up Free
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-secondary-foreground text-4xl sm:text-5xl font-black uppercase mb-6 tracking-wide">
              Powerful AI Features
            </h2>
            <p className="font-paragraph text-secondary-foreground/80 text-xl max-w-3xl mx-auto">
              Everything you need to achieve your fitness and nutrition goals, powered by advanced artificial intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-primary border-0 p-8 text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-highlightyellow rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading text-primary-foreground text-xl font-bold uppercase mb-4 tracking-wide">
                AI Chat Coach
              </h3>
              <p className="font-paragraph text-primary-foreground/80 text-sm leading-relaxed mb-6">
                Get instant answers to all your fitness and nutrition questions from our intelligent AI coach.
              </p>
              <Button asChild variant="ghost" className="text-highlightyellow hover:text-primary hover:bg-highlightyellow font-paragraph font-semibold">
                <Link to="/chat">Try Now</Link>
              </Button>
            </Card>

            <Card className="bg-buttonbackground border-0 p-8 text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300">
                <Calculator className="w-8 h-8 text-highlightyellow" />
              </div>
              <h3 className="font-heading text-buttontext text-xl font-bold uppercase mb-4 tracking-wide">
                BMI Calculator
              </h3>
              <p className="font-paragraph text-buttontext/80 text-sm leading-relaxed mb-6">
                Calculate your Body Mass Index and get personalized recommendations based on your results.
              </p>
              <Button asChild variant="ghost" className="text-primary hover:text-buttonbackground hover:bg-primary font-paragraph font-semibold">
                <Link to="/bmi">Calculate</Link>
              </Button>
            </Card>

            <Card className="bg-primary border-0 p-8 text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-highlightyellow rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300">
                <Utensils className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading text-primary-foreground text-xl font-bold uppercase mb-4 tracking-wide">
                Diet Plans
              </h3>
              <p className="font-paragraph text-primary-foreground/80 text-sm leading-relaxed mb-6">
                Receive customized meal plans tailored to your goals, preferences, and dietary restrictions.
              </p>
              <Button asChild variant="ghost" className="text-highlightyellow hover:text-primary hover:bg-highlightyellow font-paragraph font-semibold">
                <Link to="/diet">Get Plan</Link>
              </Button>
            </Card>

            <Card className="bg-buttonbackground border-0 p-8 text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300">
                <Lightbulb className="w-8 h-8 text-secondary-foreground" />
              </div>
              <h3 className="font-heading text-buttontext text-xl font-bold uppercase mb-4 tracking-wide">
                Expert Tips
              </h3>
              <p className="font-paragraph text-buttontext/80 text-sm leading-relaxed mb-6">
                Access a comprehensive library of tips and advice for specific health and fitness challenges.
              </p>
              <Button asChild variant="ghost" className="text-primary hover:text-buttonbackground hover:bg-primary font-paragraph font-semibold">
                <Link to="/tips">Browse Tips</Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-heading text-highlightyellow text-4xl sm:text-5xl font-black uppercase mb-8 tracking-wide">
                Why Choose FitGenius AI?
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-highlightyellow rounded-xl flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-primary-foreground text-xl font-bold uppercase mb-2 tracking-wide">
                      Personalized Approach
                    </h3>
                    <p className="font-paragraph text-primary-foreground/80 leading-relaxed">
                      Every recommendation is tailored to your unique goals, preferences, and current fitness level.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-heading text-primary-foreground text-xl font-bold uppercase mb-2 tracking-wide">
                      Instant Responses
                    </h3>
                    <p className="font-paragraph text-primary-foreground/80 leading-relaxed">
                      Get immediate answers to your questions, available 24/7 whenever you need guidance.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-buttonbackground rounded-xl flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-primary-foreground text-xl font-bold uppercase mb-2 tracking-wide">
                      Evidence-Based
                    </h3>
                    <p className="font-paragraph text-primary-foreground/80 leading-relaxed">
                      All advice is grounded in scientific research and proven fitness and nutrition principles.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-secondary rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary to-secondary/80"></div>
                <div className="relative z-10 h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-highlightyellow rounded-full flex items-center justify-center mx-auto mb-6">
                      <MessageCircle className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="font-heading text-secondary-foreground text-2xl font-bold uppercase mb-4 tracking-wide">
                      Start Your Journey
                    </h3>
                    <p className="font-paragraph text-secondary-foreground/80 text-lg">
                      Join thousands who have transformed their health with AI guidance
                    </p>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-highlightyellow/20 rounded-full"></div>
                <div className="absolute bottom-8 left-6 w-6 h-6 bg-primary/30 rounded-full"></div>
                <div className="absolute top-1/2 left-4 w-4 h-4 bg-buttonbackground/40 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-secondary-foreground text-4xl sm:text-5xl font-black uppercase mb-6 tracking-wide">
            Ready to Transform Your Health?
          </h2>
          <p className="font-paragraph text-secondary-foreground/80 text-xl mb-12 max-w-2xl mx-auto">
            Start your personalized fitness journey today with our AI-powered coach. No commitments, just results.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              asChild
              className="bg-highlightyellow text-primary hover:bg-highlightyellow/90 font-paragraph font-bold text-lg px-10 py-4 h-auto"
            >
              <Link to="/chat">
                Start Free Chat
                <MessageCircle className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            
            <Button 
              asChild
              variant="outline"
              className="border-2 border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary font-paragraph font-bold text-lg px-10 py-4 h-auto"
            >
              <Link to="/bmi">
                Calculate BMI
                <Calculator className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>


    </div>
  );
}
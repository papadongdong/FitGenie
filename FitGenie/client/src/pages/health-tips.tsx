import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Apple, Dumbbell, Moon, Heart, Droplet, Lightbulb } from "lucide-react";

export default function HealthTips() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [generatedTip, setGeneratedTip] = useState("");
  const { toast } = useToast();

  const tipsMutation = useMutation({
    mutationFn: async (category: string) => {
      const response = await apiRequest("POST", "/api/health-tips", {
        category,
        userProfile: {} // Could include user profile data
      });
      return response.json();
    },
    onSuccess: (data) => {
      setGeneratedTip(data.tips[0] || "No tip generated");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to generate tip. Please try again.",
        variant: "destructive",
      });
    },
  });

  const generateTip = () => {
    if (!selectedCategory) {
      toast({
        title: "Missing Information",
        description: "Please select a category.",
        variant: "destructive",
      });
      return;
    }

    tipsMutation.mutate(selectedCategory);
  };

  const staticTips = [
    {
      icon: Apple,
      title: "Nutrition Basics",
      content: "Eat a balanced diet with plenty of fruits, vegetables, lean proteins, and whole grains. Aim for 5-7 servings of colorful produce daily.",
      category: "Nutrition",
      color: "text-primary",
      bgColor: "bg-primary/20"
    },
    {
      icon: Dumbbell,
      title: "Daily Movement",
      content: "Aim for at least 150 minutes of moderate aerobic activity weekly, plus 2 days of strength training exercises.",
      category: "Exercise",
      color: "text-secondary",
      bgColor: "bg-secondary/20"
    },
    {
      icon: Moon,
      title: "Quality Sleep",
      content: "Get 7-9 hours of quality sleep nightly. Maintain a consistent sleep schedule and create a relaxing bedtime routine.",
      category: "Sleep",
      color: "text-accent",
      bgColor: "bg-accent/20"
    },
    {
      icon: Droplet,
      title: "Stay Hydrated",
      content: "Drink 8-10 glasses of water daily. Increase intake during exercise or hot weather. Monitor urine color as a hydration indicator.",
      category: "Hydration",
      color: "text-blue-500",
      bgColor: "bg-blue-500/20"
    },
    {
      icon: Lightbulb,
      title: "Stress Management",
      content: "Practice mindfulness, deep breathing, or meditation for 10-15 minutes daily. Regular exercise also helps reduce stress levels.",
      category: "Mental Health",
      color: "text-green-500",
      bgColor: "bg-green-500/20"
    },
    {
      icon: Heart,
      title: "Heart Health",
      content: "Monitor your heart rate during exercise. Aim for 50-85% of your maximum heart rate for cardiovascular benefits.",
      category: "Cardio",
      color: "text-purple-500",
      bgColor: "bg-purple-500/20"
    }
  ];

  return (
    <section className="section">
      <div className="container mx-auto px-4 pt-20 max-w-6xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-foreground mb-4" data-testid="text-tips-title">Health & Fitness Tips</h2>
          <p className="text-muted-foreground" data-testid="text-tips-description">AI-powered personalized advice for your wellness journey</p>
        </div>
        
        {/* Tip Generator */}
        <Card className="mb-8" data-testid="card-tip-generator">
          <CardHeader>
            <CardTitle className="text-xl">Get Personalized Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="flex-1" data-testid="select-tip-category">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nutrition">Nutrition</SelectItem>
                  <SelectItem value="exercise">Exercise</SelectItem>
                  <SelectItem value="sleep">Sleep</SelectItem>
                  <SelectItem value="stress">Stress Management</SelectItem>
                  <SelectItem value="hydration">Hydration</SelectItem>
                  <SelectItem value="general">General Wellness</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                onClick={generateTip}
                disabled={tipsMutation.isPending}
                className="bg-accent text-accent-foreground hover:bg-accent/90"
                data-testid="button-generate-tip"
              >
                {tipsMutation.isPending ? "Generating..." : "Generate Tip"}
              </Button>
            </div>
            
            {generatedTip && (
              <div className="mt-4 p-4 bg-muted rounded-lg" data-testid="container-generated-tip">
                <p className="text-foreground">{generatedTip}</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Tips Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staticTips.map((tip, index) => {
            const IconComponent = tip.icon;
            return (
              <Card 
                key={index} 
                className="hover:border-primary/50 transition-colors"
                data-testid={`card-tip-${index}`}
              >
                <CardContent className="p-6">
                  <div className={`w-12 h-12 ${tip.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                    <IconComponent className={`${tip.color} w-6 h-6`} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{tip.title}</h3>
                  <p className="text-muted-foreground mb-4">{tip.content}</p>
                  <span className={`${tip.color} text-sm font-medium`}>{tip.category}</span>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Info } from "lucide-react";

interface Meal {
  name: string;
  food: string;
  calories: number;
}

interface DietPlan {
  title: string;
  totalCalories: number;
  meals: Meal[];
}

export default function DietPlanner() {
  const [goal, setGoal] = useState("");
  const [dietType, setDietType] = useState("");
  const [allergies, setAllergies] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);
  const { toast } = useToast();

  const dietMutation = useMutation({
    mutationFn: async (data: { goal: string; dietType: string; allergies: string; activityLevel: string }) => {
      const response = await apiRequest("POST", "/api/diet-plans", {
        userId: "guest",
        ...data
      });
      return response.json();
    },
    onSuccess: (data) => {
      setDietPlan({
        title: `${goal.replace('_', ' ')} Plan`,
        totalCalories: data.totalCalories,
        meals: data.meals
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to generate diet plan. Please try again.",
        variant: "destructive",
      });
    },
  });

  const generateDietPlan = () => {
    if (!goal || !activityLevel) {
      toast({
        title: "Missing Information",
        description: "Please select your goal and activity level.",
        variant: "destructive",
      });
      return;
    }

    dietMutation.mutate({ goal, dietType, allergies, activityLevel });
  };

  return (
    <section className="section">
      <div className="container mx-auto px-4 pt-20 max-w-6xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-foreground mb-4" data-testid="text-diet-title">AI Diet Planner</h2>
          <p className="text-muted-foreground" data-testid="text-diet-description">Get personalized meal plans powered by AI</p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Diet Preferences Form */}
          <div className="lg:col-span-1">
            <Card data-testid="card-diet-preferences">
              <CardHeader>
                <CardTitle className="text-xl">Your Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Goal</Label>
                  <Select value={goal} onValueChange={setGoal}>
                    <SelectTrigger data-testid="select-diet-goal">
                      <SelectValue placeholder="Select Goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weight_loss">Weight Loss</SelectItem>
                      <SelectItem value="weight_gain">Weight Gain</SelectItem>
                      <SelectItem value="muscle_gain">Muscle Gain</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Diet Type</Label>
                  <Select value={dietType} onValueChange={setDietType}>
                    <SelectTrigger data-testid="select-diet-type">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="vegan">Vegan</SelectItem>
                      <SelectItem value="keto">Keto</SelectItem>
                      <SelectItem value="paleo">Paleo</SelectItem>
                      <SelectItem value="mediterranean">Mediterranean</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Allergies</Label>
                  <Input
                    placeholder="e.g., nuts, dairy, gluten"
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                    data-testid="input-allergies"
                  />
                </div>
                
                <div>
                  <Label>Activity Level</Label>
                  <Select value={activityLevel} onValueChange={setActivityLevel}>
                    <SelectTrigger data-testid="select-activity-level">
                      <SelectValue placeholder="Select Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary</SelectItem>
                      <SelectItem value="light">Light Activity</SelectItem>
                      <SelectItem value="moderate">Moderate Activity</SelectItem>
                      <SelectItem value="active">Very Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  onClick={generateDietPlan}
                  disabled={dietMutation.isPending}
                  className="w-full bg-secondary text-secondary-foreground hover:bg-accent"
                  data-testid="button-generate-diet-plan"
                >
                  {dietMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Diet Plan"
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Generated Diet Plan */}
          <div className="lg:col-span-2">
            {dietMutation.isPending && (
              <Card className="text-center p-8" data-testid="card-diet-loading">
                <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">Generating your personalized diet plan...</p>
              </Card>
            )}
            
            {dietPlan && (
              <Card data-testid="card-diet-results">
                <CardHeader>
                  <CardTitle className="text-xl">Your Personalized Diet Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-foreground mb-2" data-testid="text-plan-title">{dietPlan.title}</h4>
                    <p className="text-secondary font-medium" data-testid="text-total-calories">{dietPlan.totalCalories} calories/day</p>
                  </div>
                  
                  <div className="grid gap-4">
                    {dietPlan.meals.map((meal, index) => (
                      <div key={index} className="bg-muted rounded-lg p-4 flex justify-between items-center" data-testid={`meal-${index}`}>
                        <div>
                          <h5 className="font-medium text-foreground">{meal.name}</h5>
                          <p className="text-sm text-muted-foreground">{meal.food}</p>
                        </div>
                        <span className="text-sm font-medium text-primary">{meal.calories} cal</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-foreground flex items-start">
                      <Info className="text-primary mr-2 mt-0.5 w-4 h-4 flex-shrink-0" />
                      This plan is AI-generated based on your preferences. Consult with a nutritionist for personalized advice.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Sample Diet Plans */}
            {!dietPlan && !dietMutation.isPending && (
              <div className="space-y-6" data-testid="container-sample-plans">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Sample: Weight Loss Plan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-muted rounded-lg p-4">
                        <h4 className="font-medium text-foreground mb-2">Breakfast</h4>
                        <p className="text-sm text-muted-foreground">Oatmeal with berries and almonds (320 cal)</p>
                      </div>
                      <div className="bg-muted rounded-lg p-4">
                        <h4 className="font-medium text-foreground mb-2">Lunch</h4>
                        <p className="text-sm text-muted-foreground">Grilled chicken salad with quinoa (450 cal)</p>
                      </div>
                      <div className="bg-muted rounded-lg p-4">
                        <h4 className="font-medium text-foreground mb-2">Dinner</h4>
                        <p className="text-sm text-muted-foreground">Baked salmon with vegetables (380 cal)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Sample: Muscle Gain Plan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-muted rounded-lg p-4">
                        <h4 className="font-medium text-foreground mb-2">Breakfast</h4>
                        <p className="text-sm text-muted-foreground">Protein pancakes with banana (520 cal)</p>
                      </div>
                      <div className="bg-muted rounded-lg p-4">
                        <h4 className="font-medium text-foreground mb-2">Lunch</h4>
                        <p className="text-sm text-muted-foreground">Turkey and avocado wrap (680 cal)</p>
                      </div>
                      <div className="bg-muted rounded-lg p-4">
                        <h4 className="font-medium text-foreground mb-2">Dinner</h4>
                        <p className="text-sm text-muted-foreground">Lean beef with sweet potato (720 cal)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

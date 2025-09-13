import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import BMIGauge from "@/components/bmi-gauge";
import { getUserProfile, saveUserProfile } from "@/lib/user-storage";

interface BMIResult {
  bmi: number;
  category: string;
  recommendations: string[];
}

export default function BMICalculator() {
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [weightLbs, setWeightLbs] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [result, setResult] = useState<BMIResult | null>(null);
  const { toast } = useToast();

  const bmiMutation = useMutation({
    mutationFn: async (data: { height: number; weight: number; age: number; gender: string }) => {
      const response = await apiRequest("POST", "/api/bmi", {
        userId: "guest",
        ...data
      });
      return response.json();
    },
    onSuccess: (data) => {
      setResult({
        bmi: data.bmi,
        category: data.category,
        recommendations: data.recommendations
      });
      
      // Save to user profile
      const profile = getUserProfile();
      saveUserProfile({
        ...profile,
        height: data.height,
        weight: data.weight,
        age: parseInt(age),
        gender
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to calculate BMI. Please try again.",
        variant: "destructive",
      });
    },
  });

  const calculateBMI = () => {
    // Convert to metric
    let height = parseFloat(heightCm);
    if (heightFeet || heightInches) {
      height = (parseFloat(heightFeet || "0") * 12 + parseFloat(heightInches || "0")) * 2.54;
    }

    let weight = parseFloat(weightKg);
    if (weightLbs) {
      weight = parseFloat(weightLbs) * 0.453592;
    }

    if (!height || !weight || !age) {
      toast({
        title: "Missing Information",
        description: "Please enter valid height, weight, and age values.",
        variant: "destructive",
      });
      return;
    }

    bmiMutation.mutate({
      height,
      weight,
      age: parseInt(age),
      gender
    });
  };

  return (
    <section className="section">
      <div className="container mx-auto px-4 pt-20 max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-foreground mb-4" data-testid="text-bmi-title">BMI Calculator</h2>
          <p className="text-muted-foreground" data-testid="text-bmi-description">Calculate your Body Mass Index and get personalized health insights</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* BMI Input Form */}
          <Card data-testid="card-bmi-input">
            <CardHeader>
              <CardTitle className="text-2xl">Enter Your Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-foreground font-medium mb-2">Height</Label>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    placeholder="Feet"
                    value={heightFeet}
                    onChange={(e) => setHeightFeet(e.target.value)}
                    data-testid="input-height-feet"
                  />
                  <Input
                    type="number"
                    placeholder="Inches"
                    value={heightInches}
                    onChange={(e) => setHeightInches(e.target.value)}
                    data-testid="input-height-inches"
                  />
                </div>
                <p className="text-muted-foreground text-sm mt-1">
                  Or use cm: 
                  <Input 
                    type="number" 
                    placeholder="170" 
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    className="inline-block w-20 ml-2"
                    data-testid="input-height-cm"
                  />
                </p>
              </div>
              
              <div>
                <Label className="text-foreground font-medium mb-2">Weight</Label>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    placeholder="Pounds"
                    value={weightLbs}
                    onChange={(e) => setWeightLbs(e.target.value)}
                    data-testid="input-weight-lbs"
                  />
                  <span className="text-muted-foreground self-center">or</span>
                  <Input
                    type="number"
                    placeholder="Kilograms"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    data-testid="input-weight-kg"
                  />
                </div>
              </div>
              
              <div>
                <Label className="text-foreground font-medium mb-2">Age</Label>
                <Input
                  type="number"
                  placeholder="25"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  data-testid="input-age"
                />
              </div>
              
              <div>
                <Label className="text-foreground font-medium mb-2">Gender</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger data-testid="select-gender">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                onClick={calculateBMI}
                disabled={bmiMutation.isPending}
                className="w-full bg-primary text-primary-foreground"
                data-testid="button-calculate-bmi"
              >
                {bmiMutation.isPending ? "Calculating..." : "Calculate BMI"}
              </Button>
            </CardContent>
          </Card>
          
          {/* BMI Results */}
          {result && (
            <Card data-testid="card-bmi-results">
              <CardHeader>
                <CardTitle className="text-2xl">Your Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <BMIGauge bmi={result.bmi} />
                  <div className="text-3xl font-bold text-primary mb-2" data-testid="text-bmi-value">
                    {result.bmi}
                  </div>
                  <div className="text-lg font-medium" data-testid="text-bmi-category">
                    {result.category}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground mb-3">Recommendations:</h4>
                  {result.recommendations.map((rec, index) => (
                    <div key={index} className="bg-muted rounded-lg p-3" data-testid={`text-recommendation-${index}`}>
                      <p className="text-muted-foreground text-sm">{rec}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}

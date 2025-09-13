import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Calculator, TrendingUp, TrendingDown, Minus, AlertCircle, CheckCircle } from 'lucide-react';

interface BMIResult {
  bmi: number;
  category: string;
  description: string;
  recommendations: string[];
  color: string;
  icon: React.ReactNode;
}

export default function BMIPage() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [result, setResult] = useState<BMIResult | null>(null);

  const calculateBMI = () => {
    if (!height || !weight) return;

    let heightInMeters: number;
    let weightInKg: number;

    if (unit === 'metric') {
      heightInMeters = parseFloat(height) / 100; // cm to meters
      weightInKg = parseFloat(weight);
    } else {
      heightInMeters = parseFloat(height) * 0.0254; // inches to meters
      weightInKg = parseFloat(weight) * 0.453592; // pounds to kg
    }

    const bmi = weightInKg / (heightInMeters * heightInMeters);
    
    let category: string;
    let description: string;
    let recommendations: string[];
    let color: string;
    let icon: React.ReactNode;

    if (bmi < 18.5) {
      category = 'Underweight';
      description = 'Your BMI indicates that you are underweight for your height.';
      recommendations = [
        'Consult with a healthcare provider or nutritionist',
        'Focus on nutrient-dense, calorie-rich foods',
        'Include healthy fats like nuts, avocados, and olive oil',
        'Consider strength training to build muscle mass',
        'Eat frequent, smaller meals throughout the day'
      ];
      color = 'text-blue-400';
      icon = <TrendingUp className="w-6 h-6" />;
    } else if (bmi >= 18.5 && bmi < 25) {
      category = 'Normal Weight';
      description = 'Your BMI indicates that you have a healthy weight for your height.';
      recommendations = [
        'Maintain your current healthy lifestyle',
        'Continue with balanced nutrition and regular exercise',
        'Focus on strength training and cardiovascular fitness',
        'Stay hydrated and get adequate sleep',
        'Monitor your weight regularly to maintain this range'
      ];
      color = 'text-green-400';
      icon = <CheckCircle className="w-6 h-6" />;
    } else if (bmi >= 25 && bmi < 30) {
      category = 'Overweight';
      description = 'Your BMI indicates that you are overweight for your height.';
      recommendations = [
        'Create a moderate caloric deficit through diet and exercise',
        'Focus on whole foods and reduce processed food intake',
        'Increase physical activity to 150+ minutes per week',
        'Consider portion control and mindful eating',
        'Consult with a healthcare provider for personalized advice'
      ];
      color = 'text-yellow-400';
      icon = <AlertCircle className="w-6 h-6" />;
    } else {
      category = 'Obese';
      description = 'Your BMI indicates obesity, which may increase health risks.';
      recommendations = [
        'Consult with a healthcare provider immediately',
        'Consider working with a registered dietitian',
        'Start with low-impact exercises like walking or swimming',
        'Focus on sustainable lifestyle changes rather than quick fixes',
        'Consider medical evaluation for underlying conditions'
      ];
      color = 'text-red-400';
      icon = <TrendingDown className="w-6 h-6" />;
    }

    setResult({
      bmi: Math.round(bmi * 10) / 10,
      category,
      description,
      recommendations,
      color,
      icon
    });
  };

  const resetCalculator = () => {
    setHeight('');
    setWeight('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-primary py-8">
      <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-highlightyellow text-4xl sm:text-5xl font-black uppercase mb-4 tracking-wide">
            BMI Calculator
          </h1>
          <p className="font-paragraph text-secondary-foreground/80 text-lg max-w-2xl mx-auto">
            Calculate your Body Mass Index and get personalized health recommendations based on your results.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Card */}
          <Card className="bg-secondary border-0 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-highlightyellow rounded-xl flex items-center justify-center">
                <Calculator className="w-6 h-6 text-primary" />
              </div>
              <h2 className="font-heading text-secondary-foreground text-2xl font-bold uppercase tracking-wide">
                Calculate Your BMI
              </h2>
            </div>

            {/* Unit Toggle */}
            <div className="flex space-x-2 mb-6">
              <Button
                onClick={() => setUnit('metric')}
                variant={unit === 'metric' ? 'default' : 'outline'}
                className={`flex-1 font-paragraph font-semibold ${
                  unit === 'metric'
                    ? 'bg-highlightyellow text-primary hover:bg-highlightyellow/90'
                    : 'border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary'
                }`}
              >
                Metric (cm/kg)
              </Button>
              <Button
                onClick={() => setUnit('imperial')}
                variant={unit === 'imperial' ? 'default' : 'outline'}
                className={`flex-1 font-paragraph font-semibold ${
                  unit === 'imperial'
                    ? 'bg-highlightyellow text-primary hover:bg-highlightyellow/90'
                    : 'border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary'
                }`}
              >
                Imperial (in/lbs)
              </Button>
            </div>

            <div className="space-y-6">
              {/* Height Input */}
              <div>
                <Label className="font-paragraph text-secondary-foreground font-semibold mb-2 block">
                  Height {unit === 'metric' ? '(cm)' : '(inches)'}
                </Label>
                <Input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder={unit === 'metric' ? 'Enter height in cm' : 'Enter height in inches'}
                  className="bg-buttonbackground border-0 text-buttontext placeholder:text-buttontext/60 font-paragraph"
                />
              </div>

              {/* Weight Input */}
              <div>
                <Label className="font-paragraph text-secondary-foreground font-semibold mb-2 block">
                  Weight {unit === 'metric' ? '(kg)' : '(lbs)'}
                </Label>
                <Input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder={unit === 'metric' ? 'Enter weight in kg' : 'Enter weight in lbs'}
                  className="bg-buttonbackground border-0 text-buttontext placeholder:text-buttontext/60 font-paragraph"
                />
              </div>

              {/* Buttons */}
              <div className="flex space-x-4">
                <Button
                  onClick={calculateBMI}
                  disabled={!height || !weight}
                  className="flex-1 bg-highlightyellow text-primary hover:bg-highlightyellow/90 font-paragraph font-bold"
                >
                  Calculate BMI
                </Button>
                <Button
                  onClick={resetCalculator}
                  variant="outline"
                  className="border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary font-paragraph font-semibold"
                >
                  Reset
                </Button>
              </div>
            </div>
          </Card>

          {/* Results Card */}
          <Card className="bg-buttonbackground border-0 p-8">
            {result ? (
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${result.color.replace('text-', 'bg-').replace('-400', '-400/20')}`}>
                    <span className={result.color}>{result.icon}</span>
                  </div>
                  <h2 className="font-heading text-buttontext text-2xl font-bold uppercase tracking-wide">
                    Your Results
                  </h2>
                </div>

                {/* BMI Score */}
                <div className="text-center mb-6 p-6 bg-primary/5 rounded-2xl">
                  <div className="text-4xl font-heading font-black text-buttontext mb-2">
                    {result.bmi}
                  </div>
                  <div className={`text-xl font-heading font-bold uppercase tracking-wide ${result.color}`}>
                    {result.category}
                  </div>
                </div>

                {/* Description */}
                <p className="font-paragraph text-buttontext/80 text-sm leading-relaxed mb-6">
                  {result.description}
                </p>

                {/* Recommendations */}
                <div>
                  <h3 className="font-heading text-buttontext text-lg font-bold uppercase mb-4 tracking-wide">
                    Recommendations
                  </h3>
                  <ul className="space-y-3">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="font-paragraph text-buttontext/80 text-sm leading-relaxed">
                          {rec}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-8 h-8 text-primary/60" />
                </div>
                <h3 className="font-heading text-buttontext text-xl font-bold uppercase mb-2 tracking-wide">
                  Enter Your Details
                </h3>
                <p className="font-paragraph text-buttontext/60 text-sm">
                  Fill in your height and weight to calculate your BMI and receive personalized recommendations.
                </p>
              </div>
            )}
          </Card>
        </div>

        {/* BMI Categories Reference */}
        <div className="max-w-4xl mx-auto mt-12">
          <Card className="bg-secondary border-0 p-8">
            <h3 className="font-heading text-secondary-foreground text-2xl font-bold uppercase mb-6 tracking-wide text-center">
              BMI Categories Reference
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-400/10 rounded-xl">
                <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="font-heading text-secondary-foreground font-bold text-sm uppercase mb-1">
                  Underweight
                </div>
                <div className="font-paragraph text-secondary-foreground/80 text-xs">
                  Below 18.5
                </div>
              </div>
              <div className="text-center p-4 bg-green-400/10 rounded-xl">
                <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="font-heading text-secondary-foreground font-bold text-sm uppercase mb-1">
                  Normal Weight
                </div>
                <div className="font-paragraph text-secondary-foreground/80 text-xs">
                  18.5 - 24.9
                </div>
              </div>
              <div className="text-center p-4 bg-yellow-400/10 rounded-xl">
                <AlertCircle className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="font-heading text-secondary-foreground font-bold text-sm uppercase mb-1">
                  Overweight
                </div>
                <div className="font-paragraph text-secondary-foreground/80 text-xs">
                  25.0 - 29.9
                </div>
              </div>
              <div className="text-center p-4 bg-red-400/10 rounded-xl">
                <TrendingDown className="w-8 h-8 text-red-400 mx-auto mb-2" />
                <div className="font-heading text-secondary-foreground font-bold text-sm uppercase mb-1">
                  Obese
                </div>
                <div className="font-paragraph text-secondary-foreground/80 text-xs">
                  30.0 and above
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Important Note */}
        <div className="max-w-4xl mx-auto mt-8">
          <Card className="bg-highlightyellow/10 border border-highlightyellow/20 p-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-6 h-6 text-highlightyellow flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-heading text-primary-foreground font-bold text-sm uppercase mb-2 tracking-wide">
                  Important Note
                </h4>
                <p className="font-paragraph text-primary-foreground/80 text-sm leading-relaxed">
                  BMI is a useful screening tool, but it doesn't directly measure body fat or account for muscle mass, bone density, and other factors. 
                  Always consult with a healthcare professional for comprehensive health assessment and personalized advice.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
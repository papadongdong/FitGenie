import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY_ENV_VAR || ""
});

interface DietPlanRequest {
  goal: string;
  dietType?: string;
  allergies?: string;
  activityLevel: string;
}

interface DietPlanResponse {
  meals: Array<{
    name: string;
    food: string;
    calories: number;
  }>;
  totalCalories: number;
}

interface HealthTipsRequest {
  type: string;
  bmi?: number;
  category?: string;
  age?: number;
  gender?: string;
  userProfile?: any;
}

export async function chatWithAI(message: string, userId?: string): Promise<string> {
  try {
    const systemPrompt = `You are FitGenius AI, a professional fitness and nutrition coach. You provide personalized, science-based advice on:
- Workout routines and exercise techniques
- Nutrition and meal planning
- Health and wellness guidance
- Weight management strategies
- Fitness goal setting and tracking

Keep responses helpful, encouraging, and focused on health and fitness. Always recommend consulting healthcare professionals for medical concerns.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
      },
      contents: message,
    });

    return response.text || "I'm sorry, I couldn't process your request right now. Please try again.";
  } catch (error) {
    console.error('Chat AI error:', error);
    throw new Error('Failed to get AI response');
  }
}

export async function generateDietPlan(request: DietPlanRequest): Promise<DietPlanResponse> {
  try {
    const { goal, dietType, allergies, activityLevel } = request;
    
    const systemPrompt = `You are a professional nutritionist creating personalized meal plans. Generate a daily diet plan with specific meals and calorie counts.

Requirements:
- Goal: ${goal}
- Diet Type: ${dietType || 'No specific restrictions'}
- Allergies: ${allergies || 'None'}
- Activity Level: ${activityLevel}

Provide a JSON response with exactly this structure:
{
  "meals": [
    {"name": "Breakfast", "food": "specific meal description", "calories": number},
    {"name": "Morning Snack", "food": "specific snack description", "calories": number},
    {"name": "Lunch", "food": "specific meal description", "calories": number},
    {"name": "Afternoon Snack", "food": "specific snack description", "calories": number},
    {"name": "Dinner", "food": "specific meal description", "calories": number}
  ],
  "totalCalories": total_daily_calories
}

Consider the goal when determining calories:
- Weight loss: 1400-1600 calories
- Weight gain: 2200-2500 calories  
- Muscle gain: 2000-2300 calories
- Maintenance: 1800-2000 calories

Adjust based on activity level. Be specific with food items and portions.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            meals: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  food: { type: "string" },
                  calories: { type: "number" }
                },
                required: ["name", "food", "calories"]
              }
            },
            totalCalories: { type: "number" }
          },
          required: ["meals", "totalCalories"]
        }
      },
      contents: `Create a diet plan for: ${goal}, diet type: ${dietType}, allergies: ${allergies}, activity: ${activityLevel}`,
    });

    const rawJson = response.text;
    if (rawJson) {
      const data: DietPlanResponse = JSON.parse(rawJson);
      return data;
    } else {
      throw new Error("Empty response from AI model");
    }
  } catch (error) {
    console.error('Diet plan generation error:', error);
    
    // Fallback diet plan based on goal
    const fallbackPlans: Record<string, DietPlanResponse> = {
      weight_loss: {
        meals: [
          { name: "Breakfast", food: "Greek yogurt with mixed berries and almonds", calories: 280 },
          { name: "Morning Snack", food: "Apple with 1 tbsp almond butter", calories: 150 },
          { name: "Lunch", food: "Grilled chicken salad with quinoa and vegetables", calories: 420 },
          { name: "Afternoon Snack", food: "Carrot sticks with hummus", calories: 120 },
          { name: "Dinner", food: "Baked salmon with roasted broccoli and sweet potato", calories: 380 }
        ],
        totalCalories: 1350
      },
      weight_gain: {
        meals: [
          { name: "Breakfast", food: "Protein pancakes with banana and peanut butter", calories: 520 },
          { name: "Morning Snack", food: "Protein smoothie with berries", calories: 250 },
          { name: "Lunch", food: "Turkey and avocado wrap with whole grain tortilla", calories: 680 },
          { name: "Afternoon Snack", food: "Trail mix with nuts and dried fruit", calories: 200 },
          { name: "Dinner", food: "Lean beef with quinoa and steamed vegetables", calories: 720 }
        ],
        totalCalories: 2370
      },
      muscle_gain: {
        meals: [
          { name: "Breakfast", food: "Oatmeal with protein powder and banana", calories: 450 },
          { name: "Morning Snack", food: "Cottage cheese with pineapple", calories: 180 },
          { name: "Lunch", food: "Chicken breast with brown rice and vegetables", calories: 580 },
          { name: "Pre-workout", food: "Banana with honey", calories: 120 },
          { name: "Post-workout", food: "Protein shake with chocolate milk", calories: 250 },
          { name: "Dinner", food: "Grilled fish with quinoa and asparagus", calories: 520 }
        ],
        totalCalories: 2100
      },
      maintenance: {
        meals: [
          { name: "Breakfast", food: "Whole grain toast with avocado and eggs", calories: 350 },
          { name: "Morning Snack", food: "Greek yogurt with granola", calories: 180 },
          { name: "Lunch", food: "Quinoa bowl with chicken and mixed vegetables", calories: 500 },
          { name: "Afternoon Snack", food: "Handful of mixed nuts", calories: 160 },
          { name: "Dinner", food: "Grilled chicken with roasted vegetables", calories: 460 }
        ],
        totalCalories: 1650
      }
    };

    return fallbackPlans[request.goal] || fallbackPlans.maintenance;
  }
}

export async function generateHealthTips(request: HealthTipsRequest): Promise<string[]> {
  try {
    const { type, bmi, category, age, gender } = request;
    
    let prompt = "";
    
    if (type === 'bmi' && bmi && category) {
      prompt = `Generate 3 specific health recommendations for someone with:
- BMI: ${bmi}
- Category: ${category}
- Age: ${age || 'not specified'}
- Gender: ${gender || 'not specified'}

Focus on actionable advice for improving health based on their BMI category.`;
    } else {
      prompt = `Generate 3 specific, actionable health tips for the category: ${type}. 
Make them practical and evidence-based. Focus on tips that can be implemented immediately.`;
    }

    const systemPrompt = `You are a certified health and fitness expert. Provide practical, science-based health advice. 
Keep recommendations specific, actionable, and safe. Always suggest consulting healthcare professionals when appropriate.

Return your response as a JSON array of exactly 3 strings, each containing one specific tip:
["tip 1", "tip 2", "tip 3"]`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: "array",
          items: { type: "string" }
        }
      },
      contents: prompt,
    });

    const rawJson = response.text;
    if (rawJson) {
      const tips: string[] = JSON.parse(rawJson);
      return tips;
    } else {
      throw new Error("Empty response from AI model");
    }
  } catch (error) {
    console.error('Health tips generation error:', error);
    
    // Fallback tips based on category/type
    const fallbackTips: Record<string, string[]> = {
      nutrition: [
        "Focus on eating whole, unprocessed foods like fruits, vegetables, lean proteins, and whole grains",
        "Practice portion control by using smaller plates and measuring your food portions",
        "Stay hydrated by drinking water before meals and throughout the day"
      ],
      exercise: [
        "Start with 10-15 minutes of daily movement and gradually increase duration and intensity",
        "Include both cardiovascular exercise and strength training in your weekly routine",
        "Focus on proper form over intensity to prevent injuries and maximize effectiveness"
      ],
      sleep: [
        "Maintain a consistent sleep schedule by going to bed and waking up at the same time daily",
        "Create a relaxing bedtime routine without screens for at least 30 minutes before sleep",
        "Keep your bedroom cool, dark, and quiet for optimal sleep quality"
      ],
      stress: [
        "Practice deep breathing exercises for 5-10 minutes when feeling overwhelmed",
        "Incorporate regular physical activity as it naturally reduces stress hormones",
        "Set realistic daily goals and celebrate small achievements to build positive momentum"
      ],
      hydration: [
        "Drink a glass of water first thing in the morning to kickstart your metabolism",
        "Carry a reusable water bottle and set hourly reminders to take sips throughout the day",
        "Monitor your urine color - pale yellow indicates good hydration levels"
      ],
      general: [
        "Take short 5-minute movement breaks every hour during work or sedentary activities",
        "Practice gratitude by writing down three positive things from your day each evening",
        "Plan and prepare healthy meals in advance to avoid impulsive food choices"
      ],
      bmi: [
        "Focus on gradual, sustainable changes rather than drastic dietary restrictions",
        "Incorporate regular physical activity that you enjoy to make it a long-term habit",
        "Consider consulting with a healthcare provider or registered dietitian for personalized guidance"
      ]
    };

    return fallbackTips[request.type] || fallbackTips.general;
  }
}

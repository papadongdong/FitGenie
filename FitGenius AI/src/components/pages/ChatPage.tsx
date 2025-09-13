import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send, Bot, User, Loader2, Brain, Lightbulb } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  topic?: string;
}

interface ConversationContext {
  previousTopics: string[];
  userPreferences: string[];
  conversationFlow: string[];
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your comprehensive AI assistant. I can help you with virtually any topic - from fitness and health to technology, science, education, business, arts, and much more. I'm designed to provide detailed, contextual responses and can adapt to your interests and learning style. What would you like to explore today?",
      sender: 'ai',
      timestamp: new Date(),
      topic: 'greeting'
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationContext, setConversationContext] = useState<ConversationContext>({
    previousTopics: [],
    userPreferences: [],
    conversationFlow: []
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const detectTopic = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('fitness') || lowerMessage.includes('workout') || lowerMessage.includes('exercise')) return 'fitness';
    if (lowerMessage.includes('nutrition') || lowerMessage.includes('diet') || lowerMessage.includes('food')) return 'nutrition';
    if (lowerMessage.includes('programming') || lowerMessage.includes('coding') || lowerMessage.includes('software')) return 'technology';
    if (lowerMessage.includes('science') || lowerMessage.includes('physics') || lowerMessage.includes('chemistry')) return 'science';
    if (lowerMessage.includes('business') || lowerMessage.includes('finance') || lowerMessage.includes('marketing')) return 'business';
    if (lowerMessage.includes('education') || lowerMessage.includes('study') || lowerMessage.includes('learning')) return 'education';
    if (lowerMessage.includes('psychology') || lowerMessage.includes('mental health') || lowerMessage.includes('stress')) return 'psychology';
    if (lowerMessage.includes('art') || lowerMessage.includes('music') || lowerMessage.includes('culture')) return 'arts';
    if (lowerMessage.includes('math') || lowerMessage.includes('calculate') || lowerMessage.includes('equation')) return 'mathematics';
    
    return 'general';
  };

  const updateConversationContext = (userMessage: string, topic: string) => {
    setConversationContext(prev => ({
      previousTopics: [...new Set([...prev.previousTopics, topic])].slice(-5), // Keep last 5 topics
      userPreferences: prev.userPreferences, // Could be enhanced to detect preferences
      conversationFlow: [...prev.conversationFlow, userMessage].slice(-10) // Keep last 10 messages for context
    }));
  };
  const generateAIResponse = (userMessage: string, context: ConversationContext): string => {
    const lowerMessage = userMessage.toLowerCase();
    const topic = detectTopic(userMessage);
    
    // Context-aware responses based on conversation history
    if (context.previousTopics.length > 0 && (lowerMessage.includes('more') || lowerMessage.includes('tell me more') || lowerMessage.includes('continue'))) {
      const lastTopic = context.previousTopics[context.previousTopics.length - 1];
      return `I'd be happy to elaborate more on ${lastTopic}! Based on our conversation, here are some additional insights and advanced concepts you might find interesting. What specific aspect would you like me to dive deeper into?`;
    }
    
    if (lowerMessage.includes('previous') || lowerMessage.includes('earlier') || lowerMessage.includes('before')) {
      if (context.previousTopics.length > 0) {
        return `We've discussed several topics: ${context.previousTopics.join(', ')}. Which one would you like to revisit or explore further?`;
      }
    }
    
    // Conversational responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! I'm your comprehensive AI assistant specializing in health, fitness, and lifestyle guidance. I can help you with workout plans, nutrition advice, cooking tips, personal development, and much more. What would you like to know today?";
    }
    
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return "You're very welcome! I'm here to help with any questions you have about health, fitness, nutrition, cooking, personal development, and lifestyle topics. Feel free to ask me anything you're curious about in these areas!";
    }
    
    if (lowerMessage.includes('goodbye') || lowerMessage.includes('bye') || lowerMessage.includes('see you')) {
      return "Goodbye! It was great helping you today. Remember, I'm always here whenever you need assistance with any questions or topics. Take care and have a wonderful day!";
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('what can you do') || lowerMessage.includes('capabilities')) {
      return "I'm a comprehensive AI assistant that can help you with:\n\n• Health & Fitness: Workout plans, nutrition, BMI calculations, diet advice, exercise routines, weight management, wellness tips\n• Lifestyle: Cooking techniques, travel planning, personal development, relationships, stress management, time management\n\nI can also handle complex nutritional calculations, meal planning, recipe scaling, and provide detailed guidance on fitness routines and healthy living. Just ask me anything you're curious about in these areas!";
    }

    // HEALTH & FITNESS DOMAIN
    if (lowerMessage.includes('bmi') || lowerMessage.includes('body mass index')) {
      return "BMI (Body Mass Index) is calculated by dividing your weight in kilograms by your height in meters squared (BMI = kg/m²). Here are the categories:\n\n• Underweight: Below 18.5\n• Normal weight: 18.5-24.9\n• Overweight: 25.0-29.9\n• Obese: 30.0 and above\n\nWhile BMI is a useful screening tool, it doesn't account for muscle mass, bone density, or body composition. For a precise calculation and personalized recommendations, you can use our BMI calculator tool.";
    }
    
    if (lowerMessage.includes('diet') || lowerMessage.includes('nutrition') || lowerMessage.includes('meal') || lowerMessage.includes('food')) {
      return "Optimal nutrition involves balanced macronutrients and micronutrients:\n\n• Proteins: 0.8-1.2g per kg body weight (lean meats, fish, legumes, dairy)\n• Carbohydrates: 45-65% of calories (whole grains, fruits, vegetables)\n• Fats: 20-35% of calories (nuts, oils, avocados, fatty fish)\n• Fiber: 25-35g daily\n• Water: 8-10 glasses daily\n\nEat 5-6 smaller meals throughout the day for steady energy. Focus on whole, minimally processed foods. Would you like me to help you create a personalized diet plan?";
    }
    
    if (lowerMessage.includes('weight loss') || lowerMessage.includes('lose weight') || lowerMessage.includes('fat loss')) {
      return "Sustainable weight loss principles:\n\n• Create a moderate caloric deficit (500-750 calories/day)\n• Combine diet and exercise for best results\n• Aim for 1-2 pounds loss per week\n• Increase protein intake (preserves muscle mass)\n• Include both cardio and strength training\n• Stay hydrated and get adequate sleep\n• Track progress with measurements, not just scale weight\n• Focus on lifestyle changes, not quick fixes\n\nRemember: consistency beats perfection. Small, sustainable changes lead to lasting results.";
    }
    
    if (lowerMessage.includes('exercise') || lowerMessage.includes('workout') || lowerMessage.includes('training') || lowerMessage.includes('fitness')) {
      return "A comprehensive fitness routine should include:\n\n• Cardiovascular Exercise: 150+ minutes moderate intensity per week\n• Strength Training: 2-3 times per week, all major muscle groups\n• Flexibility/Mobility: Daily stretching or yoga\n• Rest Days: 1-2 per week for recovery\n\nProgression tips:\n• Start with your current fitness level\n• Gradually increase intensity and duration\n• Listen to your body\n• Mix different activities to prevent boredom\n• Consistency is more important than intensity\n\nWould you like a specific workout plan for your goals?";
    }

    // TECHNOLOGY DOMAIN
    if (lowerMessage.includes('programming') || lowerMessage.includes('coding') || lowerMessage.includes('software') || lowerMessage.includes('javascript') || lowerMessage.includes('python') || lowerMessage.includes('react')) {
      return "Programming is the art of creating instructions for computers to solve problems. Here are key concepts:\n\n• Languages: Python (beginner-friendly), JavaScript (web development), Java (enterprise), C++ (performance)\n• Fundamentals: Variables, functions, loops, conditionals, data structures\n• Best Practices: Clean code, version control (Git), testing, documentation\n• Learning Path: Start with basics → Build projects → Learn frameworks → Practice algorithms\n\nPopular areas:\n• Web Development: HTML/CSS/JavaScript, React, Node.js\n• Data Science: Python, R, SQL, machine learning\n• Mobile: React Native, Flutter, Swift, Kotlin\n\nWhat specific programming topic interests you?";
    }
    
    if (lowerMessage.includes('computer') || lowerMessage.includes('technology') || lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence')) {
      return "Technology is rapidly evolving! Here are current key areas:\n\n• Artificial Intelligence: Machine learning, neural networks, natural language processing\n• Cloud Computing: AWS, Azure, Google Cloud for scalable applications\n• Cybersecurity: Protecting data and systems from threats\n• Internet of Things (IoT): Connected devices and smart systems\n• Blockchain: Decentralized systems and cryptocurrencies\n• Quantum Computing: Next-generation processing power\n\nAI Applications:\n• Healthcare: Diagnosis assistance, drug discovery\n• Transportation: Autonomous vehicles, traffic optimization\n• Finance: Fraud detection, algorithmic trading\n• Education: Personalized learning, intelligent tutoring\n\nWhat aspect of technology would you like to explore?";
    }

    // SCIENCE DOMAIN
    if (lowerMessage.includes('physics') || lowerMessage.includes('chemistry') || lowerMessage.includes('biology') || lowerMessage.includes('science')) {
      return "Science helps us understand the natural world through observation and experimentation:\n\n• Physics: Study of matter, energy, and their interactions\n  - Classical mechanics, thermodynamics, electromagnetism\n  - Modern physics: relativity, quantum mechanics\n\n• Chemistry: Study of atoms, molecules, and chemical reactions\n  - Organic, inorganic, physical, analytical chemistry\n  - Applications in medicine, materials, energy\n\n• Biology: Study of living organisms and life processes\n  - Cell biology, genetics, evolution, ecology\n  - Biotechnology, medicine, conservation\n\n• Environmental Science: Interdisciplinary study of environment\n  - Climate change, sustainability, pollution control\n\nWhich scientific field interests you most?";
    }

    // MATHEMATICS DOMAIN
    if (lowerMessage.includes('math') || lowerMessage.includes('mathematics') || lowerMessage.includes('calculate') || lowerMessage.includes('equation')) {
      return "Mathematics is the language of patterns and logical reasoning:\n\n• Arithmetic: Basic operations (+, -, ×, ÷)\n• Algebra: Working with variables and equations\n• Geometry: Shapes, angles, areas, volumes\n• Trigonometry: Relationships in triangles\n• Calculus: Rates of change and accumulation\n• Statistics: Data analysis and probability\n• Discrete Math: Logic, sets, combinatorics\n\nPractical Applications:\n• Finance: Interest calculations, investments\n• Engineering: Design and optimization\n• Data Science: Statistical analysis\n• Computer Science: Algorithms and complexity\n\nWhat mathematical concept would you like help with?";
    }

    // BUSINESS & ECONOMICS DOMAIN
    if (lowerMessage.includes('business') || lowerMessage.includes('marketing') || lowerMessage.includes('finance') || lowerMessage.includes('money') || lowerMessage.includes('investment')) {
      return "Business and finance fundamentals:\n\n• Business Strategy: Market analysis, competitive advantage, growth planning\n• Marketing: Brand building, customer acquisition, digital marketing\n• Finance: Budgeting, investing, risk management, financial planning\n• Entrepreneurship: Startup creation, business models, funding\n• Economics: Supply/demand, market forces, economic indicators\n\nKey Financial Concepts:\n• Compound Interest: Money growing over time\n• Diversification: Spreading investment risk\n• Emergency Fund: 3-6 months of expenses\n• Retirement Planning: 401k, IRA, long-term investing\n\nInvestment Options:\n• Stocks, bonds, mutual funds, ETFs\n• Real estate, commodities\n• Index funds for beginners\n\nWhat business or financial topic interests you?";
    }

    // EDUCATION & LEARNING DOMAIN
    if (lowerMessage.includes('study') || lowerMessage.includes('learning') || lowerMessage.includes('education') || lowerMessage.includes('school') || lowerMessage.includes('university')) {
      return "Effective learning strategies and educational guidance:\n\n• Study Techniques:\n  - Active recall: Testing yourself on material\n  - Spaced repetition: Reviewing at increasing intervals\n  - Pomodoro Technique: 25-minute focused study sessions\n  - Mind mapping: Visual organization of information\n\n• Academic Success:\n  - Set clear, specific goals\n  - Create a consistent study schedule\n  - Find your optimal learning environment\n  - Take regular breaks and get adequate sleep\n\n• Subject-Specific Tips:\n  - STEM: Practice problems, understand concepts before memorizing\n  - Languages: Immersion, regular practice, conversation\n  - History/Literature: Connect themes, analyze patterns\n\n• Test Preparation:\n  - Start early, create study timeline\n  - Practice with past exams\n  - Manage test anxiety with relaxation techniques\n\nWhat educational challenge can I help you with?";
    }

    // ARTS & CULTURE DOMAIN
    if (lowerMessage.includes('art') || lowerMessage.includes('music') || lowerMessage.includes('literature') || lowerMessage.includes('history') || lowerMessage.includes('culture')) {
      return "Arts and culture enrich our understanding of human expression:\n\n• Visual Arts:\n  - Painting, sculpture, photography, digital art\n  - Art movements: Renaissance, Impressionism, Modern, Contemporary\n  - Techniques: Color theory, composition, perspective\n\n• Music:\n  - Theory: Scales, chords, rhythm, harmony\n  - Genres: Classical, jazz, rock, electronic, world music\n  - Learning: Start with basics, practice regularly, listen actively\n\n• Literature:\n  - Genres: Fiction, poetry, drama, non-fiction\n  - Analysis: Themes, character development, literary devices\n  - Writing: Structure, voice, editing, publishing\n\n• History:\n  - Ancient civilizations, world wars, cultural movements\n  - Understanding context and cause-effect relationships\n\nWhich artistic or cultural area would you like to explore?";
    }

    // LIFESTYLE & PERSONAL DEVELOPMENT
    if (lowerMessage.includes('cooking') || lowerMessage.includes('recipe') || lowerMessage.includes('travel') || lowerMessage.includes('relationship') || lowerMessage.includes('personal development')) {
      return "Lifestyle and personal development guidance:\n\n• Cooking & Nutrition:\n  - Basic techniques: Sautéing, roasting, steaming\n  - Meal planning and prep for busy schedules\n  - Healthy substitutions and balanced meals\n  - Kitchen essentials and food safety\n\n• Travel:\n  - Budget planning and cost-saving tips\n  - Cultural etiquette and language basics\n  - Safety considerations and travel insurance\n  - Sustainable and responsible tourism\n\n• Personal Development:\n  - Goal setting and achievement strategies\n  - Time management and productivity\n  - Communication and interpersonal skills\n  - Stress management and mindfulness\n  - Building confidence and self-esteem\n\n• Relationships:\n  - Effective communication techniques\n  - Conflict resolution strategies\n  - Building trust and intimacy\n  - Work-life balance\n\nWhat aspect of lifestyle improvement interests you?";
    }

    // PSYCHOLOGY & MENTAL HEALTH
    if (lowerMessage.includes('psychology') || lowerMessage.includes('mental health') || lowerMessage.includes('stress') || lowerMessage.includes('anxiety') || lowerMessage.includes('depression')) {
      return "Mental health and psychological well-being are crucial for overall health:\n\n• Stress Management:\n  - Deep breathing exercises and meditation\n  - Regular physical activity and adequate sleep\n  - Time management and prioritization\n  - Social support and professional help when needed\n\n• Emotional Intelligence:\n  - Self-awareness and emotional regulation\n  - Empathy and social skills\n  - Motivation and resilience building\n\n• Cognitive Health:\n  - Mindfulness and present-moment awareness\n  - Positive thinking patterns\n  - Problem-solving skills\n  - Continuous learning and mental stimulation\n\n• Warning Signs to Watch:\n  - Persistent sadness or anxiety\n  - Changes in sleep or appetite\n  - Difficulty concentrating\n  - Social withdrawal\n\nImportant: For serious mental health concerns, please consult with a qualified mental health professional. What aspect of mental wellness would you like to discuss?";
    }

    // ADVANCED MATHEMATICAL CALCULATIONS
    // Handle complex calculations and conversions
    const mathMatch = lowerMessage.match(/(?:calculate|what is|how much is|convert)\s+(.+)/i);
    if (mathMatch) {
      const expression = mathMatch[1].toLowerCase();
      
      // Unit conversions
      if (expression.includes('oz to g') || expression.includes('ounce to gram')) {
        const ozMatch = expression.match(/(\d+(?:\.\d+)?)\s*oz/);
        if (ozMatch) {
          const oz = parseFloat(ozMatch[1]);
          const grams = Math.round(oz * 28.35 * 10) / 10;
          return `${oz} ounces = ${grams} grams\n\nConversion formula: 1 oz = 28.35g\nUseful for precise nutrition calculations and cooking measurements.`;
        }
      }
      
      if (expression.includes('lb to kg') || expression.includes('pound to kilogram')) {
        const lbMatch = expression.match(/(\d+(?:\.\d+)?)\s*lb/);
        if (lbMatch) {
          const lb = parseFloat(lbMatch[1]);
          const kg = Math.round(lb * 0.453592 * 100) / 100;
          return `${lb} pounds = ${kg} kilograms\n\nConversion formula: 1 lb = 0.453592 kg\nUseful for weight tracking and international measurements.`;
        }
      }
      
      // BMI calculations
      if (expression.includes('bmi') && expression.includes('kg') && expression.includes('cm')) {
        const weightMatch = expression.match(/(\d+(?:\.\d+)?)\s*kg/);
        const heightMatch = expression.match(/(\d+(?:\.\d+)?)\s*cm/);
        if (weightMatch && heightMatch) {
          const weight = parseFloat(weightMatch[1]);
          const heightCm = parseFloat(heightMatch[1]);
          const heightM = heightCm / 100;
          const bmi = Math.round((weight / (heightM * heightM)) * 10) / 10;
          
          let category = '';
          if (bmi < 18.5) category = 'Underweight';
          else if (bmi < 25) category = 'Normal weight';
          else if (bmi < 30) category = 'Overweight';
          else category = 'Obese';
          
          return `BMI Calculation:\n\nWeight: ${weight}kg\nHeight: ${heightCm}cm (${heightM}m)\n\nBMI = ${weight} ÷ (${heightM})² = ${bmi}\n\nCategory: ${category}\n\nFor detailed recommendations based on your BMI, use our BMI calculator tool.`;
        }
      }
    }
    // COMPLEX RECIPE AND MEAL CALCULATIONS
    // Handle recipe scaling and meal planning
    if (lowerMessage.includes('recipe') || lowerMessage.includes('meal prep') || lowerMessage.includes('serving')) {
      const servingMatch = lowerMessage.match(/(\d+)\s+serving/i);
      if (servingMatch) {
        const servings = parseInt(servingMatch[1]);
        return `Recipe Scaling for ${servings} Servings:\n\nTo scale any recipe:\n• Multiply each ingredient by ${servings/4} (assuming base recipe serves 4)\n• Cooking time may need adjustment:\n  - Same temperature, slightly longer time for larger quantities\n  - Check doneness with thermometer for proteins\n\nMeal Prep Tips:\n• Cook proteins in bulk (chicken, beef, fish)\n• Prepare grains and vegetables separately\n• Store in portioned containers\n• Label with date and contents\n• Most meals keep 3-4 days refrigerated\n\nWould you like specific meal prep ideas for ${servings} servings?`;
      }
    }
    
    // WORKOUT AND FITNESS CALCULATIONS
    if (lowerMessage.includes('calories burned') || lowerMessage.includes('exercise calories')) {
      const exerciseMatch = lowerMessage.match(/(\d+)\s+minutes?\s+(.+)/i);
      if (exerciseMatch) {
        const minutes = parseInt(exerciseMatch[1]);
        const exercise = exerciseMatch[2].toLowerCase();
        
        // Calories burned per minute for average 70kg person
        const calorieRates: { [key: string]: number } = {
          'running': 12,
          'jogging': 8,
          'walking': 4,
          'cycling': 8,
          'swimming': 11,
          'weightlifting': 6,
          'yoga': 3,
          'dancing': 7,
          'basketball': 9,
          'tennis': 8,
          'soccer': 10
        };
        
        for (const [activity, rate] of Object.entries(calorieRates)) {
          if (exercise.includes(activity)) {
            const totalCalories = Math.round(minutes * rate);
            return `Calories Burned - ${activity.charAt(0).toUpperCase() + activity.slice(1)}:\n\n• Duration: ${minutes} minutes\n• Estimated calories burned: ${totalCalories} kcal\n• Rate: ~${rate} calories/minute\n\nNote: This is for an average 70kg (154lb) person. Actual calories burned depend on:\n• Your body weight (heavier = more calories)\n• Exercise intensity\n• Fitness level\n• Age and gender\n\nFor more accurate tracking, consider using a fitness tracker or heart rate monitor.`;
          }
        }
      }
    }
    
    // VOLUME AND MEASUREMENT CONVERSIONS
    // Handle cups, tablespoons, etc.
    const volumeMatch = lowerMessage.match(/(\d+(?:\.\d+)?)\s*(cup|cups|tbsp|tablespoon|tablespoons|tsp|teaspoon|teaspoons|ml|liter|liters|fl oz|fluid ounce|fluid ounces)\s+(?:of\s+)?(rice|pasta|flour|sugar|milk|water|oil|oats|quinoa)/i);
    
    if (volumeMatch) {
      const [, amount, unit, food] = volumeMatch;
      const quantity = parseFloat(amount);
      
      // Convert to grams for calculation
      let grams = quantity;
      const densityData: { [key: string]: number } = {
        'rice': 185, // cooked rice per cup
        'pasta': 140, // cooked pasta per cup
        'flour': 120, // all-purpose flour per cup
        'sugar': 200, // granulated sugar per cup
        'milk': 240, // milk per cup (ml to g conversion)
        'water': 240, // water per cup
        'oil': 220, // vegetable oil per cup
        'oats': 80, // rolled oats per cup
        'quinoa': 185 // cooked quinoa per cup
      };
      
      const density = densityData[food.toLowerCase()];
      if (density) {
        switch (unit.toLowerCase()) {
          case 'cup':
          case 'cups':
            grams = quantity * density;
            break;
          case 'tbsp':
          case 'tablespoon':
          case 'tablespoons':
            grams = quantity * (density / 16); // 16 tbsp per cup
            break;
          case 'tsp':
          case 'teaspoon':
          case 'teaspoons':
            grams = quantity * (density / 48); // 48 tsp per cup
            break;
          case 'ml':
            grams = quantity * (density / 240); // assuming 240ml per cup
            break;
          case 'fl oz':
          case 'fluid ounce':
          case 'fluid ounces':
            grams = quantity * (density / 8); // 8 fl oz per cup
            break;
        }
        
        // Get nutritional data for the calculated grams
        const nutritionData: { [key: string]: { calories: number; protein: number; fat: number; carbs: number; name: string } } = {
          'rice': { calories: 130, protein: 2.7, fat: 0.3, carbs: 28, name: 'Cooked White Rice' },
          'pasta': { calories: 131, protein: 5, fat: 1.1, carbs: 25, name: 'Cooked Pasta' },
          'flour': { calories: 364, protein: 10, fat: 1, carbs: 76, name: 'All-Purpose Flour' },
          'sugar': { calories: 387, protein: 0, fat: 0, carbs: 100, name: 'Granulated Sugar' },
          'milk': { calories: 42, protein: 3.4, fat: 1, carbs: 5, name: 'Whole Milk' },
          'water': { calories: 0, protein: 0, fat: 0, carbs: 0, name: 'Water' },
          'oil': { calories: 884, protein: 0, fat: 100, carbs: 0, name: 'Vegetable Oil' },
          'oats': { calories: 389, protein: 17, fat: 7, carbs: 66, name: 'Rolled Oats' },
          'quinoa': { calories: 120, protein: 4.4, fat: 1.9, carbs: 22, name: 'Cooked Quinoa' }
        };
        
        const foodData = nutritionData[food.toLowerCase()];
        if (foodData) {
          const multiplier = grams / 100;
          const totalCalories = Math.round(foodData.calories * multiplier);
          const totalProtein = Math.round(foodData.protein * multiplier * 10) / 10;
          const totalFat = Math.round(foodData.fat * multiplier * 10) / 10;
          const totalCarbs = Math.round(foodData.carbs * multiplier * 10) / 10;
          
          return `${foodData.name} (${amount} ${unit} = ${Math.round(grams)}g):\n\n• Calories: ${totalCalories} kcal\n• Protein: ${totalProtein}g\n• Fat: ${totalFat}g\n• Carbohydrates: ${totalCarbs}g\n\nConversion reference:\n• 1 cup ${food} ≈ ${density}g\n• Your ${amount} ${unit} = ${Math.round(grams)}g\n\nNote: Values may vary based on preparation method and specific variety. Cooked vs. raw measurements can differ significantly.`;
        }
      }
    }
    const nutritionMatch = lowerMessage.match(/(\d+(?:\.\d+)?)\s*(oz|ounce|ounces|g|gram|grams|kg|kilogram|kilograms|lb|lbs|pound|pounds)\s+(?:of\s+)?(?:cooked\s+|grilled\s+|baked\s+|fried\s+|raw\s+)?(beef|steak|chicken|salmon|fish|pork|turkey|rice|pasta|bread|cheese|milk|yogurt|apple|banana|broccoli|spinach|potato|egg|eggs)/i);
    
    if (nutritionMatch) {
      const [, amount, unit, food] = nutritionMatch;
      const quantity = parseFloat(amount);
      
      // Convert to grams for calculation
      let grams = quantity;
      switch (unit.toLowerCase()) {
        case 'oz':
        case 'ounce':
        case 'ounces':
          grams = quantity * 28.35;
          break;
        case 'lb':
        case 'lbs':
        case 'pound':
        case 'pounds':
          grams = quantity * 453.592;
          break;
        case 'kg':
        case 'kilogram':
        case 'kilograms':
          grams = quantity * 1000;
          break;
        // g, gram, grams already in grams
      }
      
      // Nutritional data per 100g (cooked unless specified)
      const nutritionData: { [key: string]: { calories: number; protein: number; fat: number; carbs: number; name: string } } = {
        'beef': { calories: 250, protein: 26, fat: 15, carbs: 0, name: 'Cooked Beef/Steak' },
        'steak': { calories: 250, protein: 26, fat: 15, carbs: 0, name: 'Cooked Steak' },
        'chicken': { calories: 165, protein: 31, fat: 3.6, carbs: 0, name: 'Cooked Chicken Breast' },
        'salmon': { calories: 206, protein: 22, fat: 12, carbs: 0, name: 'Cooked Salmon' },
        'fish': { calories: 206, protein: 22, fat: 12, carbs: 0, name: 'Cooked Fish' },
        'pork': { calories: 242, protein: 27, fat: 14, carbs: 0, name: 'Cooked Pork' },
        'turkey': { calories: 135, protein: 30, fat: 1, carbs: 0, name: 'Cooked Turkey Breast' },
        'rice': { calories: 130, protein: 2.7, fat: 0.3, carbs: 28, name: 'Cooked White Rice' },
        'pasta': { calories: 131, protein: 5, fat: 1.1, carbs: 25, name: 'Cooked Pasta' },
        'bread': { calories: 265, protein: 9, fat: 3.2, carbs: 49, name: 'White Bread' },
        'cheese': { calories: 402, protein: 25, fat: 33, carbs: 1.3, name: 'Cheddar Cheese' },
        'milk': { calories: 42, protein: 3.4, fat: 1, carbs: 5, name: 'Whole Milk' },
        'yogurt': { calories: 59, protein: 10, fat: 0.4, carbs: 3.6, name: 'Greek Yogurt' },
        'apple': { calories: 52, protein: 0.3, fat: 0.2, carbs: 14, name: 'Fresh Apple' },
        'banana': { calories: 89, protein: 1.1, fat: 0.3, carbs: 23, name: 'Fresh Banana' },
        'broccoli': { calories: 34, protein: 2.8, fat: 0.4, carbs: 7, name: 'Cooked Broccoli' },
        'spinach': { calories: 23, protein: 2.9, fat: 0.4, carbs: 3.6, name: 'Cooked Spinach' },
        'potato': { calories: 87, protein: 1.9, fat: 0.1, carbs: 20, name: 'Baked Potato' },
        'egg': { calories: 155, protein: 13, fat: 11, carbs: 1.1, name: 'Whole Eggs' },
        'eggs': { calories: 155, protein: 13, fat: 11, carbs: 1.1, name: 'Whole Eggs' }
      };
      
      const foodData = nutritionData[food.toLowerCase()];
      if (foodData) {
        const multiplier = grams / 100;
        const totalCalories = Math.round(foodData.calories * multiplier);
        const totalProtein = Math.round(foodData.protein * multiplier * 10) / 10;
        const totalFat = Math.round(foodData.fat * multiplier * 10) / 10;
        const totalCarbs = Math.round(foodData.carbs * multiplier * 10) / 10;
        
        return `${foodData.name} (${amount}${unit} = ${Math.round(grams)}g):\n\n• Calories: ${totalCalories} kcal\n• Protein: ${totalProtein}g\n• Fat: ${totalFat}g\n• Carbohydrates: ${totalCarbs}g\n\nPer 100g reference:\n• Calories: ${foodData.calories} kcal\n• Protein: ${foodData.protein}g\n• Fat: ${foodData.fat}g\n• Carbs: ${foodData.carbs}g\n\nNote: Values are for ${foodData.name.toLowerCase()} and may vary based on preparation method, cut, and brand. For the most accurate nutrition information, check specific product labels.`;
      }
    }
    
    // SPECIFIC NUTRITIONAL QUERIES (Legacy support)
    if (lowerMessage.includes('boiled egg') || lowerMessage.includes('egg calories') || lowerMessage.includes('egg protein')) {
      return "Boiled Egg Nutrition (1 large egg, ~50g):\n\n• Calories: 68-70 kcal\n• Protein: 6.3g (complete protein with all essential amino acids)\n• Fat: 4.8g (mostly unsaturated)\n• Carbohydrates: 0.6g\n• Cholesterol: 186mg\n• Vitamins: B12, D, A, folate, choline\n• Minerals: Iron, phosphorus, selenium\n\nHealth Benefits:\n• High-quality protein for muscle maintenance\n• Choline for brain health\n• Lutein and zeaxanthin for eye health\n• Affordable and versatile protein source\n\nBoiled eggs are an excellent choice for weight management and muscle building!";
    }
    
    if (lowerMessage.includes('500g') && (lowerMessage.includes('chicken') || lowerMessage.includes('cooked chicken'))) {
      return "500g Cooked Chicken Breast (skinless) Nutrition:\n\n• Calories: 825-850 kcal\n• Protein: 155-165g (excellent for muscle building)\n• Fat: 18-22g (varies by cooking method)\n• Carbohydrates: 0g\n• Sodium: Varies by preparation\n\nPer 100g breakdown:\n• Calories: 165-170 kcal\n• Protein: 31-33g\n• Fat: 3.6-4.4g\n\nCooking Method Impact:\n• Grilled/Baked: Lowest calories\n• Poached: Retains most nutrients\n• Fried: Significantly increases calories\n\nThis amount provides about 3-4 servings and is excellent for meal prep. Great source of lean protein for fitness goals!";
    }

    // Default comprehensive response
    return "I'm here to help with any question you have! I can assist with:\n\n🏃‍♂️ Health & Fitness: Workouts, nutrition, BMI, wellness, exercise routines, weight management\n🍳 Lifestyle: Cooking, travel, personal development, relationships, stress management\n\nAnd much more within these areas! What specific topic would you like to explore? Feel free to ask me anything - from fitness routines and nutrition advice to cooking tips and personal growth strategies. I'm designed to provide helpful, detailed responses on health, fitness, and lifestyle topics.";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const topic = detectTopic(inputMessage);
    updateConversationContext(inputMessage, topic);

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      topic: topic
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputMessage, conversationContext),
        sender: 'ai',
        timestamp: new Date(),
        topic: topic
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Brain className="w-8 h-8 text-highlightyellow" />
            <h1 className="font-heading text-highlightyellow text-4xl sm:text-5xl font-black uppercase tracking-wide">
              Health & Lifestyle AI Assistant
            </h1>
            <Lightbulb className="w-8 h-8 text-highlightyellow" />
          </div>
          <p className="font-paragraph text-secondary-foreground/80 text-lg max-w-3xl mx-auto">
            Your comprehensive AI companion for health, fitness, and lifestyle guidance. From workout plans and nutrition advice to cooking tips and personal development - I'm here to provide detailed, contextual responses tailored to your wellness journey.
          </p>
          
          {/* Conversation Context Display */}
          {conversationContext.previousTopics.length > 0 && (
            <div className="mt-4 flex items-center justify-center space-x-2">
              <span className="font-paragraph text-secondary-foreground/60 text-sm">Recent topics:</span>
              {conversationContext.previousTopics.slice(-3).map((topic, index) => (
                <span key={index} className="px-2 py-1 bg-primary/20 text-primary-foreground text-xs rounded-full font-paragraph">
                  {topic}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Chat Container */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-secondary border-0 h-[600px] flex flex-col">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`flex items-start space-x-3 max-w-[80%] ${
                      message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === 'user'
                          ? 'bg-highlightyellow'
                          : 'bg-primary'
                      }`}
                    >
                      {message.sender === 'user' ? (
                        <User className="w-5 h-5 text-primary" />
                      ) : (
                        <Bot className="w-5 h-5 text-highlightyellow" />
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`rounded-2xl p-4 ${
                        message.sender === 'user'
                          ? 'bg-highlightyellow text-primary'
                          : 'bg-buttonbackground text-buttontext'
                      }`}
                    >
                      <p className="font-paragraph text-sm leading-relaxed">
                        {message.content}
                      </p>
                      <div
                        className={`text-xs mt-2 opacity-70 ${
                          message.sender === 'user' ? 'text-primary' : 'text-buttontext'
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-3 max-w-[80%]">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-highlightyellow" />
                    </div>
                    <div className="bg-buttonbackground text-buttontext rounded-2xl p-4">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="font-paragraph text-sm">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-secondary-foreground/10 p-6">
              <div className="flex space-x-4">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about health, fitness, nutrition, cooking, wellness, and lifestyle..."
                  className="flex-1 bg-buttonbackground border-0 text-buttontext placeholder:text-buttontext/60 font-paragraph"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-highlightyellow text-primary hover:bg-highlightyellow/90 px-6"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </Card>



          {/* Knowledge Domains */}
          <div className="mt-12">
            <h3 className="font-heading text-secondary-foreground text-xl font-bold uppercase mb-6 tracking-wide text-center">
              Knowledge Domains I Can Help With
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
              {[
                { icon: "🏃‍♂️", title: "Health & Fitness", desc: "Workouts, nutrition, wellness, BMI calculations, exercise routines" },
                { icon: "🍳", title: "Lifestyle", desc: "Cooking, travel, personal growth, relationships, stress management" },
              ].map((domain, index) => (
                <div key={index} className="text-center p-6 bg-primary/10 rounded-xl hover:bg-primary/20 transition-colors">
                  <div className="text-3xl mb-3">{domain.icon}</div>
                  <h4 className="font-heading text-secondary-foreground font-bold text-lg uppercase mb-2 tracking-wide">
                    {domain.title}
                  </h4>
                  <p className="font-paragraph text-secondary-foreground/70 text-sm leading-relaxed">
                    {domain.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
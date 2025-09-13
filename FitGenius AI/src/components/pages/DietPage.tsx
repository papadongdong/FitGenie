import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Image } from '@/components/ui/image';
import { Utensils, Target, Clock, Users, ChefHat, Apple, Beef, Wheat, Milk, User, Zap, Activity, AlertTriangle, Heart, Shield } from 'lucide-react';

interface DietPlan {
  name: string;
  description: string;
  meals: {
    breakfast: string[];
    lunch: string[];
    dinner: string[];
    snacks: string[];
  };
  tips: string[];
  calories: string;
  lifestyleGuidance?: {
    alcoholGuidance?: string[];
    smokingGuidance?: string[];
    generalWellness?: string[];
  };
}

interface BodyType {
  id: string;
  name: string;
  description: string;
  characteristics: string[];
  dietTips: string[];
  workoutTips: string[];
  imageUrl: string;
}

export default function DietPage() {
  const [goal, setGoal] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
  const [selectedBodyType, setSelectedBodyType] = useState('');
  const [alcoholConsumption, setAlcoholConsumption] = useState('');
  const [smokingHabit, setSmokingHabit] = useState('');
  const [generatedPlan, setGeneratedPlan] = useState<DietPlan | null>(null);

  const bodyTypes: BodyType[] = [
    {
      id: 'ectomorph',
      name: 'Ectomorph',
      description: 'Naturally lean with fast metabolism',
      characteristics: [
        'Thin, lean build',
        'Fast metabolism',
        'Difficulty gaining weight',
        'Long limbs and narrow frame',
        'Low body fat percentage'
      ],
      dietTips: [
        'Eat frequently - 5-6 meals per day',
        'Focus on calorie-dense foods',
        'Include healthy fats like nuts, avocados, and oils',
        'Consume 1.5-2g protein per kg body weight',
        'Don\'t skip meals, especially breakfast',
        'Include complex carbohydrates for sustained energy'
      ],
      workoutTips: [
        'Focus on compound movements',
        'Limit cardio to 2-3 sessions per week',
        'Prioritize strength training',
        'Allow adequate rest between workouts',
        'Keep workouts intense but shorter (45-60 minutes)'
      ],
      imageUrl: 'https://static.wixstatic.com/media/55d98d_76fecf9df65c4338ad3bcca4d6513819~mv2.png?originWidth=128&originHeight=128'
    },
    {
      id: 'mesomorph',
      name: 'Mesomorph',
      description: 'Naturally muscular with balanced metabolism',
      characteristics: [
        'Athletic, muscular build',
        'Balanced metabolism',
        'Gains muscle easily',
        'Medium bone structure',
        'Responds well to exercise'
      ],
      dietTips: [
        'Balanced macronutrient ratio (40% carbs, 30% protein, 30% fat)',
        'Eat 4-5 meals per day',
        'Time carbohydrates around workouts',
        'Include lean proteins with each meal',
        'Stay hydrated and eat plenty of vegetables',
        'Can handle moderate calorie cycling'
      ],
      workoutTips: [
        'Combine strength training with cardio',
        'Vary workout intensity and volume',
        'Can handle higher training frequency',
        'Mix compound and isolation exercises',
        'Recovery is typically faster'
      ],
      imageUrl: 'https://static.wixstatic.com/media/55d98d_0526082ea78a42a8931761f86729d818~mv2.png?originWidth=128&originHeight=128'
    },
    {
      id: 'endomorph',
      name: 'Endomorph',
      description: 'Naturally curvy with slower metabolism',
      characteristics: [
        'Rounder, softer physique',
        'Slower metabolism',
        'Gains weight easily',
        'Wider bone structure',
        'Higher body fat percentage'
      ],
      dietTips: [
        'Focus on portion control',
        'Emphasize protein and fiber',
        'Limit refined carbohydrates',
        'Eat smaller, more frequent meals',
        'Choose low-glycemic index foods',
        'Stay consistent with meal timing'
      ],
      workoutTips: [
        'Include regular cardio (4-5 times per week)',
        'Combine strength training with HIIT',
        'Focus on full-body workouts',
        'Maintain consistent exercise routine',
        'Monitor progress with measurements, not just weight'
      ],
      imageUrl: 'https://static.wixstatic.com/media/55d98d_918bdcf2f79048bb8514478f71c6d8f3~mv2.png?originWidth=128&originHeight=128'
    }
  ];

  const getVeganDietPlan = (goal: string, bodyTypeData: BodyType | undefined, alcoholConsumption: string, smokingHabit: string): DietPlan => {
    const basePlan = {
      name: 'Vegan Diet Plan',
      description: 'A completely plant-based nutrition plan that excludes all animal products while meeting your nutritional needs.',
      calories: goal === 'weight-loss' ? '1,200-1,500 calories/day' : 
                goal === 'weight-gain' ? '2,500-3,200 calories/day' : 
                goal === 'muscle-gain' ? '2,200-2,800 calories/day' : '1,800-2,200 calories/day',
      meals: {
        breakfast: [
          'Steel-cut oats with coconut milk, hemp hearts, blueberries, and maple syrup',
          'Acai smoothie bowl with spirulina, banana, granola, and coconut flakes',
          'Chia pudding with vanilla, mango chunks, and crushed pistachios',
          'Buckwheat pancakes with almond butter, strawberries, and agave nectar',
          'Quinoa breakfast porridge with cinnamon, walnuts, and dried cranberries',
          'Green smoothie with spinach, pineapple, coconut water, and protein powder',
          'Overnight oats with peanut butter, cacao nibs, and sliced banana',
          'Tofu scramble with nutritional yeast, turmeric, bell peppers, and spinach'
        ],
        lunch: [
          'Mediterranean quinoa salad with chickpeas, olives, cucumber, and lemon-tahini dressing',
          'Red lentil dal with coconut milk, served over basmati rice with naan bread',
          'Buddha bowl with roasted sweet potato, edamame, avocado, and miso dressing',
          'Falafel wrap with hummus, tabbouleh, and pickled vegetables in pita bread',
          'Thai coconut curry with tofu, bamboo shoots, and jasmine rice',
          'Black bean and corn salad with lime-cilantro dressing and tortilla chips',
          'Mushroom and barley soup with crusty sourdough bread',
          'Stuffed portobello mushrooms with quinoa, sun-dried tomatoes, and pine nuts',
          'Vietnamese pho with rice noodles, tofu, bean sprouts, and fresh herbs',
          'Moroccan tagine with chickpeas, apricots, and couscous'
        ],
        dinner: [
          'Eggplant moussaka with cashew béchamel sauce and Greek salad',
          'Jackfruit carnitas tacos with guacamole, salsa verde, and black beans',
          'Mushroom stroganoff with cashew cream over whole wheat pasta',
          'Stuffed acorn squash with wild rice, cranberries, and pecans',
          'Thai green curry with eggplant, bamboo shoots, and brown rice',
          'Lentil shepherd\'s pie with mashed cauliflower topping',
          'Ratatouille with herbed quinoa and crusty bread',
          'Cauliflower tikka masala with basmati rice and garlic naan',
          'Zucchini lasagna with cashew ricotta and marinara sauce',
          'Korean bibimbap with marinated tofu and assorted vegetables'
        ],
        snacks: [
          'Energy balls made with dates, almonds, and cacao powder',
          'Roasted chickpeas with smoked paprika and sea salt',
          'Apple slices with sunflower seed butter and hemp hearts',
          'Kale chips with nutritional yeast and garlic powder',
          'Coconut yogurt with granola and fresh berries',
          'Trail mix with cashews, goji berries, and dark chocolate chips',
          'Avocado toast with everything bagel seasoning',
          'Smoothie with mango, spinach, and coconut milk'
        ]
      },
      tips: [
        'Ensure adequate B12 supplementation (2.4 mcg daily)',
        'Combine legumes and grains for complete amino acid profiles',
        'Include fortified plant milks and nutritional yeast for B vitamins',
        'Pair iron-rich foods (spinach, lentils) with vitamin C sources (citrus, bell peppers)',
        'Consider algae-based omega-3 supplements for EPA and DHA',
        'Include zinc-rich foods like pumpkin seeds, cashews, and hemp hearts',
        'Eat vitamin D-fortified foods or consider supplementation',
        'Focus on calcium-rich foods like tahini, almonds, and leafy greens',
        ...(bodyTypeData ? [`Body Type Specific: ${bodyTypeData.dietTips[0]}`, `Body Type Specific: ${bodyTypeData.dietTips[1]}`] : [])
      ],
      lifestyleGuidance: generateLifestyleGuidance(alcoholConsumption, smokingHabit, 'vegan')
    };
    return basePlan;
  };

  const getVegetarianDietPlan = (goal: string, bodyTypeData: BodyType | undefined, alcoholConsumption: string, smokingHabit: string): DietPlan => {
    const basePlan = {
      name: 'Vegetarian Diet Plan',
      description: 'A plant-based nutrition plan that includes dairy and eggs while excluding meat and fish.',
      calories: goal === 'weight-loss' ? '1,200-1,500 calories/day' : 
                goal === 'weight-gain' ? '2,500-3,200 calories/day' : 
                goal === 'muscle-gain' ? '2,200-2,800 calories/day' : '1,800-2,200 calories/day',
      meals: {
        breakfast: [
          'Greek yogurt parfait with homemade granola, honey, and mixed berries',
          'Spinach and feta omelet with whole grain sourdough toast',
          'Overnight oats with Greek yogurt, almonds, and fresh peaches',
          'Cottage cheese pancakes with ricotta, blueberries, and maple syrup',
          'Shakshuka (eggs poached in spiced tomato sauce) with crusty bread',
          'Breakfast burrito with scrambled eggs, black beans, cheese, and salsa',
          'French toast made with brioche, served with strawberries and whipped cream',
          'Quinoa breakfast bowl with Greek yogurt, walnuts, and dried figs'
        ],
        lunch: [
          'Caprese salad with fresh mozzarella, heirloom tomatoes, and basil pesto',
          'Vegetarian lasagna with ricotta, spinach, and three-cheese blend',
          'Lentil and goat cheese salad with arugula and balsamic vinaigrette',
          'Grilled halloumi and vegetable sandwich with sun-dried tomato spread',
          'Butternut squash risotto with parmesan and sage',
          'Chickpea curry with paneer, served over basmati rice',
          'Margherita pizza with fresh mozzarella and basil on whole wheat crust',
          'Quinoa tabbouleh with feta cheese and pomegranate seeds',
          'Vegetarian chili with kidney beans, topped with cheddar and sour cream',
          'Stuffed portobello mushrooms with goat cheese and pine nuts'
        ],
        dinner: [
          'Eggplant parmesan with marinara sauce and fresh mozzarella',
          'Vegetable pad thai with tofu, eggs, and crushed peanuts',
          'Mushroom and gruyere quiche with mixed green salad',
          'Stuffed bell peppers with quinoa, black beans, and monterey jack cheese',
          'Vegetarian moussaka with béchamel sauce and kasseri cheese',
          'Spinach and ricotta stuffed shells with marinara sauce',
          'Cauliflower tikka masala with paneer and garlic naan',
          'Ratatouille tart with herbed goat cheese and puff pastry',
          'Vegetarian shepherd\'s pie with lentils and mashed potatoes',
          'Mediterranean pasta with olives, sun-dried tomatoes, and feta'
        ],
        snacks: [
          'String cheese with whole grain crackers and grapes',
          'Greek yogurt with honey, pistachios, and dried apricots',
          'Hard-boiled eggs with everything bagel seasoning',
          'Caprese skewers with cherry tomatoes and mozzarella balls',
          'Cottage cheese with cucumber slices and dill',
          'Trail mix with almonds, dried cranberries, and dark chocolate',
          'Apple slices with sharp cheddar cheese',
          'Hummus with pita chips and bell pepper strips'
        ]
      },
      tips: [
        'Include variety of protein sources (eggs, dairy, legumes, nuts, seeds)',
        'Combine different plant proteins for complete amino acid profiles',
        'Ensure adequate iron intake with vitamin C-rich foods',
        'Include calcium-rich dairy products like yogurt, cheese, and milk',
        'Focus on whole grains, legumes, and colorful vegetables',
        'Consider vitamin B12 supplementation if dairy/egg intake is limited',
        'Include omega-3 rich foods like walnuts, flax seeds, and chia seeds',
        'Eat zinc-rich foods like pumpkin seeds, cashews, and dairy products',
        ...(bodyTypeData ? [`Body Type Specific: ${bodyTypeData.dietTips[0]}`, `Body Type Specific: ${bodyTypeData.dietTips[1]}`] : [])
      ],
      lifestyleGuidance: generateLifestyleGuidance(alcoholConsumption, smokingHabit, 'vegetarian')
    };
    return basePlan;
  };

  const getKetoDietPlan = (goal: string, bodyTypeData: BodyType | undefined, alcoholConsumption: string, smokingHabit: string): DietPlan => {
    const basePlan = {
      name: 'Ketogenic Diet Plan',
      description: 'A high-fat, low-carbohydrate diet designed to shift your body into ketosis for fat burning.',
      calories: goal === 'weight-loss' ? '1,200-1,500 calories/day' : 
                goal === 'weight-gain' ? '2,200-2,800 calories/day' : 
                goal === 'muscle-gain' ? '2,000-2,600 calories/day' : '1,600-2,000 calories/day',
      meals: {
        breakfast: [
          'Bulletproof coffee with grass-fed butter and MCT oil, plus bacon and eggs',
          'Keto avocado boats filled with smoked salmon and cream cheese',
          'Coconut flour pancakes with sugar-free syrup and whipped cream',
          'Chorizo and cheese omelet with sautéed spinach in olive oil',
          'Chia seed pudding made with coconut milk and topped with macadamia nuts',
          'Keto smoothie with avocado, coconut milk, spinach, and protein powder',
          'Cream cheese pancakes with berries and sugar-free maple syrup',
          'Breakfast casserole with sausage, eggs, cheese, and bell peppers'
        ],
        lunch: [
          'Caesar salad with grilled chicken, parmesan, and full-fat dressing',
          'Bunless bacon cheeseburger with avocado and side of coleslaw',
          'Zucchini noodles with pesto, pine nuts, and grilled shrimp',
          'Cobb salad with blue cheese, bacon, eggs, and ranch dressing',
          'Cauliflower mac and cheese with ground beef',
          'Tuna salad lettuce wraps with mayo, celery, and hard-boiled eggs',
          'Keto pizza with cauliflower crust, pepperoni, and mozzarella',
          'Salmon salad with cucumber, dill, and full-fat Greek yogurt',
          'Beef and broccoli stir-fry cooked in coconut oil',
          'Chicken thigh salad with olive oil vinaigrette and feta cheese'
        ],
        dinner: [
          'Ribeye steak with garlic butter and roasted asparagus',
          'Baked salmon with hollandaise sauce and steamed broccoli',
          'Pork belly with cauliflower mash and sautéed kale',
          'Lamb chops with rosemary butter and grilled zucchini',
          'Chicken thighs with creamy mushroom sauce and green beans',
          'Beef short ribs braised in red wine with turnip mash',
          'Duck breast with orange glaze and roasted Brussels sprouts',
          'Lobster tail with drawn butter and spinach salad',
          'Keto lasagna with zucchini noodles and ricotta cheese',
          'Stuffed pork chops with cream cheese and herbs'
        ],
        snacks: [
          'Macadamia nuts with sea salt',
          'Pork rinds with guacamole',
          'Cheese crisps with pepperoni slices',
          'Olives stuffed with blue cheese',
          'Avocado with everything bagel seasoning',
          'Fat bombs made with coconut oil and cocoa',
          'Beef jerky (sugar-free) with cheese cubes',
          'Pecans with dark chocolate (85% cacao)'
        ]
      },
      tips: [
        'Keep net carbs under 20-25g per day for optimal ketosis',
        'Aim for 70-75% calories from healthy fats (avocado, olive oil, nuts)',
        'Include 20-25% calories from quality protein sources',
        'Stay hydrated and supplement electrolytes (sodium, potassium, magnesium)',
        'Monitor ketone levels with urine strips or blood meter initially',
        'Be patient during the 2-4 week adaptation period ("keto flu")',
        'Include MCT oil for quick ketone production and energy',
        'Focus on nutrient-dense, whole foods rather than processed keto products',
        ...(bodyTypeData ? [`Body Type Specific: ${bodyTypeData.dietTips[0]}`, `Body Type Specific: ${bodyTypeData.dietTips[1]}`] : [])
      ],
      lifestyleGuidance: generateLifestyleGuidance(alcoholConsumption, smokingHabit, 'keto')
    };
    return basePlan;
  };

  const getPaleoDietPlan = (goal: string, bodyTypeData: BodyType | undefined, alcoholConsumption: string, smokingHabit: string): DietPlan => {
    const basePlan = {
      name: 'Paleo Diet Plan',
      description: 'A whole foods diet based on foods available during the Paleolithic era, excluding processed foods, grains, and dairy.',
      calories: goal === 'weight-loss' ? '1,200-1,500 calories/day' : 
                goal === 'weight-gain' ? '2,500-3,200 calories/day' : 
                goal === 'muscle-gain' ? '2,200-2,800 calories/day' : '1,800-2,200 calories/day',
      meals: {
        breakfast: [
          'Scrambled eggs with sautéed vegetables cooked in coconut oil',
          'Sweet potato hash with ground turkey and bell peppers',
          'Paleo smoothie bowl with coconut milk, berries, and almond butter',
          'Breakfast "cereal" made with nuts, seeds, and coconut flakes',
          'Smoked salmon with avocado and cucumber slices',
          'Paleo pancakes made with almond flour and topped with fresh fruit',
          'Vegetable frittata with herbs and olive oil',
          'Chia seed pudding with coconut milk and fresh mango'
        ],
        lunch: [
          'Grilled chicken salad with mixed greens and olive oil vinaigrette',
          'Grass-fed beef lettuce wraps with avocado and salsa',
          'Wild-caught salmon with roasted vegetables and sweet potato',
          'Turkey and vegetable soup with bone broth base',
          'Tuna-stuffed avocados with cherry tomatoes and herbs',
          'Bison burger (no bun) with sweet potato fries',
          'Chicken and vegetable curry made with coconut milk',
          'Zucchini noodles with meat sauce and fresh basil',
          'Shrimp and avocado salad with lime-cilantro dressing',
          'Beef and vegetable stir-fry with coconut aminos'
        ],
        dinner: [
          'Grass-fed ribeye with roasted Brussels sprouts and sweet potato',
          'Wild-caught halibut with asparagus and cauliflower rice',
          'Free-range pork tenderloin with roasted root vegetables',
          'Lamb chops with rosemary and grilled zucchini',
          'Organic chicken thighs with sautéed kale and butternut squash',
          'Wild salmon with dill and roasted broccoli',
          'Venison steak with mushrooms and roasted carrots',
          'Duck breast with orange glaze and steamed vegetables',
          'Beef short ribs with mashed cauliflower and green beans',
          'Paleo shepherd\'s pie with cauliflower mash topping'
        ],
        snacks: [
          'Mixed raw nuts (almonds, walnuts, pecans)',
          'Apple slices with almond butter',
          'Coconut chips with macadamia nuts',
          'Beef jerky (sugar-free, nitrate-free)',
          'Vegetable sticks with guacamole',
          'Hard-boiled eggs with sea salt',
          'Olives with cherry tomatoes',
          'Trail mix with dried fruit (no added sugar) and nuts'
        ]
      },
      tips: [
        'Focus on grass-fed, pasture-raised, and wild-caught proteins',
        'Eat a rainbow of vegetables and fruits for optimal nutrition',
        'Use healthy fats like olive oil, coconut oil, and avocado oil',
        'Avoid all grains, legumes, dairy, and processed foods',
        'Choose organic produce when possible to avoid pesticides',
        'Stay hydrated with water, herbal teas, and coconut water',
        'Include fermented foods like sauerkraut and kimchi for gut health',
        'Consider bone broth for additional minerals and collagen',
        ...(bodyTypeData ? [`Body Type Specific: ${bodyTypeData.dietTips[0]}`, `Body Type Specific: ${bodyTypeData.dietTips[1]}`] : [])
      ],
      lifestyleGuidance: generateLifestyleGuidance(alcoholConsumption, smokingHabit, 'paleo')
    };
    return basePlan;
  };

  const generateLifestyleGuidance = (alcoholConsumption: string, smokingHabit: string, dietType: string) => {
    const guidance: { alcoholGuidance?: string[]; smokingGuidance?: string[]; generalWellness?: string[] } = {};

    // Alcohol guidance
    if (alcoholConsumption === 'regular' || alcoholConsumption === 'occasional') {
      guidance.alcoholGuidance = [
        '🍷 ALCOHOL & YOUR HEALTH - Important Guidance:',
        alcoholConsumption === 'regular' 
          ? 'As a regular drinker, your body faces increased nutritional demands and health risks.'
          : 'Even occasional drinking affects your nutrition and fitness goals.',
        
        '💡 IMMEDIATE DIETARY ADJUSTMENTS:',
        '• Increase B-vitamin intake (especially B1, B6, B12, folate) - alcohol depletes these rapidly',
        '• Add liver-supporting foods: cruciferous vegetables, beets, artichokes, milk thistle tea',
        '• Boost antioxidants: berries, dark leafy greens, green tea, turmeric',
        '• Prioritize magnesium-rich foods: nuts, seeds, dark chocolate, leafy greens',
        '• Include zinc sources: pumpkin seeds, oysters, beef, chickpeas',
        
        '🥤 HYDRATION STRATEGY:',
        '• Drink 1 glass of water for every alcoholic beverage',
        '• Add electrolytes: coconut water, sea salt, lemon water',
        '• Morning hydration ritual: warm lemon water + pinch of sea salt',
        
        '⏰ TIMING & MODERATION TIPS:',
        alcoholConsumption === 'regular'
          ? '• Limit to 1 drink/day (women) or 2 drinks/day (men) - consider alcohol-free days'
          : '• Stick to recommended limits: 1-2 drinks per occasion',
        '• Never drink on empty stomach - eat protein and healthy fats first',
        '• Avoid drinking 3 hours before bedtime for better sleep quality',
        '• Choose lower-sugar options: dry wines, spirits with soda water, avoid sugary mixers',
        
        '🎯 FITNESS IMPACT AWARENESS:',
        '• Alcohol reduces protein synthesis by up to 37% - increase protein intake on drinking days',
        '• Impairs recovery and muscle building - plan rest days after drinking',
        '• Affects sleep quality - prioritize sleep hygiene on drinking days',
        '• Dehydrates muscles - extra water and electrolytes are crucial',
        
        alcoholConsumption === 'regular' 
          ? '🚨 SERIOUS CONSIDERATION: Regular alcohol consumption significantly impacts your health goals. Consider speaking with a healthcare provider about reducing intake or seeking support if needed.'
          : '✅ POSITIVE STEP: Occasional drinking is more manageable - focus on the strategies above to minimize impact.'
      ];
    }

    // Smoking guidance
    if (smokingHabit === 'regular' || smokingHabit === 'occasional') {
      guidance.smokingGuidance = [
        '🚭 SMOKING & YOUR HEALTH - Critical Guidance:',
        smokingHabit === 'regular'
          ? 'As a regular smoker, your body is under constant oxidative stress and nutritional depletion.'
          : 'Even occasional smoking significantly impacts your health and fitness goals.',
        
        '🛡️ PROTECTIVE NUTRITION STRATEGY:',
        '• MASSIVE antioxidant boost needed: 2-3x normal vitamin C intake',
        '• Add vitamin E sources: almonds, sunflower seeds, avocados, olive oil',
        '• Include selenium: Brazil nuts (2-3 daily), sardines, eggs',
        '• Beta-carotene foods: carrots, sweet potatoes, spinach, kale',
        '• Quercetin sources: onions, apples, berries, green tea',
        
        '🫁 LUNG HEALTH SUPPORT:',
        '• Anti-inflammatory foods: fatty fish, walnuts, flax seeds, chia seeds',
        '• Cruciferous vegetables: broccoli, Brussels sprouts, cauliflower, cabbage',
        '• Garlic and onions: natural detoxifiers and lung protectors',
        '• Green tea: 3-4 cups daily for powerful antioxidants',
        '• Turmeric with black pepper: potent anti-inflammatory combo',
        
        '💨 DETOX SUPPORT:',
        '• Hydration is CRITICAL: 10-12 glasses of water daily minimum',
        '• Add lemon to water: supports liver detoxification',
        '• Include fiber-rich foods: helps eliminate toxins through digestive system',
        '• Cilantro and parsley: natural heavy metal detoxifiers',
        
        '🏃‍♂️ FITNESS CONSIDERATIONS:',
        '• Cardiovascular capacity is compromised - start slowly and build gradually',
        '• Recovery time is longer - allow extra rest between workouts',
        '• Focus on breathing exercises and yoga to improve lung function',
        '• Avoid intense cardio immediately after smoking',
        
        '⚠️ NUTRIENT DEPLETION AWARENESS:',
        '• Vitamin C: Smokers need 35mg MORE daily than non-smokers',
        '• B-vitamins: Smoking depletes B6, B12, and folate rapidly',
        '• Zinc and magnesium: Essential for immune function and healing',
        '• Calcium: Smoking interferes with absorption',
        
        smokingHabit === 'regular'
          ? '🆘 URGENT HEALTH PRIORITY: Regular smoking is the #1 preventable cause of disease and death. Please consider:\n• Nicotine replacement therapy\n• Counseling support\n• Gradual reduction plan\n• Speaking with your healthcare provider\n• Calling a quit-smoking helpline\n\nYour health goals will be dramatically easier to achieve without smoking.'
          : '⚠️ IMPORTANT REMINDER: Even occasional smoking causes immediate harm. Each cigarette damages your cardiovascular system and reduces oxygen delivery to muscles. Consider eliminating completely for optimal health results.'
      ];
    }

    // General wellness guidance when lifestyle factors are present
    if (alcoholConsumption !== 'never' || smokingHabit !== 'never') {
      guidance.generalWellness = [
        '🌟 COMPREHENSIVE WELLNESS APPROACH:',
        '• Sleep quality is CRUCIAL: Aim for 7-9 hours of quality sleep nightly',
        '• Stress management: Practice meditation, deep breathing, or yoga daily',
        '• Regular health check-ups: Monitor liver function, cardiovascular health',
        '• Support system: Consider joining health-focused communities or support groups',
        '• Gradual improvements: Small, consistent changes lead to lasting results',
        '• Professional guidance: Consider working with a nutritionist or health coach',
        '• Mental health: Address underlying stress, anxiety, or habits that contribute to these behaviors',
        '• Celebrate progress: Acknowledge every positive step toward better health'
      ];
    }

    return guidance;
  };

  const applyGlutenFreeModifications = (plan: DietPlan): DietPlan => {
    const modifiedPlan = { ...plan };
    modifiedPlan.name = `Gluten-Free ${plan.name}`;
    modifiedPlan.description = `${plan.description} Modified to exclude all gluten-containing ingredients.`;
    
    // Replace gluten-containing items with specific alternatives
    modifiedPlan.meals.breakfast = plan.meals.breakfast.map(meal => 
      meal.replace(/whole grain toast|bread|wheat bread/gi, 'gluten-free bread')
        .replace(/oatmeal/gi, 'certified gluten-free oats')
        .replace(/granola/gi, 'gluten-free granola')
        .replace(/pancakes/gi, 'gluten-free pancakes made with almond flour')
        .replace(/cereal/gi, 'gluten-free cereal')
        .replace(/bagel/gi, 'gluten-free bagel')
        .replace(/muffin/gi, 'gluten-free muffin')
        .replace(/croissant/gi, 'gluten-free pastry')
    );
    
    modifiedPlan.meals.lunch = plan.meals.lunch.map(meal => 
      meal.replace(/wrap|tortilla/gi, 'gluten-free wrap')
        .replace(/bread|sandwich/gi, 'gluten-free bread sandwich')
        .replace(/pasta/gi, 'gluten-free pasta (rice or quinoa-based)')
        .replace(/noodles/gi, 'rice noodles or gluten-free pasta')
        .replace(/couscous/gi, 'quinoa or rice')
        .replace(/barley/gi, 'rice or quinoa')
        .replace(/wheat/gi, 'rice')
        .replace(/soy sauce/gi, 'tamari (gluten-free soy sauce)')
        .replace(/pita/gi, 'gluten-free pita')
    );
    
    modifiedPlan.meals.dinner = plan.meals.dinner.map(meal => 
      meal.replace(/pasta/gi, 'gluten-free pasta (corn, rice, or legume-based)')
        .replace(/bread|breadcrumbs/gi, 'gluten-free bread or almond flour')
        .replace(/flour/gi, 'gluten-free flour blend')
        .replace(/noodles/gi, 'rice noodles or shirataki noodles')
        .replace(/soy sauce/gi, 'tamari')
        .replace(/beer/gi, 'gluten-free beer or wine')
        .replace(/wheat/gi, 'rice or quinoa')
    );
    
    modifiedPlan.meals.snacks = plan.meals.snacks.map(snack => 
      snack.replace(/crackers/gi, 'gluten-free crackers (rice or seed-based)')
        .replace(/pretzels/gi, 'gluten-free pretzels')
        .replace(/granola bars/gi, 'gluten-free energy bars')
        .replace(/cookies/gi, 'gluten-free cookies')
    );
    
    modifiedPlan.tips = [
      'Always read labels carefully - gluten can hide in sauces, seasonings, and processed foods',
      'Look for certified gluten-free products to avoid cross-contamination',
      'Focus on naturally gluten-free whole foods like fruits, vegetables, and lean proteins',
      'Be aware of cross-contamination in restaurants and shared kitchen spaces',
      'Consider gluten-free grains like quinoa, rice, millet, and certified gluten-free oats',
      'Watch out for hidden gluten in items like soy sauce, salad dressings, and soup bases',
      'Use separate cooking utensils and cutting boards if sharing kitchen with gluten-eaters',
      ...plan.tips.filter(tip => !tip.includes('whole grain') && !tip.includes('bread'))
    ];
    
    return modifiedPlan;
  };

  const applyDairyFreeModifications = (plan: DietPlan): DietPlan => {
    const modifiedPlan = { ...plan };
    modifiedPlan.name = `Dairy-Free ${plan.name}`;
    modifiedPlan.description = `${plan.description} Modified to exclude all dairy products.`;
    
    // Replace dairy-containing items with specific alternatives
    modifiedPlan.meals.breakfast = plan.meals.breakfast.map(meal => 
      meal.replace(/whole milk|milk/gi, 'oat milk or almond milk')
        .replace(/Greek yogurt|yogurt/gi, 'coconut yogurt or cashew yogurt')
        .replace(/cheese/gi, 'dairy-free cheese or nutritional yeast')
        .replace(/butter/gi, 'vegan butter or coconut oil')
        .replace(/cream cheese/gi, 'dairy-free cream cheese')
        .replace(/cottage cheese/gi, 'dairy-free cottage cheese alternative')
        .replace(/ricotta/gi, 'cashew ricotta or tofu ricotta')
        .replace(/whipped cream/gi, 'coconut whipped cream')
    );
    
    modifiedPlan.meals.lunch = plan.meals.lunch.map(meal => 
      meal.replace(/mozzarella/gi, 'dairy-free mozzarella')
        .replace(/feta/gi, 'dairy-free feta or nutritional yeast')
        .replace(/parmesan/gi, 'nutritional yeast or dairy-free parmesan')
        .replace(/goat cheese/gi, 'dairy-free goat cheese alternative')
        .replace(/halloumi/gi, 'marinated tofu or dairy-free halloumi')
        .replace(/cheddar/gi, 'dairy-free cheddar')
        .replace(/cheese/gi, 'dairy-free cheese')
        .replace(/yogurt/gi, 'coconut yogurt')
        .replace(/butter/gi, 'vegan butter')
        .replace(/cream/gi, 'coconut cream')
        .replace(/sour cream/gi, 'dairy-free sour cream')
    );
    
    modifiedPlan.meals.dinner = plan.meals.dinner.map(meal => 
      meal.replace(/cheese/gi, 'dairy-free cheese or nutritional yeast')
        .replace(/butter/gi, 'vegan butter or olive oil')
        .replace(/milk/gi, 'plant-based milk')
        .replace(/cream/gi, 'coconut cream or cashew cream')
        .replace(/parmesan/gi, 'nutritional yeast')
        .replace(/mozzarella/gi, 'dairy-free mozzarella')
        .replace(/ricotta/gi, 'cashew ricotta')
        .replace(/béchamel/gi, 'dairy-free béchamel sauce')
        .replace(/hollandaise/gi, 'dairy-free hollandaise sauce')
    );
    
    modifiedPlan.meals.snacks = plan.meals.snacks.map(snack => 
      snack.replace(/cheese/gi, 'dairy-free cheese or hummus')
        .replace(/yogurt/gi, 'coconut yogurt or almond yogurt')
        .replace(/milk/gi, 'plant-based milk')
        .replace(/cottage cheese/gi, 'silken tofu or dairy-free cottage cheese')
        .replace(/string cheese/gi, 'dairy-free cheese sticks')
    );
    
    modifiedPlan.tips = [
      'Use plant-based milk alternatives like oat, almond, soy, or coconut milk',
      'Replace cheese with nutritional yeast for umami flavor',
      'Try coconut yogurt, cashew yogurt, or almond yogurt as dairy alternatives',
      'Use vegan butter, coconut oil, or olive oil instead of dairy butter',
      'Read labels carefully as dairy can be hidden in many processed foods',
      'Look for "may contain milk" warnings on packaged foods',
      'Consider calcium-fortified plant milks to maintain calcium intake',
      'Experiment with cashew cream and coconut cream for rich, creamy textures',
      ...plan.tips.filter(tip => !tip.toLowerCase().includes('dairy') && !tip.toLowerCase().includes('milk') && !tip.toLowerCase().includes('cheese'))
    ];
    
    return modifiedPlan;
  };

  const handleRestrictionChange = (restriction: string, checked: boolean) => {
    if (checked) {
      setDietaryRestrictions([...dietaryRestrictions, restriction]);
    } else {
      setDietaryRestrictions(dietaryRestrictions.filter(r => r !== restriction));
    }
  };

  const generateDietPlan = () => {
    if (!goal || !activityLevel) return;

    let plan: DietPlan;

    // Get selected body type for additional tips
    const selectedBodyTypeData = bodyTypes.find(bt => bt.id === selectedBodyType);

    if (goal === 'weight-loss') {
      plan = {
        name: 'Weight Loss Diet Plan',
        description: 'A balanced, calorie-controlled plan designed to promote healthy weight loss while maintaining energy levels.',
        calories: '1,200-1,500 calories/day',
        meals: {
          breakfast: [
            'Greek yogurt with berries and a sprinkle of granola',
            'Scrambled eggs with spinach and whole grain toast',
            'Oatmeal topped with sliced banana and almonds',
            'Smoothie with protein powder, spinach, and fruit'
          ],
          lunch: [
            'Grilled chicken salad with mixed greens and olive oil dressing',
            'Quinoa bowl with roasted vegetables and chickpeas',
            'Turkey and avocado wrap with whole wheat tortilla',
            'Lentil soup with a side of mixed green salad'
          ],
          dinner: [
            'Baked salmon with steamed broccoli and sweet potato',
            'Grilled chicken breast with roasted vegetables',
            'Lean beef stir-fry with brown rice',
            'Baked cod with quinoa and asparagus'
          ],
          snacks: [
            'Apple slices with almond butter',
            'Handful of mixed nuts',
            'Carrot sticks with hummus',
            'Greek yogurt with cucumber'
          ]
        },
        tips: [
          'Drink water before each meal to help with satiety',
          'Eat slowly and mindfully to recognize fullness cues',
          'Include protein in every meal to maintain muscle mass',
          'Focus on whole, unprocessed foods',
          'Plan and prep meals in advance',
          ...(selectedBodyTypeData ? [`Body Type Specific: ${selectedBodyTypeData.dietTips[0]}`, `Body Type Specific: ${selectedBodyTypeData.dietTips[1]}`] : [])
        ]
      };
    } else if (goal === 'weight-gain') {
      plan = {
        name: 'Healthy Weight Gain Diet Plan',
        description: 'A nutrient-dense, calorie-rich plan designed to promote healthy weight gain while building lean muscle mass.',
        calories: '2,500-3,200 calories/day',
        meals: {
          breakfast: [
            'Oatmeal with whole milk, banana, peanut butter, and honey',
            'Scrambled eggs with cheese, avocado toast, and orange juice',
            'Protein smoothie with banana, oats, milk, and protein powder',
            'Whole grain pancakes with Greek yogurt and mixed berries'
          ],
          lunch: [
            'Grilled chicken sandwich with avocado and sweet potato fries',
            'Salmon bowl with quinoa, avocado, and tahini dressing',
            'Turkey and cheese wrap with hummus and dried fruits',
            'Beef and vegetable stir-fry with jasmine rice and nuts'
          ],
          dinner: [
            'Grilled steak with mashed potatoes and roasted vegetables',
            'Baked salmon with wild rice pilaf and steamed broccoli',
            'Chicken thighs with quinoa stuffing and green beans',
            'Pork tenderloin with baked sweet potato and asparagus'
          ],
          snacks: [
            'Trail mix with nuts, seeds, and dried fruit',
            'Protein shake with banana and peanut butter',
            'Whole grain crackers with cheese and avocado',
            'Greek yogurt with granola and honey'
          ]
        },
        tips: [
          'Eat frequent meals (5-6 times per day) to increase calorie intake',
          'Include healthy fats like nuts, avocados, and olive oil in every meal',
          'Drink calorie-rich beverages like smoothies and milk',
          'Focus on nutrient-dense foods rather than empty calories',
          'Add protein powder to smoothies and oatmeal for extra calories',
          'Eat larger portions and don\'t skip meals',
          'Include strength training to build muscle mass alongside weight gain',
          'Stay hydrated but avoid drinking too much water before meals',
          ...(selectedBodyTypeData ? [`Body Type Specific: ${selectedBodyTypeData.dietTips[0]}`, `Body Type Specific: ${selectedBodyTypeData.dietTips[1]}`] : [])
        ]
      };
    } else if (goal === 'muscle-gain') {
      plan = {
        name: 'Muscle Building Diet Plan',
        description: 'A protein-rich, calorie-dense plan designed to support muscle growth and recovery.',
        calories: '2,200-2,800 calories/day',
        meals: {
          breakfast: [
            'Protein pancakes with Greek yogurt and berries',
            'Scrambled eggs with cheese, avocado, and whole grain toast',
            'Oatmeal with protein powder, banana, and peanut butter',
            'Smoothie bowl with protein powder, oats, and mixed fruits'
          ],
          lunch: [
            'Grilled chicken breast with quinoa and roasted vegetables',
            'Salmon bowl with brown rice and edamame',
            'Turkey and cheese sandwich with sweet potato fries',
            'Beef and vegetable stir-fry with jasmine rice'
          ],
          dinner: [
            'Lean beef with mashed sweet potatoes and green beans',
            'Grilled salmon with wild rice and asparagus',
            'Chicken thighs with quinoa and roasted Brussels sprouts',
            'Pork tenderloin with baked potato and steamed broccoli'
          ],
          snacks: [
            'Protein shake with banana',
            'Trail mix with nuts and dried fruit',
            'Cottage cheese with pineapple',
            'Hard-boiled eggs with whole grain crackers'
          ]
        },
        tips: [
          'Consume 1.6-2.2g of protein per kg of body weight',
          'Eat within 30 minutes post-workout for optimal recovery',
          'Include complex carbohydrates for sustained energy',
          'Stay hydrated throughout the day',
          'Get adequate sleep for muscle recovery',
          ...(selectedBodyTypeData ? [`Body Type Specific: ${selectedBodyTypeData.dietTips[0]}`, `Body Type Specific: ${selectedBodyTypeData.dietTips[1]}`] : [])
        ]
      };
    } else if (goal === 'maintenance') {
      plan = {
        name: 'Maintenance Diet Plan',
        description: 'A balanced plan to maintain current weight while supporting overall health and energy.',
        calories: '1,800-2,200 calories/day',
        meals: {
          breakfast: [
            'Whole grain cereal with milk and fresh fruit',
            'Avocado toast with poached egg',
            'Greek yogurt parfait with granola and berries',
            'Smoothie with protein powder and mixed vegetables'
          ],
          lunch: [
            'Mediterranean salad with grilled chicken',
            'Quinoa bowl with roasted vegetables and feta',
            'Whole grain wrap with turkey and vegetables',
            'Vegetable soup with whole grain bread'
          ],
          dinner: [
            'Grilled fish with roasted vegetables and brown rice',
            'Chicken stir-fry with mixed vegetables',
            'Lean pork with quinoa and steamed vegetables',
            'Vegetarian pasta with marinara and side salad'
          ],
          snacks: [
            'Mixed berries with yogurt',
            'Handful of almonds',
            'Apple with peanut butter',
            'Vegetable sticks with hummus'
          ]
        },
        tips: [
          'Maintain a balanced intake of all macronutrients',
          'Listen to your hunger and fullness cues',
          'Include a variety of colorful fruits and vegetables',
          'Stay consistent with meal timing',
          'Allow for occasional treats in moderation',
          ...(selectedBodyTypeData ? [`Body Type Specific: ${selectedBodyTypeData.dietTips[0]}`, `Body Type Specific: ${selectedBodyTypeData.dietTips[1]}`] : [])
        ]
      };
    } else {
      plan = {
        name: 'General Health Diet Plan',
        description: 'A well-rounded plan focused on overall health and wellness.',
        calories: '1,600-2,000 calories/day',
        meals: {
          breakfast: [
            'Oatmeal with fresh fruit and nuts',
            'Whole grain toast with avocado',
            'Greek yogurt with granola',
            'Vegetable omelet with whole grain toast'
          ],
          lunch: [
            'Mixed green salad with grilled protein',
            'Vegetable soup with whole grain roll',
            'Quinoa salad with roasted vegetables',
            'Whole grain wrap with lean protein'
          ],
          dinner: [
            'Grilled lean protein with vegetables',
            'Baked fish with sweet potato',
            'Vegetarian stir-fry with brown rice',
            'Lean meat with roasted vegetables'
          ],
          snacks: [
            'Fresh fruit',
            'Raw vegetables with hummus',
            'Small handful of nuts',
            'Low-fat yogurt'
          ]
        },
        tips: [
          'Focus on whole, minimally processed foods',
          'Include a variety of nutrients in your diet',
          'Stay hydrated throughout the day',
          'Practice portion control',
          'Enjoy meals mindfully',
          ...(selectedBodyTypeData ? [`Body Type Specific: ${selectedBodyTypeData.dietTips[0]}`, `Body Type Specific: ${selectedBodyTypeData.dietTips[1]}`] : [])
        ]
      };
    }

    // Override plan based on specific dietary restrictions
    if (dietaryRestrictions.length > 0) {
      // Prioritize specific diet plans over general modifications
      if (dietaryRestrictions.includes('vegan')) {
        plan = getVeganDietPlan(goal, selectedBodyTypeData, alcoholConsumption, smokingHabit);
      } else if (dietaryRestrictions.includes('vegetarian')) {
        plan = getVegetarianDietPlan(goal, selectedBodyTypeData, alcoholConsumption, smokingHabit);
      } else if (dietaryRestrictions.includes('keto')) {
        plan = getKetoDietPlan(goal, selectedBodyTypeData, alcoholConsumption, smokingHabit);
      } else if (dietaryRestrictions.includes('paleo')) {
        plan = getPaleoDietPlan(goal, selectedBodyTypeData, alcoholConsumption, smokingHabit);
      } else {
        // Apply modifications for gluten-free and dairy-free
        if (dietaryRestrictions.includes('gluten-free')) {
          plan = applyGlutenFreeModifications(plan);
        }
        if (dietaryRestrictions.includes('dairy-free')) {
          plan = applyDairyFreeModifications(plan);
        }
        // Add lifestyle guidance to existing plan
        plan.lifestyleGuidance = generateLifestyleGuidance(alcoholConsumption, smokingHabit, 'general');
      }
    } else {
      // Add lifestyle guidance to basic plans
      plan.lifestyleGuidance = generateLifestyleGuidance(alcoholConsumption, smokingHabit, 'general');
    }

    setGeneratedPlan(plan);
  };

  const resetForm = () => {
    setGoal('');
    setActivityLevel('');
    setDietaryRestrictions([]);
    setSelectedBodyType('');
    setAlcoholConsumption('');
    setSmokingHabit('');
    setGeneratedPlan(null);
  };

  return (
    <div className="min-h-screen bg-primary py-8">
      <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-highlightyellow text-4xl sm:text-5xl font-black uppercase mb-4 tracking-wide">
            Personalized Diet Plans
          </h1>
          <p className="font-paragraph text-secondary-foreground/80 text-lg max-w-2xl mx-auto">
            Get a customized nutrition plan tailored to your goals, activity level, and dietary preferences.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Card */}
          <Card className="bg-secondary border-0 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-highlightyellow rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h2 className="font-heading text-secondary-foreground text-2xl font-bold uppercase tracking-wide">
                Your Preferences
              </h2>
            </div>

            <div className="space-y-6">
              {/* Goal Selection */}
              <div>
                <Label className="font-paragraph text-secondary-foreground font-semibold mb-3 block">
                  What's your primary goal?
                </Label>
                <Select value={goal} onValueChange={setGoal}>
                  <SelectTrigger className="bg-buttonbackground border-0 text-buttontext font-paragraph">
                    <SelectValue placeholder="Select your goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weight-loss">Weight Loss</SelectItem>
                    <SelectItem value="weight-gain">Weight Gain</SelectItem>
                    <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                    <SelectItem value="maintenance">Weight Maintenance</SelectItem>
                    <SelectItem value="general-health">General Health</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Activity Level */}
              <div>
                <Label className="font-paragraph text-secondary-foreground font-semibold mb-3 block">
                  What's your activity level?
                </Label>
                <Select value={activityLevel} onValueChange={setActivityLevel}>
                  <SelectTrigger className="bg-buttonbackground border-0 text-buttontext font-paragraph">
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary (little to no exercise)</SelectItem>
                    <SelectItem value="light">Light (1-3 days/week)</SelectItem>
                    <SelectItem value="moderate">Moderate (3-5 days/week)</SelectItem>
                    <SelectItem value="active">Active (6-7 days/week)</SelectItem>
                    <SelectItem value="very-active">Very Active (2x/day or intense)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Body Type Selection */}
              <div>
                <Label className="font-paragraph text-secondary-foreground font-semibold mb-3 block">
                  What's your body type? (optional)
                </Label>
                <div className="grid grid-cols-1 gap-4">
                  {bodyTypes.map((bodyType) => (
                    <div
                      key={bodyType.id}
                      onClick={() => setSelectedBodyType(selectedBodyType === bodyType.id ? '' : bodyType.id)}
                      className={`cursor-pointer border-2 rounded-xl p-4 transition-all duration-200 ${
                        selectedBodyType === bodyType.id
                          ? 'border-highlightyellow bg-highlightyellow/10'
                          : 'border-secondary-foreground/20 hover:border-secondary-foreground/40'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-buttonbackground flex-shrink-0">
                          <Image
                            src={bodyType.imageUrl}
                            alt={`${bodyType.name} body type`}
                            width={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-heading text-secondary-foreground font-bold text-lg uppercase tracking-wide mb-1">
                            {bodyType.name}
                          </h4>
                          <p className="font-paragraph text-secondary-foreground/80 text-sm mb-2">
                            {bodyType.description}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {bodyType.characteristics.slice(0, 2).map((char, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-secondary-foreground/10 text-secondary-foreground text-xs rounded-full font-paragraph"
                              >
                                {char}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedBodyType === bodyType.id
                            ? 'border-highlightyellow bg-highlightyellow'
                            : 'border-secondary-foreground/40'
                        }`}>
                          {selectedBodyType === bodyType.id && (
                            <div className="w-3 h-3 bg-primary rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lifestyle Habits */}
              <div>
                <Label className="font-paragraph text-secondary-foreground font-semibold mb-3 block">
                  Lifestyle Habits (optional but important for personalized guidance)
                </Label>
                <div className="space-y-4">
                  {/* Alcohol Consumption */}
                  <div>
                    <Label className="font-paragraph text-secondary-foreground/80 font-medium mb-2 block text-sm">
                      Alcohol Consumption
                    </Label>
                    <Select value={alcoholConsumption} onValueChange={setAlcoholConsumption}>
                      <SelectTrigger className="bg-buttonbackground border-0 text-buttontext font-paragraph">
                        <SelectValue placeholder="Select alcohol consumption" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="never">Never</SelectItem>
                        <SelectItem value="occasional">Occasional (1-2 times per week)</SelectItem>
                        <SelectItem value="regular">Regular (3+ times per week)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Smoking Habit */}
                  <div>
                    <Label className="font-paragraph text-secondary-foreground/80 font-medium mb-2 block text-sm">
                      Smoking Habit
                    </Label>
                    <Select value={smokingHabit} onValueChange={setSmokingHabit}>
                      <SelectTrigger className="bg-buttonbackground border-0 text-buttontext font-paragraph">
                        <SelectValue placeholder="Select smoking habit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="never">Never</SelectItem>
                        <SelectItem value="occasional">Occasional (social smoking)</SelectItem>
                        <SelectItem value="regular">Regular (daily smoking)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Dietary Restrictions */}
              <div>
                <Label className="font-paragraph text-secondary-foreground font-semibold mb-3 block">
                  Dietary Restrictions (optional)
                </Label>
                <div className="space-y-3">
                  {[
                    { id: 'vegetarian', label: 'Vegetarian', icon: <Apple className="w-4 h-4" /> },
                    { id: 'vegan', label: 'Vegan', icon: <Apple className="w-4 h-4" /> },
                    { id: 'gluten-free', label: 'Gluten-Free', icon: <Wheat className="w-4 h-4" /> },
                    { id: 'dairy-free', label: 'Dairy-Free', icon: <Milk className="w-4 h-4" /> },
                    { id: 'keto', label: 'Keto', icon: <Beef className="w-4 h-4" /> },
                    { id: 'paleo', label: 'Paleo', icon: <Beef className="w-4 h-4" /> },
                  ].map((restriction) => (
                    <div key={restriction.id} className="flex items-center space-x-3">
                      <Checkbox
                        id={restriction.id}
                        checked={dietaryRestrictions.includes(restriction.id)}
                        onCheckedChange={(checked) => 
                          handleRestrictionChange(restriction.id, checked as boolean)
                        }
                        className="border-secondary-foreground/20"
                      />
                      <Label 
                        htmlFor={restriction.id}
                        className="font-paragraph text-secondary-foreground text-sm flex items-center space-x-2 cursor-pointer"
                      >
                        {restriction.icon}
                        <span>{restriction.label}</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex space-x-4 pt-4">
                <Button
                  onClick={generateDietPlan}
                  disabled={!goal || !activityLevel}
                  className="flex-1 bg-highlightyellow text-primary hover:bg-highlightyellow/90 font-paragraph font-bold"
                >
                  Generate Diet Plan
                </Button>
                <Button
                  onClick={resetForm}
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
            {generatedPlan ? (
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                    <ChefHat className="w-6 h-6 text-highlightyellow" />
                  </div>
                  <div>
                    <h2 className="font-heading text-buttontext text-xl font-bold uppercase tracking-wide">
                      {generatedPlan.name}
                    </h2>
                    <p className="font-paragraph text-buttontext/60 text-sm">
                      {generatedPlan.calories}
                    </p>
                  </div>
                </div>

                <p className="font-paragraph text-buttontext/80 text-sm leading-relaxed mb-6">
                  {generatedPlan.description}
                </p>

                {/* Meals */}
                <div className="space-y-6">
                  {Object.entries(generatedPlan.meals).map(([mealType, meals]) => (
                    <div key={mealType}>
                      <h3 className="font-heading text-buttontext text-lg font-bold uppercase mb-3 tracking-wide flex items-center space-x-2">
                        {mealType === 'breakfast' && <Clock className="w-4 h-4" />}
                        {mealType === 'lunch' && <Utensils className="w-4 h-4" />}
                        {mealType === 'dinner' && <ChefHat className="w-4 h-4" />}
                        {mealType === 'snacks' && <Apple className="w-4 h-4" />}
                        <span>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</span>
                      </h3>
                      <ul className="space-y-2">
                        {meals.map((meal, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            <span className="font-paragraph text-buttontext/80 text-sm leading-relaxed">
                              {meal}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Tips */}
                <div className="mt-8 p-4 bg-primary/5 rounded-xl">
                  <h3 className="font-heading text-buttontext text-lg font-bold uppercase mb-3 tracking-wide">
                    Success Tips
                  </h3>
                  <ul className="space-y-2">
                    {generatedPlan.tips.map((tip, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="font-paragraph text-buttontext/80 text-sm leading-relaxed">
                          {tip}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Lifestyle Guidance */}
                {generatedPlan.lifestyleGuidance && (
                  <div className="mt-8 space-y-6">
                    {/* Alcohol Guidance */}
                    {generatedPlan.lifestyleGuidance.alcoholGuidance && (
                      <Card className="bg-amber-50 border border-amber-200 p-6">
                        <div className="flex items-start space-x-3 mb-4">
                          <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <AlertTriangle className="w-5 h-5 text-white" />
                          </div>
                          <h4 className="font-heading text-amber-800 text-lg font-bold uppercase tracking-wide">
                            Alcohol & Nutrition Guidance
                          </h4>
                        </div>
                        <div className="space-y-3">
                          {generatedPlan.lifestyleGuidance.alcoholGuidance.map((guidance, index) => (
                            <p key={index} className="font-paragraph text-amber-800 text-sm leading-relaxed">
                              {guidance}
                            </p>
                          ))}
                        </div>
                      </Card>
                    )}

                    {/* Smoking Guidance */}
                    {generatedPlan.lifestyleGuidance.smokingGuidance && (
                      <Card className="bg-red-50 border border-red-200 p-6">
                        <div className="flex items-start space-x-3 mb-4">
                          <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Heart className="w-5 h-5 text-white" />
                          </div>
                          <h4 className="font-heading text-red-800 text-lg font-bold uppercase tracking-wide">
                            Smoking & Health Guidance
                          </h4>
                        </div>
                        <div className="space-y-3">
                          {generatedPlan.lifestyleGuidance.smokingGuidance.map((guidance, index) => (
                            <p key={index} className="font-paragraph text-red-800 text-sm leading-relaxed">
                              {guidance}
                            </p>
                          ))}
                        </div>
                      </Card>
                    )}

                    {/* General Wellness */}
                    {generatedPlan.lifestyleGuidance.generalWellness && (
                      <Card className="bg-green-50 border border-green-200 p-6">
                        <div className="flex items-start space-x-3 mb-4">
                          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Shield className="w-5 h-5 text-white" />
                          </div>
                          <h4 className="font-heading text-green-800 text-lg font-bold uppercase tracking-wide">
                            Wellness & Recovery Support
                          </h4>
                        </div>
                        <div className="space-y-3">
                          {generatedPlan.lifestyleGuidance.generalWellness.map((guidance, index) => (
                            <p key={index} className="font-paragraph text-green-800 text-sm leading-relaxed">
                              {guidance}
                            </p>
                          ))}
                        </div>
                      </Card>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Utensils className="w-8 h-8 text-primary/60" />
                </div>
                <h3 className="font-heading text-buttontext text-xl font-bold uppercase mb-2 tracking-wide">
                  Your Custom Plan
                </h3>
                <p className="font-paragraph text-buttontext/60 text-sm">
                  Fill in your preferences to generate a personalized diet plan tailored to your goals.
                </p>
              </div>
            )}
          </Card>
        </div>

        {/* Body Type Information */}
        {selectedBodyType && (
          <div className="max-w-6xl mx-auto mt-12">
            <Card className="bg-buttonbackground border-0 p-8">
              {(() => {
                const bodyTypeData = bodyTypes.find(bt => bt.id === selectedBodyType);
                if (!bodyTypeData) return null;
                
                return (
                  <div>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-primary/10">
                        <Image
                          src={bodyTypeData.imageUrl}
                          alt={`${bodyTypeData.name} body type`}
                          width={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-heading text-buttontext text-2xl font-bold uppercase tracking-wide mb-1">
                          {bodyTypeData.name} Body Type
                        </h3>
                        <p className="font-paragraph text-buttontext/80 text-lg">
                          {bodyTypeData.description}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Characteristics */}
                      <div>
                        <h4 className="font-heading text-buttontext text-lg font-bold uppercase mb-3 tracking-wide flex items-center">
                          <User className="w-5 h-5 mr-2" />
                          Characteristics
                        </h4>
                        <ul className="space-y-2">
                          {bodyTypeData.characteristics.map((char, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                              <span className="font-paragraph text-buttontext/80 text-sm leading-relaxed">
                                {char}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Diet Tips */}
                      <div>
                        <h4 className="font-heading text-buttontext text-lg font-bold uppercase mb-3 tracking-wide flex items-center">
                          <Apple className="w-5 h-5 mr-2" />
                          Diet Tips
                        </h4>
                        <ul className="space-y-2">
                          {bodyTypeData.dietTips.map((tip, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                              <span className="font-paragraph text-buttontext/80 text-sm leading-relaxed">
                                {tip}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Workout Tips */}
                      <div>
                        <h4 className="font-heading text-buttontext text-lg font-bold uppercase mb-3 tracking-wide flex items-center">
                          <Activity className="w-5 h-5 mr-2" />
                          Workout Tips
                        </h4>
                        <ul className="space-y-2">
                          {bodyTypeData.workoutTips.map((tip, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                              <span className="font-paragraph text-buttontext/80 text-sm leading-relaxed">
                                {tip}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </Card>
          </div>
        )}

        {/* Additional Info */}
        <div className="max-w-6xl mx-auto mt-12">
          <Card className="bg-secondary border-0 p-8">
            <h3 className="font-heading text-secondary-foreground text-2xl font-bold uppercase mb-6 tracking-wide text-center">
              Why Personalized Nutrition Matters
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-highlightyellow rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-heading text-secondary-foreground font-bold text-sm uppercase mb-2 tracking-wide">
                  Goal-Specific
                </h4>
                <p className="font-paragraph text-secondary-foreground/80 text-sm leading-relaxed">
                  Each plan is tailored to your specific health and fitness goals for optimal results.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-highlightyellow" />
                </div>
                <h4 className="font-heading text-secondary-foreground font-bold text-sm uppercase mb-2 tracking-wide">
                  Lifestyle-Adapted
                </h4>
                <p className="font-paragraph text-secondary-foreground/80 text-sm leading-relaxed">
                  Plans consider your activity level and daily routine for sustainable success.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-buttonbackground rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Apple className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-heading text-secondary-foreground font-bold text-sm uppercase mb-2 tracking-wide">
                  Preference-Based
                </h4>
                <p className="font-paragraph text-secondary-foreground/80 text-sm leading-relaxed">
                  Accommodates dietary restrictions and preferences for better adherence.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-highlightyellow/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-highlightyellow" />
                </div>
                <h4 className="font-heading text-secondary-foreground font-bold text-sm uppercase mb-2 tracking-wide">
                  Body Type-Optimized
                </h4>
                <p className="font-paragraph text-secondary-foreground/80 text-sm leading-relaxed">
                  Considers your unique body type for more effective nutrition strategies.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Body Types Guide */}
        <div className="max-w-6xl mx-auto mt-16">
          <div className="text-center mb-12">
            <h2 className="font-heading text-highlightyellow text-4xl sm:text-5xl font-black uppercase mb-4 tracking-wide">
              Complete Body Types Guide
            </h2>
            <p className="font-paragraph text-secondary-foreground/80 text-lg max-w-2xl mx-auto">
              Understanding your body type is crucial for optimizing your nutrition and fitness approach. Each body type has unique characteristics and responds differently to diet and exercise.
            </p>
          </div>

          {/* Ectomorph Section */}
          <div className="mb-12">
            <Card className="bg-buttonbackground border-0 p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-primary/10">
                  <Image
                    src="https://static.wixstatic.com/media/55d98d_76fecf9df65c4338ad3bcca4d6513819~mv2.png?originWidth=128&originHeight=128"
                    alt="Ectomorph body type"
                    width={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-heading text-buttontext text-2xl font-bold uppercase tracking-wide mb-1">
                    Ectomorph Body Type
                  </h3>
                  <p className="font-paragraph text-buttontext/80 text-lg">
                    Naturally lean with fast metabolism
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Characteristics */}
                <div>
                  <h4 className="font-heading text-buttontext text-lg font-bold uppercase mb-3 tracking-wide flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Characteristics
                  </h4>
                  <ul className="space-y-2">
                    {[
                      'Thin, lean build',
                      'Fast metabolism',
                      'Difficulty gaining weight',
                      'Long limbs and narrow frame',
                      'Low body fat percentage'
                    ].map((char, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="font-paragraph text-buttontext/80 text-sm leading-relaxed">
                          {char}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Diet Tips */}
                <div>
                  <h4 className="font-heading text-buttontext text-lg font-bold uppercase mb-3 tracking-wide flex items-center">
                    <Apple className="w-5 h-5 mr-2" />
                    Diet Tips
                  </h4>
                  <ul className="space-y-2">
                    {[
                      'Eat frequently - 5-6 meals per day',
                      'Focus on calorie-dense foods',
                      'Include healthy fats like nuts, avocados, and oils',
                      'Consume 1.5-2g protein per kg body weight',
                      'Don\'t skip meals, especially breakfast',
                      'Include complex carbohydrates for sustained energy'
                    ].map((tip, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="font-paragraph text-buttontext/80 text-sm leading-relaxed">
                          {tip}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Workout Tips */}
                <div>
                  <h4 className="font-heading text-buttontext text-lg font-bold uppercase mb-3 tracking-wide flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Workout Tips
                  </h4>
                  <ul className="space-y-2">
                    {[
                      'Focus on compound movements',
                      'Limit cardio to 2-3 sessions per week',
                      'Prioritize strength training',
                      'Allow adequate rest between workouts',
                      'Keep workouts intense but shorter (45-60 minutes)'
                    ].map((tip, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="font-paragraph text-buttontext/80 text-sm leading-relaxed">
                          {tip}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          {/* Mesomorph Section */}
          <div className="mb-12">
            <Card className="bg-secondary border-0 p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-buttonbackground/10">
                  <Image
                    src="https://static.wixstatic.com/media/55d98d_0526082ea78a42a8931761f86729d818~mv2.png?originWidth=128&originHeight=128"
                    alt="Mesomorph body type"
                    width={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-heading text-secondary-foreground text-2xl font-bold uppercase tracking-wide mb-1">
                    Mesomorph Body Type
                  </h3>
                  <p className="font-paragraph text-secondary-foreground/80 text-lg">
                    Naturally muscular with balanced metabolism
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Characteristics */}
                <div>
                  <h4 className="font-heading text-secondary-foreground text-lg font-bold uppercase mb-3 tracking-wide flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Characteristics
                  </h4>
                  <ul className="space-y-2">
                    {[
                      'Athletic, muscular build',
                      'Balanced metabolism',
                      'Gains muscle easily',
                      'Medium bone structure',
                      'Responds well to exercise'
                    ].map((char, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-highlightyellow rounded-full mt-2 flex-shrink-0"></div>
                        <span className="font-paragraph text-secondary-foreground/80 text-sm leading-relaxed">
                          {char}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Diet Tips */}
                <div>
                  <h4 className="font-heading text-secondary-foreground text-lg font-bold uppercase mb-3 tracking-wide flex items-center">
                    <Apple className="w-5 h-5 mr-2" />
                    Diet Tips
                  </h4>
                  <ul className="space-y-2">
                    {[
                      'Balanced macronutrient ratio (40% carbs, 30% protein, 30% fat)',
                      'Eat 4-5 meals per day',
                      'Time carbohydrates around workouts',
                      'Include lean proteins with each meal',
                      'Stay hydrated and eat plenty of vegetables',
                      'Can handle moderate calorie cycling'
                    ].map((tip, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-highlightyellow rounded-full mt-2 flex-shrink-0"></div>
                        <span className="font-paragraph text-secondary-foreground/80 text-sm leading-relaxed">
                          {tip}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Workout Tips */}
                <div>
                  <h4 className="font-heading text-secondary-foreground text-lg font-bold uppercase mb-3 tracking-wide flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Workout Tips
                  </h4>
                  <ul className="space-y-2">
                    {[
                      'Combine strength training with cardio',
                      'Vary workout intensity and volume',
                      'Can handle higher training frequency',
                      'Mix compound and isolation exercises',
                      'Recovery is typically faster'
                    ].map((tip, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-highlightyellow rounded-full mt-2 flex-shrink-0"></div>
                        <span className="font-paragraph text-secondary-foreground/80 text-sm leading-relaxed">
                          {tip}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          {/* Endomorph Section */}
          <div className="mb-12">
            <Card className="bg-primary border-0 p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-highlightyellow/10">
                  <Image
                    src="https://static.wixstatic.com/media/55d98d_51d3f1be98254fc89d060c29787cd7b2~mv2.png?id=obese-male-endomorph"
                    alt="Endomorph body type"
                    width={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-heading text-primary-foreground text-2xl font-bold uppercase tracking-wide mb-1">
                    Endomorph Body Type
                  </h3>
                  <p className="font-paragraph text-primary-foreground/80 text-lg">
                    Naturally curvy with slower metabolism
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Characteristics */}
                <div>
                  <h4 className="font-heading text-primary-foreground text-lg font-bold uppercase mb-3 tracking-wide flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Characteristics
                  </h4>
                  <ul className="space-y-2">
                    {[
                      'Rounder, softer physique',
                      'Slower metabolism',
                      'Gains weight easily',
                      'Wider bone structure',
                      'Higher body fat percentage'
                    ].map((char, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-highlightyellow rounded-full mt-2 flex-shrink-0"></div>
                        <span className="font-paragraph text-primary-foreground/80 text-sm leading-relaxed">
                          {char}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Diet Tips */}
                <div>
                  <h4 className="font-heading text-primary-foreground text-lg font-bold uppercase mb-3 tracking-wide flex items-center">
                    <Apple className="w-5 h-5 mr-2" />
                    Diet Tips
                  </h4>
                  <ul className="space-y-2">
                    {[
                      'Focus on portion control',
                      'Emphasize protein and fiber',
                      'Limit refined carbohydrates',
                      'Eat smaller, more frequent meals',
                      'Choose low-glycemic index foods',
                      'Stay consistent with meal timing'
                    ].map((tip, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-highlightyellow rounded-full mt-2 flex-shrink-0"></div>
                        <span className="font-paragraph text-primary-foreground/80 text-sm leading-relaxed">
                          {tip}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Workout Tips */}
                <div>
                  <h4 className="font-heading text-primary-foreground text-lg font-bold uppercase mb-3 tracking-wide flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Workout Tips
                  </h4>
                  <ul className="space-y-2">
                    {[
                      'Include regular cardio (4-5 times per week)',
                      'Combine strength training with HIIT',
                      'Focus on full-body workouts',
                      'Maintain consistent exercise routine',
                      'Monitor progress with measurements, not just weight'
                    ].map((tip, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-highlightyellow rounded-full mt-2 flex-shrink-0"></div>
                        <span className="font-paragraph text-primary-foreground/80 text-sm leading-relaxed">
                          {tip}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
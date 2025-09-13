import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateDietPlan, generateHealthTips, chatWithAI } from "./services/gemini";
import { insertUserProfileSchema, insertChatSessionSchema, insertDietPlanSchema, insertBmiRecordSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // User Profile routes
  app.get("/api/profile/:userId", async (req, res) => {
    try {
      const profile = await storage.getUserProfile(req.params.userId);
      res.json(profile);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });

  app.post("/api/profile", async (req, res) => {
    try {
      const validatedData = insertUserProfileSchema.parse(req.body);
      const profile = await storage.createUserProfile(validatedData);
      res.json(profile);
    } catch (error) {
      res.status(400).json({ message: "Invalid profile data" });
    }
  });

  app.put("/api/profile/:userId", async (req, res) => {
    try {
      const validatedData = insertUserProfileSchema.partial().parse(req.body);
      const profile = await storage.updateUserProfile(req.params.userId, validatedData);
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      res.json(profile);
    } catch (error) {
      res.status(400).json({ message: "Invalid profile data" });
    }
  });

  // Chat routes
  app.get("/api/chat/:userId", async (req, res) => {
    try {
      const sessions = await storage.getChatSessionsByUser(req.params.userId);
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch chat sessions" });
    }
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const { userId, message } = req.body;
      
      // Get or create chat session
      let sessions = await storage.getChatSessionsByUser(userId);
      let currentSession = sessions[0];
      
      if (!currentSession) {
        currentSession = await storage.createChatSession({
          userId,
          messages: []
        });
      }

      // Add user message
      const messages = currentSession.messages || [];
      messages.push({
        role: 'user',
        content: message,
        timestamp: Date.now()
      });

      // Get AI response
      const aiResponse = await chatWithAI(message, userId);
      messages.push({
        role: 'ai',
        content: aiResponse,
        timestamp: Date.now()
      });

      // Update session
      await storage.updateChatSession(currentSession.id, messages);
      
      res.json({ response: aiResponse });
    } catch (error) {
      console.error('Chat error:', error);
      res.status(500).json({ message: "Failed to process chat message" });
    }
  });

  // Diet Plan routes
  app.get("/api/diet-plans/:userId", async (req, res) => {
    try {
      const plans = await storage.getDietPlansByUser(req.params.userId);
      res.json(plans);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch diet plans" });
    }
  });

  app.post("/api/diet-plans", async (req, res) => {
    try {
      const { userId, goal, dietType, allergies, activityLevel } = req.body;
      
      // Generate diet plan using AI
      const aiPlan = await generateDietPlan({
        goal,
        dietType,
        allergies,
        activityLevel
      });

      const dietPlan = await storage.createDietPlan({
        userId,
        goal,
        dietType,
        meals: aiPlan.meals,
        totalCalories: aiPlan.totalCalories
      });

      res.json(dietPlan);
    } catch (error) {
      console.error('Diet plan error:', error);
      res.status(500).json({ message: "Failed to generate diet plan" });
    }
  });

  // BMI routes
  app.get("/api/bmi/:userId", async (req, res) => {
    try {
      const records = await storage.getBmiRecordsByUser(req.params.userId);
      res.json(records);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch BMI records" });
    }
  });

  app.post("/api/bmi", async (req, res) => {
    try {
      const { userId, height, weight, age, gender } = req.body;
      
      // Calculate BMI
      const bmi = weight / Math.pow(height / 100, 2);
      
      // Determine category
      let category: string;
      if (bmi < 18.5) category = 'Underweight';
      else if (bmi < 25) category = 'Normal Weight';
      else if (bmi < 30) category = 'Overweight';
      else category = 'Obese';

      // Generate AI recommendations
      const recommendations = await generateHealthTips({
        bmi,
        category,
        age,
        gender,
        type: 'bmi'
      });

      const record = await storage.createBmiRecord({
        userId,
        height,
        weight,
        bmi: parseFloat(bmi.toFixed(1)),
        category,
        recommendations
      });

      res.json(record);
    } catch (error) {
      console.error('BMI calculation error:', error);
      res.status(500).json({ message: "Failed to calculate BMI" });
    }
  });

  // Health Tips route
  app.post("/api/health-tips", async (req, res) => {
    try {
      const { category, userProfile } = req.body;
      
      const tips = await generateHealthTips({
        type: category,
        userProfile
      });

      res.json({ tips });
    } catch (error) {
      console.error('Health tips error:', error);
      res.status(500).json({ message: "Failed to generate health tips" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

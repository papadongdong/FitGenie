import { type User, type InsertUser, type UserProfile, type InsertUserProfile, type ChatSession, type InsertChatSession, type DietPlan, type InsertDietPlan, type BmiRecord, type InsertBmiRecord } from "@shared/schema";
import { randomUUID } from "crypto";

// Type converter helpers for JSONB fields
function toStringArray(value: unknown): string[] | null {
  if (!value) return null;
  if (Array.isArray(value)) return value.filter(item => typeof item === 'string');
  return null;
}

function toChatMessages(value: unknown): Array<{role: 'user' | 'ai', content: string, timestamp: number}> | null {
  if (!value) return null;
  if (Array.isArray(value)) {
    return value.filter(item => 
      item && typeof item === 'object' && 
      'role' in item && 'content' in item && 'timestamp' in item &&
      (item.role === 'user' || item.role === 'ai') &&
      typeof item.content === 'string' && 
      typeof item.timestamp === 'number'
    );
  }
  return null;
}

function toMeals(value: unknown): Array<{name: string, food: string, calories: number}> | null {
  if (!value) return null;
  if (Array.isArray(value)) {
    return value.filter(item =>
      item && typeof item === 'object' &&
      'name' in item && 'food' in item && 'calories' in item &&
      typeof item.name === 'string' &&
      typeof item.food === 'string' &&
      typeof item.calories === 'number'
    );
  }
  return null;
}

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getUserProfile(userId: string): Promise<UserProfile | undefined>;
  createUserProfile(profile: InsertUserProfile): Promise<UserProfile>;
  updateUserProfile(userId: string, updates: Partial<InsertUserProfile>): Promise<UserProfile | undefined>;
  
  getChatSession(sessionId: string): Promise<ChatSession | undefined>;
  getChatSessionsByUser(userId: string): Promise<ChatSession[]>;
  createChatSession(session: InsertChatSession): Promise<ChatSession>;
  updateChatSession(sessionId: string, messages: Array<{role: 'user' | 'ai', content: string, timestamp: number}>): Promise<ChatSession | undefined>;
  
  getDietPlan(planId: string): Promise<DietPlan | undefined>;
  getDietPlansByUser(userId: string): Promise<DietPlan[]>;
  createDietPlan(plan: InsertDietPlan): Promise<DietPlan>;
  
  getBmiRecord(recordId: string): Promise<BmiRecord | undefined>;
  getBmiRecordsByUser(userId: string): Promise<BmiRecord[]>;
  createBmiRecord(record: InsertBmiRecord): Promise<BmiRecord>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private userProfiles: Map<string, UserProfile>;
  private chatSessions: Map<string, ChatSession>;
  private dietPlans: Map<string, DietPlan>;
  private bmiRecords: Map<string, BmiRecord>;

  constructor() {
    this.users = new Map();
    this.userProfiles = new Map();
    this.chatSessions = new Map();
    this.dietPlans = new Map();
    this.bmiRecords = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getUserProfile(userId: string): Promise<UserProfile | undefined> {
    return Array.from(this.userProfiles.values()).find(
      (profile) => profile.userId === userId,
    );
  }

  async createUserProfile(insertProfile: InsertUserProfile): Promise<UserProfile> {
    const id = randomUUID();
    const now = new Date();
    const profile: UserProfile = { 
      id, 
      createdAt: now,
      updatedAt: now,
      userId: insertProfile.userId,
      allergies: insertProfile.allergies || null,
      activityLevel: insertProfile.activityLevel || null,
      age: insertProfile.age || null,
      gender: insertProfile.gender || null,
      height: insertProfile.height || null,
      weight: insertProfile.weight || null,
      fitnessGoals: toStringArray(insertProfile.fitnessGoals),
      dietaryRestrictions: toStringArray(insertProfile.dietaryRestrictions)
    };
    this.userProfiles.set(id, profile);
    return profile;
  }

  async updateUserProfile(userId: string, updates: Partial<InsertUserProfile>): Promise<UserProfile | undefined> {
    const existing = await this.getUserProfile(userId);
    if (!existing) return undefined;
    
    const updated: UserProfile = {
      id: existing.id,
      createdAt: existing.createdAt,
      updatedAt: new Date(),
      userId: existing.userId,
      allergies: updates.allergies !== undefined ? updates.allergies || null : existing.allergies,
      activityLevel: updates.activityLevel !== undefined ? updates.activityLevel || null : existing.activityLevel,
      age: updates.age !== undefined ? updates.age || null : existing.age,
      gender: updates.gender !== undefined ? updates.gender || null : existing.gender,
      height: updates.height !== undefined ? updates.height || null : existing.height,
      weight: updates.weight !== undefined ? updates.weight || null : existing.weight,
      fitnessGoals: updates.fitnessGoals !== undefined ? toStringArray(updates.fitnessGoals) : existing.fitnessGoals,
      dietaryRestrictions: updates.dietaryRestrictions !== undefined ? toStringArray(updates.dietaryRestrictions) : existing.dietaryRestrictions
    };
    this.userProfiles.set(existing.id, updated);
    return updated;
  }

  async getChatSession(sessionId: string): Promise<ChatSession | undefined> {
    return this.chatSessions.get(sessionId);
  }

  async getChatSessionsByUser(userId: string): Promise<ChatSession[]> {
    return Array.from(this.chatSessions.values()).filter(
      (session) => session.userId === userId,
    );
  }

  async createChatSession(insertSession: InsertChatSession): Promise<ChatSession> {
    const id = randomUUID();
    const session: ChatSession = { 
      id, 
      createdAt: new Date(),
      userId: insertSession.userId || null,
      messages: toChatMessages(insertSession.messages)
    };
    this.chatSessions.set(id, session);
    return session;
  }

  async updateChatSession(sessionId: string, messages: Array<{role: 'user' | 'ai', content: string, timestamp: number}>): Promise<ChatSession | undefined> {
    const existing = this.chatSessions.get(sessionId);
    if (!existing) return undefined;
    
    const updated: ChatSession = {
      ...existing,
      messages,
    };
    this.chatSessions.set(sessionId, updated);
    return updated;
  }

  async getDietPlan(planId: string): Promise<DietPlan | undefined> {
    return this.dietPlans.get(planId);
  }

  async getDietPlansByUser(userId: string): Promise<DietPlan[]> {
    return Array.from(this.dietPlans.values()).filter(
      (plan) => plan.userId === userId,
    );
  }

  async createDietPlan(insertPlan: InsertDietPlan): Promise<DietPlan> {
    const id = randomUUID();
    const plan: DietPlan = { 
      id, 
      createdAt: new Date(),
      userId: insertPlan.userId || null,
      goal: insertPlan.goal,
      dietType: insertPlan.dietType || null,
      meals: toMeals(insertPlan.meals),
      totalCalories: insertPlan.totalCalories || null
    };
    this.dietPlans.set(id, plan);
    return plan;
  }

  async getBmiRecord(recordId: string): Promise<BmiRecord | undefined> {
    return this.bmiRecords.get(recordId);
  }

  async getBmiRecordsByUser(userId: string): Promise<BmiRecord[]> {
    return Array.from(this.bmiRecords.values()).filter(
      (record) => record.userId === userId,
    );
  }

  async createBmiRecord(insertRecord: InsertBmiRecord): Promise<BmiRecord> {
    const id = randomUUID();
    const record: BmiRecord = { 
      id, 
      createdAt: new Date(),
      userId: insertRecord.userId || null,
      height: insertRecord.height,
      weight: insertRecord.weight,
      bmi: insertRecord.bmi,
      category: insertRecord.category,
      recommendations: toStringArray(insertRecord.recommendations)
    };
    this.bmiRecords.set(id, record);
    return record;
  }
}

export const storage = new MemStorage();

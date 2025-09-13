import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, real, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const userProfiles = pgTable("user_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  age: integer("age"),
  gender: text("gender"),
  height: real("height"), // in cm
  weight: real("weight"), // in kg
  activityLevel: text("activity_level"),
  fitnessGoals: jsonb("fitness_goals").$type<string[]>(),
  dietaryRestrictions: jsonb("dietary_restrictions").$type<string[]>(),
  allergies: text("allergies"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const chatSessions = pgTable("chat_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  messages: jsonb("messages").$type<Array<{role: 'user' | 'ai', content: string, timestamp: number}>>(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const dietPlans = pgTable("diet_plans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  goal: text("goal").notNull(),
  dietType: text("diet_type"),
  meals: jsonb("meals").$type<Array<{name: string, food: string, calories: number}>>(),
  totalCalories: integer("total_calories"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const bmiRecords = pgTable("bmi_records", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  height: real("height").notNull(),
  weight: real("weight").notNull(),
  bmi: real("bmi").notNull(),
  category: text("category").notNull(),
  recommendations: jsonb("recommendations").$type<string[]>(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertUserProfileSchema = createInsertSchema(userProfiles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertChatSessionSchema = createInsertSchema(chatSessions).omit({
  id: true,
  createdAt: true,
});

export const insertDietPlanSchema = createInsertSchema(dietPlans).omit({
  id: true,
  createdAt: true,
});

export const insertBmiRecordSchema = createInsertSchema(bmiRecords).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;
export type UserProfile = typeof userProfiles.$inferSelect;
export type InsertChatSession = z.infer<typeof insertChatSessionSchema>;
export type ChatSession = typeof chatSessions.$inferSelect;
export type InsertDietPlan = z.infer<typeof insertDietPlanSchema>;
export type DietPlan = typeof dietPlans.$inferSelect;
export type InsertBmiRecord = z.infer<typeof insertBmiRecordSchema>;
export type BmiRecord = typeof bmiRecords.$inferSelect;

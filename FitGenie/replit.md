# FitGenius AI - Health & Fitness Application

## Overview

FitGenius AI is a comprehensive health and fitness web application that provides personalized AI-powered guidance for users' wellness journeys. The application offers BMI calculation, diet planning, health tips, and interactive chat functionality with an AI fitness coach. Built with a modern full-stack architecture, it combines React frontend with Express.js backend and integrates Google's Gemini AI for intelligent health recommendations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript and Vite build system
- **UI Library**: Shadcn/UI components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system featuring dark theme
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Component Structure**: Modular component architecture with reusable UI components

### Backend Architecture
- **Runtime**: Node.js with Express.js server framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API endpoints for user profiles, chat, BMI calculations, and diet plans
- **Request Handling**: JSON-based API with comprehensive error handling and logging middleware
- **Development Setup**: Hot reload with Vite integration for seamless development experience

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Local Storage**: Browser localStorage for client-side user profile caching
- **Data Types**: JSONB columns for flexible data structures (fitness goals, dietary restrictions, chat messages)

### AI Integration
- **AI Provider**: Google Gemini AI (gemini-2.5-flash model)
- **Use Cases**: Personalized chat responses, diet plan generation, health tips creation, and BMI recommendations
- **System Prompts**: Specialized prompts for fitness coaching context
- **Safety**: Built-in recommendations to consult healthcare professionals for medical concerns

### Authentication & User Management
- **Current State**: Guest-based system for demonstration purposes
- **User Profiles**: Comprehensive user data including age, gender, height, weight, activity level, fitness goals, and dietary restrictions
- **Data Persistence**: User profiles stored in PostgreSQL with local caching

## External Dependencies

### Core Dependencies
- **@google/genai**: Google Gemini AI integration for intelligent responses
- **@neondatabase/serverless**: Neon Database serverless PostgreSQL client
- **drizzle-orm** & **drizzle-zod**: Type-safe ORM with Zod schema validation
- **@tanstack/react-query**: Server state management and caching

### UI & Styling
- **@radix-ui/react-***: Complete set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Modern icon library

### Form & Validation
- **react-hook-form** & **@hookform/resolvers**: Form management with validation
- **zod**: Runtime type validation and schema definition

### Development Tools
- **vite**: Fast build tool and development server
- **typescript**: Type safety and enhanced developer experience
- **@replit/vite-plugin-***: Replit-specific development enhancements
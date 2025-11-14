# MANGO - Mangrove Forest Chatbot

## Overview

MANGO is an educational chatbot web application focused on teaching users about mangrove forests. The application provides an interactive, nature-themed chat interface where users can ask questions about mangrove flora, fauna, economic importance, tourism opportunities, and ecological benefits. The bot uses a knowledge-based system to provide educational responses and politely declines questions outside the mangrove forest domain.

The project is designed as a modern single-page application (SPA) with a clean, immersive chat experience inspired by WhatsApp Web, Telegram, Duolingo, and nature-focused platforms like National Geographic.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18+ with TypeScript for type-safe component development
- Vite as the build tool and development server
- Single-page application (SPA) architecture using Wouter for client-side routing

**UI Component Strategy:**
- Shadcn/ui component library (Radix UI primitives) for accessible, customizable components
- Tailwind CSS for utility-first styling with custom design tokens
- Design system follows "new-york" style preset with custom theme variables
- Component composition pattern using the @radix-ui/react-slot for flexible component APIs

**State Management:**
- TanStack Query (React Query) for server state management and API caching
- Local React state (useState) for UI-specific state like messages, typing indicators, and theme
- No global state management library needed due to simple data flow

**Styling Architecture:**
- Custom CSS variables for theming (light/dark mode support via CSS classes)
- Tailwind configuration extends base theme with custom colors, spacing, and border radius values
- Font system uses Inter for UI elements and Poppins for display text
- Animation system includes custom keyframes for typing indicators, fade-ins, and message slide-ins

**Chat Interface Design:**
- Fixed three-section layout: header (80px), scrollable chat area, input zone (120px)
- Message bubbles differentiated by sender (user: right-aligned, bot: left-aligned with avatar, system: centered)
- Typing animation effect that displays bot responses word-by-word
- Auto-scroll to bottom on new messages
- Welcome screen with sample questions for user guidance

### Backend Architecture

**Server Framework:**
- Express.js REST API server
- ESM module system (type: "module" in package.json)
- TypeScript for type safety across server codebase

**API Design:**
- RESTful endpoint: POST `/api/chat` for message processing
- Request/response validation using Zod schemas
- JSON-based communication with structured error handling

**Knowledge Base System:**
- Static knowledge base stored as an array of typed entries
- Each entry contains: category (enum), keywords (array), answer (string)
- Keyword-based matching algorithm to find relevant answers
- Categories: flora, fauna, economic, tourism, ecological, general
- Relevance detection returns both answer and isRelevant flag

**Request Processing Flow:**
1. Receive user message via POST request
2. Validate request body against chatRequestSchema
3. Search knowledge base using keyword matching (findRelevantAnswer function)
4. Return structured response with message, sender type, and relevance indicator
5. Client applies typing animation and displays response

**Development Tools:**
- Vite middleware mode for HMR during development
- Custom logging middleware for API request tracking
- Runtime error overlay plugin for development environment

### Data Storage

**Current Implementation:**
- In-memory storage using Map data structures (MemStorage class)
- User schema defined but not actively used (legacy from template)
- No persistent database currently implemented
- Knowledge base hardcoded in server/knowledge-base.ts

**Database Schema (Configured but Not Active):**
- Drizzle ORM configured for PostgreSQL
- Database URL expected from environment variables
- Migration directory structure in place (./migrations)
- Schema definitions in shared/schema.ts using Zod for validation

**Data Models:**
- Message: id, content, sender (user|bot|system), timestamp
- ChatRequest: message string with minimum length validation
- ChatResponse: message, sender, isRelevant boolean
- KnowledgeEntry: category, keywords array, answer
- User: id, username (defined but unused in current implementation)

### External Dependencies

**Third-Party UI Libraries:**
- @radix-ui/react-* components (20+ primitives for accessible UI components)
- class-variance-authority for variant-based component styling
- cmdk for command menu functionality
- embla-carousel-react for carousel components
- lucide-react for icon system

**Database & ORM:**
- @neondatabase/serverless for PostgreSQL serverless driver
- drizzle-orm and drizzle-kit for database schema and migrations
- drizzle-zod for automatic Zod schema generation from database schemas
- connect-pg-simple for PostgreSQL session storage (configured but not used)

**Validation & Forms:**
- Zod for runtime schema validation and TypeScript type inference
- @hookform/resolvers for integrating validation with React Hook Form
- react-hook-form for form state management (available but not actively used)

**Development Tools:**
- @replit/vite-plugin-runtime-error-modal for error overlay
- @replit/vite-plugin-cartographer and dev-banner for Replit-specific development features
- tsx for running TypeScript files directly in development
- esbuild for production bundling of server code

**Utilities:**
- date-fns for date formatting and manipulation
- clsx and tailwind-merge for conditional className composition
- nanoid for generating unique IDs

**Fonts:**
- Google Fonts: Inter (400, 500, 600, 700) for interface text
- Google Fonts: Poppins (500, 600, 700) for display/accent text

**Build & Deployment:**
- Vite for frontend bundling and development server
- esbuild for server-side bundling (ESM format, external packages)
- PostCSS with Tailwind CSS and Autoprefixer for CSS processing
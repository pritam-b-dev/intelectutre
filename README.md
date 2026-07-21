# Intelecture — Client (Frontend)

AI-powered learning and knowledge management platform. Users create learning topics, break them into concepts, track mastery progress, and get help from two AI-driven features: a smart recommendation engine and a context-aware AI tutor chat.

**Live site:** `<https://intelectutre.vercel.app>`

## Demo Credentials

- **User:** `<demo@intelecture.com>` / `<Password123>`

## Features

- **Authentication** — Email/password sign up & sign in via BetterAuth, session-based (cookie), protected routes.
- **Explore** — Public listing of all topics with category filter and sort.
- **Topics & Concepts** — Create topics, add concepts under each topic with a difficulty rating, track status (Not Started / Learning / Mastered).
- **AI Recommendation Engine** — Dashboard surfaces the next concepts a user should study, based on difficulty and current progress, with a short reason for each suggestion.
- **AI Tutor Chat** — Per-concept chat assistant (powered by Groq/Llama) that answers questions with context from the concept and prior conversation history.
- **Progress Dashboard** — Stats cards (topics, concepts, mastered count) and a Recharts pie chart of overall progress.
- **Dark theme**, fully responsive.

## Tech Stack

- Next.js 15 (App Router) + TypeScript
- Node.js + Express + TypeScript
- Groq (Llama 3.3 70B) for the AI tutor chat
- Tailwind CSS
- BetterAuth (client)
- MongoDB (native driver, no ORM)
- Recharts

## Project Structure

```
src/
├── app/
│   ├── (auth)/          # signin, signup
│   ├── (marketing)/     # landing page
│   ├── explore/         # public topic listing
│   ├── topics/          # add, manage, [id] detail, [id]/add-concept
│   ├── concepts/[id]/   # concept detail + AI chat
│   ├── chat/            # AI chat hub (pick a topic → concept to chat about)
│   └── dashboard/       # stats, chart, recommendations
├── components/
│   ├── layout/          # NavBar, etc.
│   └── dashboard/       # ProgressChart (Recharts)
├── lib/
│   ├── core/            # server.ts (fetch helpers), session.ts
│   ├── api/             # typed fetch wrappers per resource
│   └── auth-client.ts
└── types/index.ts       # shared TypeScript interfaces
```

## Getting Started for Frontend

```bash
npm install
```

Create `.env.local`:

```
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
```

```bash
npm run dev
```

Runs on `http://localhost:3000`. Requires the [server](<PASTE SERVER REPO LINK>) running locally or deployed and reachable at the URL above.

## Getting Started for Backend

```
MONGODB_URI=<your mongodb connection string>
PORT=5000
CLIENT_URL=http://localhost:3000
BETTER_AUTH_SECRET=<random secret string>
BETTER_AUTH_URL=http://localhost:5000
GROQ_API_KEY=<your groq api key from console.groq.com>
```

```bash
npm run dev
```

## Data Model (MongoDB collections)

- `users`, `sessions` — managed by BetterAuth
- `topics` — `{name, description, category, ownerId, ownerName, conceptCount, masteredCount}`
- `concepts` — `{topicId, name, description, difficulty (1-5), status}`
- `notes` — `{conceptId, userId, title, content, status}`
- `chatHistory` — `{userId, conceptId, role, message, timestamp}`

## Notes

- All API calls go through `lib/core/server.ts` (`serverFetch` for public GET, `protectedFetch`/`serverMutation` for authenticated requests — these forward the session cookie to the backend).
- The AI chat is scoped per concept, not a single global thread — open any concept page to talk to the tutor about that specific topic.
- Authentication is session-cookie based (no JWT) — `verifySession` middleware reads the session cookie via BetterAuth on every protected route.
- The recommendation engine is logic-based (sorts the user's unmastered concepts by difficulty), not an LLM call — kept deterministic and fast.
- The chat endpoint calls Groq's Llama 3.3 70B model with the concept's description as system context plus the last 10 messages for conversational memory.

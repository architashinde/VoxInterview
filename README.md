# VoxInterview

An AI-powered mock interview platform. Practice technical and behavioral interviews with a voice AI interviewer and get instant, structured feedback.

[Live Demo](https://vox-interview.vercel.app/) · Built with Next.js, Firebase, and Vapi AI

## Features

- Firebase Authentication (email/password sign-up & sign-in)
- Voice-based mock interviews powered by [Vapi AI](https://vapi.ai)
- AI-generated interview questions tailored to role, tech stack, and experience level (Google Gemini)
- Automated feedback after each interview — category scores, strengths, and areas for improvement
- Dashboard of past interviews and new interviews to take

## Tech Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Auth & Database:** Firebase (Auth, Firestore) — client SDK + Admin SDK
- **Voice AI:** Vapi AI
- **LLM:** Google Gemini via the Vercel AI SDK
- **Forms:** React Hook Form + Zod

## Getting Started

### 1. Clone and install

```bash
git clone <repo-url>
cd voxinterview
npm install
```

### 2. Set environment variables

Create a `.env.local` file in the project root:

```env
# Firebase client (public)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

# Firebase Admin (server-only — from your service account JSON)
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

# Vapi
NEXT_PUBLIC_VAPI_WEB_TOKEN=
NEXT_PUBLIC_VAPI_WORKFLOW_ID=

# Google AI (Gemini)
GOOGLE_GENERATIVE_AI_API_KEY=
```

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

Deployed on [Vercel](https://vercel.com).

- Set the **Node.js Version** to `22.x` in Project Settings → General (required by `firebase-admin`'s dependency chain).
- Add every environment variable from above under Project Settings → Environment Variables.

## Project Structure

```
app/            # Routes (App Router) — auth, dashboard, interview flow
components/     # UI components (incl. shadcn/ui primitives)
firebase/       # Client & Admin Firebase setup
lib/actions/    # Server actions (auth, interview/feedback generation)
constants/      # Interviewer config, tech icon mappings, feedback schema
```

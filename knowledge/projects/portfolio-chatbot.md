# Portfolio Chatbot
**When:** 2026  
**Role:** Solo developer

## What it is
An AI-powered interactive portfolio that lets visitors explore my professional background through natural conversation instead of scrolling a static page.

## Tech stack
- **Next.js 16** with App Router and React 19
- **AI SDK v6** with Vercel AI Gateway for model routing
- **Assistant UI** for chat primitives
- **RetroUI** (neobrutalist component library) for UI
- **Tailwind CSS v4** for styling
- **Zustand** for state management

## Architecture highlights
- Thread-based conversation model with prepopulated guided tours
- Tiered query handling: keyword match → tool lookup → LLM fallback
- Off-topic guard rails to minimize LLM costs on public deployments
- Zero-auth public access with graceful degradation

## What I learned
- AI SDK streaming patterns and tool integration
- Container query responsive design with Tailwind v4
- Cost optimization strategies for public-facing AI applications

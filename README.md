# Chemistry Study Buddy, Backend

A small Node.js and Express server that acts as a private proxy between the [Chemistry Study Buddy frontend](https://github.com/hilary-aoao/chemistry-study-buddy) and the Groq API.

**Live service:** https://naija-study-buddy-api.onrender.com

## Why this exists

The frontend is a static site (HTML, CSS, JavaScript) hosted on GitHub Pages, with no server of its own. Calling an AI API directly from the browser would mean exposing a real API key to anyone who opens the page's source code. This server solves that: it holds the real Groq API key privately, as an environment variable, and the frontend talks to this server instead of Groq directly. Visitors to the live app never see, need, or provide any API key at all.

```
Browser (frontend, GitHub Pages)
   |
   |  POST /chat  { model, messages }
   v
This server (Render)
   |
   |  attaches the real API key
   v
Groq API
```

## What it does

One route, `/chat`, accepts a `model` name and a `messages` array (the same shape the Groq API itself expects), attaches the real API key server side, forwards the request to Groq, and returns the response as is.

## Tech stack

- Node.js, Express
- `cors`, so the frontend (a different origin) is allowed to call this server
- `dotenv`, for loading the API key locally during development

## Running it locally

1. Clone this repo
2. Run `npm install`
3. Create a `.env` file in the root with:
   ```
   GROQ_API_KEY=your_own_key_here
   ```
4. Run `node server.js`
5. Visit `http://localhost:3000` to confirm it says "Server is running. Key loaded"

`.env` is excluded via `.gitignore` and should never be committed.

## Deployment

Deployed on Render, with `GROQ_API_KEY` set as an environment variable in the Render dashboard, not in the code. Render assigns the port automatically via its own `PORT` environment variable, which the server reads at startup.

## Known limitation

Render's free tier spins the service down after a period of inactivity. The first request after idle time will be noticeably slower while it restarts.

## License

© 2026 Hilary Orefo. All rights reserved.

This project is shared publicly as a portfolio piece demonstrating full-stack development, retrieval system design, and applied prompt engineering. The code, dataset, and content are not licensed for reuse, redistribution, or commercial use without explicit permission from the author.

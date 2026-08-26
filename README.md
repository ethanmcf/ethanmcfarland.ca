# ethanmcfarland.ca

Personal website. React + Vite frontend.

## Env

Create a `.env` in the project root with:

```
VITE_WORKER_URL=<url of the deployed contact-form Cloudflare Worker>
```

That's the only variable this repo needs. Everything else (Resend API key,
rate limit config) lives in the Worker's own environment, not here.

## How the contact form works

1. The Contact Me tab in the terminal UI POSTs `{ email, message }` to `VITE_WORKER_URL`.
2. That URL is a Cloudflare Worker (separate project, not in this repo) that:
   - Rate limits requests and returns `429` if you're sending too fast — the
     frontend catches that status and shows a "too many messages" error.
   - Calls the Resend API to actually send the email.
3. The frontend only ever talks to the Worker. It never calls Resend directly,
   so no Resend API key is exposed to the browser.

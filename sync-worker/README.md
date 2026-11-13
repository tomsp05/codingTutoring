# Sync Worker

A tiny Cloudflare Worker that lets Builder's Quest progress follow you between computers. It runs on Cloudflare's free plan (100,000 requests a day; a lesson uses a few hundred).

There are no accounts. Turning sync on in the page makes a random 16-character **sync code**; typing the same code on another computer links them. The code works like a password, so keep it private. The Worker stores each code's progress in its own Durable Object, named by a hash of the code.

## Set it up (about 5 minutes, once)

You need a free Cloudflare account (the one that already runs your domain is fine) and Node.js.

1. In a terminal, from this `sync-worker` folder:

   ```bash
   npx wrangler login
   ```

   ```bash
   npx wrangler deploy
   ```

   The deploy prints the Worker's address, like `https://builders-quest-sync.<your-account>.workers.dev`.

2. In `index.html`, set that address:

   ```js
   const SYNC_URL = "https://builders-quest-sync.<your-account>.workers.dev";
   ```

   Commit and push. The Grown-ups tab now shows **Turn on sync**.

3. (Optional, tidier) In `wrangler.toml` set `ALLOWED_ORIGINS` to your site's address, for example `"https://quest.example.com"`, and run `npx wrangler deploy` again. Then only your site can call the Worker from a browser.

## Using it

- On the first computer: Grown-ups › **Turn on sync**. It shows the code.
- On another computer: open the site, Grown-ups, type the code, **Use code**.
- Progress still saves in each browser first, so the page keeps working offline and catches up when it's back online. Download backup / Load backup still work as before.
- If two computers change things at the same time, the one that saved first wins and the other shows "Updated with newer progress from another device".

## Try it locally

```bash
npx wrangler dev
```

Then set `SYNC_URL` to `http://127.0.0.1:8787` in a local copy of the page.

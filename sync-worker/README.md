# Sync Worker

A tiny Cloudflare Worker that lets Builder's Quest progress follow you between computers. It runs on Cloudflare's free plan (100,000 requests a day; a lesson uses a few hundred).

Progress belongs to a **profile**: a name plus a password typed in the Grown-ups tab. The page turns the name and password into a long key in the browser (PBKDF2) and only sends that key, so the server never sees the password and there are no accounts to manage. The same name and password on any computer open the same progress. A wrong password simply looks like a new, empty profile. The Worker stores each key's progress in its own Durable Object, named by a hash of the key.

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

   Commit and push. The Grown-ups tab now shows a profile sign-in.

3. (Optional, tidier) In `wrangler.toml` set `ALLOWED_ORIGINS` to your site's address, for example `"https://quest.example.com"`, and run `npx wrangler deploy` again. Then only your site can call the Worker from a browser.

## Using it

- Grown-ups › type a profile name and password › **Sign in**. A new name makes a new profile, which starts with whatever progress is on that computer.
- On another computer: same name and password, **Sign in**.
- **Log out** clears the progress from that computer (it stays saved online) so someone else can sign in.
- Progress still saves in each browser first, so the page keeps working offline and catches up when it's back online. Download backup / Load backup still work as before.
- If two computers change things at the same time, the one that saved first wins and the other shows "Updated with newer progress from another computer".

## Try it locally

```bash
npx wrangler dev
```

Then set `SYNC_URL` to `http://127.0.0.1:8787` in a local copy of the page.

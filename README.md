# Builder's Quest

A gamified lesson tracker for a 20-session, one-to-one Roblox Studio course (Year 4, SEN). One HTML file, no build step, no server.

## What's in it

- **Mission:** runs the hour live. Each session is split into the 5 routine stages (Warm-up, Show me, Build time, Play test, Win and wrap) and about 20 small goals, each with a rough time. The learner only sees the goal they're on. There's a stage timer, a movement break screen, and a boss on sessions 5, 10, 15 and 20.
- **Game choice:** after session 15 the learner picks one of 5 games for sessions 16 to 20: Obby Adventure, Coin Hunt Island, Race Track, Tower Climb or Maze Escape.
- **Map, Badges:** the 20-stone quest map, titles, badge shelf and the rewards you get every 50 XP.
- **Grown-ups:** the full lesson plan for any session, with goals you can edit, hide or add. Also session notes, a table of all 20 sessions, reward names, undo and reset.

## Put it on GitHub Pages

1. Make a new repo (or use an existing one) and copy this folder's files into it: `index.html`, `README.md` and `.nojekyll`.
2. Push to GitHub.
3. On GitHub go to **Settings › Pages**. Under "Build and deployment" pick **Deploy from a branch**, then your branch (usually `main`) and `/ (root)`. Save.
4. After a minute the site is live at `https://<your-username>.github.io/<repo-name>/`.

If you put the folder inside a bigger repo, the address becomes `.../<repo-name>/builders-quest/`.

## Where progress is saved

Progress always saves in the browser you use (localStorage). It stays there between sessions on that device and browser, but clearing browser data wipes it.

**To use it on more than one computer, turn on sync.** Once the small sync Worker is set up (see [`sync-worker/README.md`](sync-worker/README.md), free, about 5 minutes), the Grown-ups tab shows **Turn on sync**. That gives you a 16-character sync code. Type the same code on any other computer and progress follows you. It still saves locally first, so it works offline and catches up later.

You can also go to **Grown-ups**, scroll to the bottom and press **Download backup**, then **Load backup** on another device.

(The claude.ai version of the page saves online instead, so it doesn't show these buttons.)

## Changing the content

Everything lives in `index.html`:

- `MISSIONS`: the 20 sessions (name, "I can…" goal, badge, bonus).
- `PLAN` and `STD`: the goals for each stage, as `[text, minutes, grown-up tip]`.
- `PATHS`: the 5 game types and their goals for sessions 16 to 20.
- `BOSSES`: boss names and lines.

You can also edit goals inside the page (Grown-ups › Edit goals). Those edits are saved with the progress, not in the file.

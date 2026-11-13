# Builder's Quest

A gamified lesson tracker for a 20-session, one-to-one Roblox Studio course (Year 4, SEN). One HTML file, no build step, no server.

## What's in it

- **Mission:** runs the hour live. Each session is split into the 5 routine stages (Warm-up, Show me, Build time, Play test, Win and wrap) and about 20 small goals, each with a rough time. The learner only sees the goal they're on. There's a stage timer, a movement break screen, and a boss on sessions 5, 10, 15 and 20.
- **One game, built up all course:** session 1 is the welcome (with an optional "what would you like to make?" pick). At the start of session 2 the learner picks their game type (Obby Adventure, Coin Hunt Island, Race Track, Tower Climb or Maze Escape) and a world (theme), then starts it from a blank Baseplate. Every session after that adds one new skill to the same game. All five types learn the same skill in the same session; only the Build time goals change where the build differs (sessions 2, 3, 5, 9, 14 and 15). After the session 15 boss they pick a star feature, which gets its own goal in sessions 16 to 20.
- **Map:** three islands with a gold trail that grows as goals get ticked, a progress ring round every stone, the little builder standing on the current stone, flags for titles, their game on Creator Peak, and progress bars for the whole quest and each island.
- **Badges:** titles, badge shelf and the rewards you get every 50 XP.
- **Grown-ups:** the full lesson plan for any session, with goals you can edit, hide or add. Also session notes, a table of all 20 sessions, reward names, undo and reset.

## Put it on GitHub Pages

1. Make a new repo (or use an existing one) and copy this folder's files into it: `index.html`, `README.md`, `robots.txt` and `.nojekyll`.
2. Push to GitHub.
3. On GitHub go to **Settings › Pages**. Under "Build and deployment" pick **Deploy from a branch**, then your branch (usually `main`) and `/ (root)`. Save.
4. After a minute the site is live at `https://<your-username>.github.io/<repo-name>/`.

If you put the folder inside a bigger repo, the address becomes `.../<repo-name>/builders-quest/`.

## Password

The hosted site opens with a password screen. On the first visit the learner makes their own password (at least 3 letters). After that it asks for it each time a new tab is opened. The grown-up password `TomAdmin` always works, and **Grown-ups › Change the password** lets the learner pick a new one.

This is a light barrier, not real security. It's all checked in the browser, so it stops bots and casual visitors but not someone who reads the code. The learner's password is saved in that browser only, so on a new device or after clearing browser data they'll be asked to make one again. `robots.txt` and a `noindex` tag also ask search engines to stay away. The claude.ai copy skips the password because it's already private.

## Where progress is saved

Progress always saves in the browser you use (localStorage). It stays there between sessions on that device and browser, but clearing browser data wipes it.

**To use it on more than one computer, turn on sync.** Once the small sync Worker is set up (see [`sync-worker/README.md`](sync-worker/README.md), free, about 5 minutes), the Grown-ups tab shows **Turn on sync**. That gives you a 16-character sync code. Type the same code on any other computer and progress follows you. It still saves locally first, so it works offline and catches up later.

You can also go to **Grown-ups**, scroll to the bottom and press **Download backup**, then **Load backup** on another device.

(The claude.ai version of the page saves online instead, so it doesn't show these buttons.)

## Changing the content

Everything lives in `index.html`:

- `MISSIONS`: the 20 sessions (name, "I can…" goal, badge, bonus).
- `PLAN` and `STD`: the goals for each stage, as `[text, minutes, grown-up tip]`.
- `PATHS`: the 5 game types and the Build time goals that differ for each (sessions 2, 3, 5, 9, 14 and 15).
- `THEMES`, `FEATURES`: the worlds and the star features for each game type.
- `BOSSES`: boss names and lines.

You can also edit goals inside the page (Grown-ups › Edit goals). Those edits are saved with the progress, not in the file.

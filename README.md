# Builder's Quest

A gamified lesson tracker for a 20-session, one-to-one Roblox Studio course (Year 4, SEN). One HTML file, no build step, no server.

## What's in it

- **Mission:** runs the hour live. Each session is split into the 5 routine stages (Warm-up, Show me, Build time, Play test, Win and wrap) and about 20 small goals, each with a rough time. The learner only sees the goal they're on. There's a stage timer, a movement break screen, and a boss on sessions 5, 10, 15 and 20.
- **Dream game:** before session 1 the learner picks the game they dream of making (Obby Adventure, Coin Hunt Island, Race Track, Tower Climb, Maze Escape) or "Not sure yet". Every session from 1 to 15 then gets one extra Build time goal that uses that day's skill for their dream game ("Not sure yet" rotates through all five). The core goals don't change, so they still learn every skill.
- **Refining it:** at session 6 they pick a world (theme). After the session 15 boss they pick their final game (the dream one is top of the list), confirm the world and choose a star feature, which gets its own goal in sessions 16 to 20.
- **Map:** three islands with a gold trail that grows as goals get ticked, a progress ring round every stone, the little builder standing on the current stone, flags for titles, their dream game on Creator Peak, and progress bars for the whole quest and each island.
- **Badges:** titles, badge shelf and the rewards you get every 50 XP.
- **Grown-ups:** the full lesson plan for any session, with goals you can edit, hide or add. Also session notes, a table of all 20 sessions, reward names, undo and reset.

## Put it on GitHub Pages

1. Make a new repo (or use an existing one) and copy this folder's files into it: `index.html`, `README.md` and `.nojekyll`.
2. Push to GitHub.
3. On GitHub go to **Settings › Pages**. Under "Build and deployment" pick **Deploy from a branch**, then your branch (usually `main`) and `/ (root)`. Save.
4. After a minute the site is live at `https://<your-username>.github.io/<repo-name>/`.

If you put the folder inside a bigger repo, the address becomes `.../<repo-name>/builders-quest/`.

## Where progress is saved

On GitHub Pages, progress saves in the browser you use (localStorage). It stays there between sessions on that device and browser, but it doesn't move between devices, and clearing browser data wipes it.

To keep it safe or move it to another device, go to **Grown-ups**, scroll to the bottom and press **Download backup**. To carry on somewhere else, open the site there and press **Load backup**.

(The claude.ai version of the page saves online instead, so it doesn't show the backup buttons.)

## Changing the content

Everything lives in `index.html`:

- `MISSIONS`: the 20 sessions (name, "I can…" goal, badge, bonus).
- `PLAN` and `STD`: the goals for each stage, as `[text, minutes, grown-up tip]`.
- `PATHS`: the 5 game types and their goals for sessions 16 to 20.
- `DREAM_LINKS`, `THEMES`, `FEATURES`: the dream game goals for sessions 1 to 15, the worlds and the star features.
- `BOSSES`: boss names and lines.

You can also edit goals inside the page (Grown-ups › Edit goals). Those edits are saved with the progress, not in the file.

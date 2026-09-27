# Freshers Party Invitation — Deploy to Vercel

## Files in this project
- `index.html` — the page
- `style.css` — styling
- `script.js` — name gate, music, lightbox logic
- `assets/invitation.jpg` — your invitation card image

## About the music
I can't include the actual "A Thousand Years" recording — it's a
copyrighted commercial track, and reproducing or sourcing copyrighted
audio isn't something I'm able to do.

The page is wired to play `assets/song.mp3` as soon as a guest enters
their name. To use an instrumental version of that song (or any song):

1. Get a copy you're licensed to use — for example, a purchased
   instrumental/cover version, or a track from a service you have
   rights to (Epidemic Sound, Artlist, etc.).
2. Rename the file to `song.mp3`.
3. Drop it into the `assets` folder, replacing nothing (there's no
   placeholder file — just add it).
4. Redeploy.

If `assets/song.mp3` is missing, the page automatically falls back to
a soft ambient tone generated in the browser, so the site still works
without it.

## Deploy to Vercel
1. Go to vercel.com and sign up (free for personal projects).
2. From the dashboard, click **Add New → Project**.
3. Choose **Deploy without Git**, then drag this whole folder
   (`freshers-invite`) into the upload area — keep the `assets`
   subfolder inside it.
4. Click **Deploy**. Vercel serves it as a static site automatically.
5. You'll get a free link like `your-project.vercel.app` — share that.

To update later (e.g. adding the real song file), just re-upload the
folder, or connect a GitHub repo so future edits deploy automatically.

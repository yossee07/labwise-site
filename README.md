# Labwise landing page

Static site (HTML, CSS, JS). No build step.

## Deploy to Vercel
Option A, drag and drop: go to vercel.com/new, choose "Deploy" from a folder, and drop this folder in.
Option B, CLI: `npm i -g vercel`, then run `vercel` in this folder, then `vercel --prod`.
Option C, GitHub: push this folder to a repo, then import it at vercel.com/new. Framework preset: Other. No build command. Output directory: the root.

## Links to fill in
Open `main.js` and edit the `LINKS` block at the top:
- `caseStudy`: the Behance case study URL (empty until it's live; buttons show "The case study goes live soon.")
- `behance`: your Behance profile
- `prototype`: the Figma prototype link (set to the Home starting point; replace with the share link if needed)
- `portfolio`, `x`: already set

Store buttons show "Links go live at launch." until the app is out. To link them later, replace `href="#"` and remove `data-soon` on the two buttons in `index.html`.

## What's in here
- `index.html`: the page
- `styles.css`: Labwise tokens, layout, responsive rules, reduced-motion rules
- `main.js`: links, mobile menu, rotating subject word, scroll reveal, FAQ accordion, Simple/Scientific toggle
- `assets/`: hero scene, subject art, Lab Assistant art, Home screen, characters, favicon, self-hosted fonts

# Blessing Masocha — Portfolio Website
**HCSCI231 / HSWE221 Capstone Project | MSU Zimbabwe | Feb–June 2026**

---

## Project Structure

```
blessing-portfolio/
├── index.html          # Main HTML file (all sections)
├── css/
│   └── style.css       # All styles, themes, responsive rules
├── js/
│   └── main.js         # Theme toggle, counters, form validation, animations
└── README.md
```

---

## Features Implemented

- ✅ About Me section with professional intro
- ✅ 3 animated counters (Projects, Years, Technologies)
- ✅ Skills section (Languages, Frameworks, Tools, Databases)
- ✅ 3 Projects with title, description, tech tags, and GitHub links
- ✅ Contact section with working form and validation
- ✅ 3 social/contact icons (LinkedIn, Email, GitHub)
- ✅ Dark / Light mode toggle with LocalStorage persistence
- ✅ System theme auto-detection on first visit
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Hamburger navigation menu for mobile
- ✅ Scroll-triggered fade-in animations
- ✅ JavaScript form validation (name, email, message)

---

## How to Deploy

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2 — Deploy (choose one)

**GitHub Pages**
- Go to your repo → Settings → Pages
- Set source: `main` branch, `/ (root)`
- Your site will be live at: `https://YOUR_USERNAME.github.io/REPO_NAME`

**Netlify**
- Go to [netlify.com](https://netlify.com) → Add new site → Import from Git
- Connect your GitHub repo and deploy

**Vercel**
- Go to [vercel.com](https://vercel.com) → New Project
- Import your GitHub repo and deploy

---

## Update GitHub Links
In `index.html`, find all `href="#"` on the project GitHub links and replace with your real GitHub repo URLs.

---

## Author
**Blessing Masocha** | blessinghasmail@gmail.com  
Level 2.1 BSc Honours Computer Science — Midlands State University, Zimbabwe

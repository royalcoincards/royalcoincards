# 🚀 Royal Coin Cards — GitHub & Vercel Deployment Guide

Follow these steps exactly. Takes about 10 minutes.

---

## 📁 STEP 1 — Check Your Files

Make sure you have this folder structure:

```
royalcoincards/
├── index.html
├── about.html
├── products.html
├── gallery.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── images/
    └── logo.svg
```

---

## 🐙 STEP 2 — Upload to GitHub

### Option A — Using GitHub Website (Easiest, No Coding)

1. Go to **https://github.com/royalcoincards**
2. Click your repository (e.g. `royalcoincards`)
3. Click **"Add file"** → **"Upload files"**
4. **Drag and drop** the entire `royalcoincards` folder contents
   - Upload ALL files: index.html, about.html, products.html, gallery.html, contact.html
   - Upload the `css/` folder with style.css inside
   - Upload the `js/` folder with main.js inside
   - Upload the `images/` folder with logo.svg inside
5. Scroll down, write a commit message: `Add website files`
6. Click **"Commit changes"** (green button)

### Option B — Using Git Commands (If You Have Git Installed)

Open Terminal / Command Prompt:

```bash
cd path/to/royalcoincards
git init
git add .
git commit -m "Initial website upload"
git remote add origin https://github.com/royalcoincards/royalcoincards.git
git push -u origin main
```

---

## ▲ STEP 3 — Connect to Vercel (If Not Already Done)

1. Go to **https://vercel.com** and sign in with your GitHub account
2. Click **"Add New Project"**
3. Find your repository `royalcoincards/royalcoincards` and click **"Import"**
4. Leave all settings as default
5. Click **"Deploy"** — wait ~30 seconds

✅ Your site is now live at `royalcoincards.vercel.app`

---

## 🌐 STEP 4 — Connect Your Domain (royalcoincards.com)

### In Vercel:
1. Go to your project → **"Settings"** → **"Domains"**
2. Type `royalcoincards.com` and click **"Add"**
3. Also add `www.royalcoincards.com`
4. Vercel will show you DNS records to add

### In GoDaddy:
1. Go to **https://dnsmanagement.godaddy.com**
2. Find `royalcoincards.com` → click **"Manage DNS"**
3. Delete any old `A` records pointing to `@`
4. Add these records:

| Type  | Name | Value              |
|-------|------|--------------------|
| A     | @    | 76.76.21.21        |
| CNAME | www  | cname.vercel-dns.com |

5. Save and wait 10–30 minutes for DNS to update

✅ After DNS updates, `royalcoincards.com` will show your website!

---

## 🔄 STEP 5 — How to Update the Website Later

Every time you upload new files to GitHub → Vercel automatically rebuilds and updates the live website within 30 seconds.

To update:
1. Go to GitHub → your repository
2. Click the file you want to change → click the **pencil (edit)** icon
3. Make your changes
4. Click **"Commit changes"**
5. Vercel auto-deploys instantly ✅

---

## 📸 STEP 6 — Adding Real Photos Later

When you have real product photos:

1. Add your photos to the `images/` folder on GitHub
   - Name them: `gold-1g.jpg`, `silver-1g.jpg`, `gallery-1.jpg`, etc.
2. In `gallery.html`, replace the `<div class="gallery-placeholder">` sections with:
   ```html
   <img src="images/your-photo.jpg" alt="Description" style="width:100%"/>
   ```
3. Commit and Vercel updates automatically

---

## ❓ Troubleshooting

**Site shows old version after update?**
→ Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)

**Domain not working after DNS change?**
→ Wait up to 48 hours for full DNS propagation. Check status at https://dnschecker.org

**Files not showing on Vercel?**
→ Make sure `index.html` is in the ROOT folder, not inside a subfolder

---

## 📞 Need Help?

If you get stuck at any step, message me and I'll guide you through it!

Your website: **royalcoincards.com**
GitHub: **github.com/royalcoincards**

---
*Guide created for Royal Coin Cards — Karachi, Pakistan 🇵🇰*

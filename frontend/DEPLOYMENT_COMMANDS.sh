#!/bin/bash
# Quick Commands for Netlify Performance Deployment

# 1. Remove .zip file (takes 1 minute)
# Uncomment and run:
# rm src/assets/images/illustration-switzerland-flag.zip

# 2. Test build locally (takes 2 minutes)
npm run build && npm run preview

# 3. Check dist size (takes 1 second)
du -sh dist/

# 4. List all assets size (takes 1 second)
ls -lh dist/assets/ | awk '{print $5, $9}'

# 5. Build and show bundle analysis (takes 1 second)  
npm run build

# After optimizing images, run again:
# npm run build

# Then push to GitHub and Netlify will auto-deploy:
# git add .
# git commit -m "Optimize: Reduce bundle size and add code splitting"
# git push origin main

# Test live performance:
# Visit: https://pagespeed.web.dev/
# Paste your Netlify URL and analyze

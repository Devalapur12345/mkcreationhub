# MK Creation Hub Website - Deployment & Google Search Setup

## Quick Start for Google Search Visibility

Your website is fully SEO optimized and ready for deployment! Follow these steps to appear in Google search results.

### Step 1: Deploy to Vercel (Recommended)
```bash
# Option A: Using Vercel CLI
vercel deploy

# Option B: Connect GitHub and auto-deploy
1. Push code to GitHub
2. Connect repository to Vercel
3. Vercel will automatically deploy on each push
```

After deployment, note your live domain (e.g., `MK Creation Hub-gifts.vercel.app` or custom domain)

### Step 2: Update Domain URLs
Once you have your live domain:

1. Open `/app/layout.tsx`
2. Replace `https://MK Creation Hub-gifts.com` with your actual domain in:
   - OpenGraph URL
   - Metadata

3. Update `/public/sitemap.xml` with your domain

### Step 3: Add Custom Domain (Optional but Recommended)
For better branding and SEO:
1. Go to Vercel Project Settings
2. Add your custom domain (e.g., MK Creation Hub-gifts.in)
3. Update all URLs to use custom domain

### Step 4: Google Search Console Setup
**This is CRITICAL for Google visibility:**

1. Go to https://search.google.com/search-console
2. Click "Add property"
3. Enter your domain
4. Verify ownership:
   - Download verification file
   - Upload to your website's root
   - Or add DNS record (fastest)
   - Or add meta tag to layout.tsx
5. Submit your sitemap:
   - Click "Sitemaps" in left menu
   - Add: `yourdomain.com/sitemap.xml`
   - Wait 1-2 weeks for indexing

### Step 5: Google My Business Setup
**High priority for local searches:**

1. Go to https://www.google.com/business
2. "Manage your business"
3. Enter business info:
   - Name: MK Creation Hub
   - Phone: +91 7795440217
   - Address: Azam Nager, Belagavi, Karnataka
   - Website: Your domain
   - Category: Gift Shop / Event Services

4. Add photos:
   - Upload 5-10 high-quality images
   - Include gift arrangements
   - Include storefront if applicable

5. Add opening hours
6. Add services offered

### Step 6: Content Optimization
- [ ] Add meta description to all pages
- [ ] Add schema markup (Already done!)
- [ ] Create blog posts
- [ ] Add FAQs about gift services

### Step 7: Local Citations
Add your business to:
- JustDial.com (Popular in India)
- IndiaMART
- Local Belagavi directories
- Chamber of Commerce
- Yellow Pages

**Consistency is KEY:** Use exact same:
- Business name: MK Creation Hub
- Phone: +91 7795440217
- Address: Azam Nager, Belagavi, Karnataka

### Step 8: Backlinks & Link Building
Create links from:
- Local wedding blogs
- Wedding vendor directories
- Event planning websites
- Local Belagavi business listings

### Step 9: Social Media
Add links to:
- Facebook Business Page
- Instagram (Share portfolio)
- WhatsApp Business
- Link to all from your website footer

### Step 10: Monitor Performance

**Weekly:**
- Check Google Search Console for errors
- Monitor search queries and impressions

**Monthly:**
- Review rankings for target keywords
- Check website traffic (Google Analytics)
- Respond to reviews on Google My Business

**Quarterly:**
- Analyze competitors' keywords
- Update content strategy
- Create new blog posts

---

## Timeline to Google Rankings

- **Days 1-7:** Website indexed by Google (usually)
- **Week 2-4:** Start appearing for branded searches
- **Month 2-3:** Appear for local keywords (Belagavi)
- **Month 3-6:** Rise in rankings with more content and links
- **Month 6+:** Reach top 3 for main keywords (with consistent effort)

---

## Important SEO Keywords Already Optimized

### Homepage:
- wedding gifts, engagement gifts, gift packaging, premium gifts, luxury arrangements

### About Page:
- about us, years of experience, custom designs, premium materials

### Gallery Page:
- gift arrangements, wedding packages, engagement packages, custom designs

### Contact Page:
- contact us, order gifts, phone number, location in Belagavi

---

## Troubleshooting

**Q: My website isn't showing in Google search**
- A: Wait 1-2 weeks for indexing, then check Google Search Console for issues

**Q: How do I rank higher?**
- A: Follow the 10 steps above, focus on content quality and backlinks

**Q: Should I use paid ads?**
- A: Not necessary initially - organic search works well for local businesses

---

## Files Already Optimized

✓ `/app/layout.tsx` - Comprehensive metadata
✓ `/app/page.tsx` - Homepage with keywords
✓ `/app/about/page.tsx` - About page with SEO
✓ `/app/gallery/page.tsx` - Gallery with SEO
✓ `/app/contact/page.tsx` - Contact page with SEO
✓ `/public/sitemap.xml` - XML sitemap for Google
✓ `/public/robots.txt` - Search engine crawling rules
✓ `/public/schema.json` - Structured data for rich snippets
✓ JSON-LD schema in layout head - Business structured data

---

## Final Checklist

- [ ] Website deployed to Vercel
- [ ] Google Search Console property created
- [ ] Sitemap submitted to Google
- [ ] Google My Business profile set up
- [ ] Domain verified with Google
- [ ] Analytics set up (Google Analytics 4)
- [ ] Custom domain added (optional)
- [ ] Business added to local directories
- [ ] Social media links added
- [ ] Monthly review process started

---

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- Google Search Console: https://support.google.com/webmasters
- Google My Business: https://support.google.com/business

Last Updated: July 7, 2026

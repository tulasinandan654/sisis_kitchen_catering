# START HERE - Complete Setup Instructions

Welcome! Your Sisi's Kitchen catering website is ready to deploy. Follow these steps.

## Step 1: Prepare Your Domain (If You Don't Have One Yet)

1. Purchase a domain from any registrar:
   - GoDaddy
   - Namecheap
   - Google Domains
   - Domain.com

Save your domain name and registrar credentials.

## Step 2: Set Up Supabase (Database)

Supabase stores customer menu inquiries.

### Create Free Account
1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with email or Google
4. Create a new project

### Get Your Credentials
1. In Supabase dashboard, click your project
2. Go to **Settings** → **API**
3. Copy your:
   - **Project URL** (starts with https://)
   - **Anon Key** (long string)
4. Save these somewhere safe

### Set Up Database Table
The table will be auto-created when you first submit a form. No manual setup needed!

## Step 3: Configure Your Project

### 1. Get the Code
You already have this file open, so you have the complete code!

### 2. Create Environment File
```bash
# In your project folder:
cp .env.example .env
```

### 3. Add Your Supabase Credentials
Open `.env` file and paste:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_SUPABASE_ANON_KEY=your-long-key-here
```

## Step 4: Test Locally (Optional But Recommended)

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```

Visit http://localhost:5173 in your browser. You should see your website!

### Build Production Files
```bash
npm run build
```

This creates a `dist/` folder with your production-ready website.

## Step 5: Choose Your Deployment Path

### OPTION A: Netlify (Easiest, Recommended)

Perfect for beginners. Free tier available.

#### Step 1: Push to GitHub
```bash
# Initialize git
git init
git add .
git commit -m "Initial commit"

# Create repo on GitHub and push
```

#### Step 2: Deploy on Netlify
1. Go to https://netlify.com
2. Click "Sign up"
3. Connect your GitHub account
4. Select your repository
5. Add environment variables:
   - Add `VITE_SUPABASE_URL`
   - Add `VITE_SUPABASE_SUPABASE_ANON_KEY`
6. Click Deploy!

**Time needed**: 10 minutes
**Cost**: Free (with option to upgrade)

---

### OPTION B: Your Own Server (Full Control)

If you have a Linux/Ubuntu server:

#### Prerequisites
- Server with public IP address
- SSH access
- Domain name pointing to server

#### Step 1: SSH into Server
```bash
ssh root@your-server-ip
```

#### Step 2: Clone Project
```bash
cd /var/www
git clone <your-github-url> sisis-kitchen
cd sisis-kitchen
```

#### Step 3: Follow DEPLOYMENT.md
This file has step-by-step instructions for:
- Installing Node.js
- Installing Nginx
- Setting up SSL with Let's Encrypt
- Configuring everything
- Enabling auto-renewal

**Time needed**: 30 minutes
**Cost**: Server cost only (starting ~$5/month)

---

### OPTION C: Docker (Advanced)

If you know Docker:

```bash
# Build image
docker build -t sisis-kitchen .

# Run
docker run -p 80:3000 sisis-kitchen

# Access at http://localhost
```

---

## Step 6: Connect Your Domain

After deployment, point your domain to your website.

### For Netlify Users:
1. In Netlify dashboard, go to Domain settings
2. Add your domain
3. Update DNS records at your registrar

### For Your Own Server:
1. Go to your domain registrar
2. Update DNS A record to point to your server IP
3. Update NS records if prompted

**Wait 5 minutes to 48 hours for DNS to propagate.**

## Step 7: Test Your Website

### Visit Your Domain
```
https://your-domain.com
```

You should see:
- Header with logo and navigation
- Hero section with call-to-action
- Pre-made packages
- Custom menu builder
- Contact information

### Test Custom Menu Builder
1. Click "Build Your Menu"
2. Select a cuisine type
3. Choose some items
4. Fill in your details
5. Submit the form

### Check Supabase
1. Go to Supabase dashboard
2. Open Table Editor
3. Check `custom_menu_requests` table
4. Your submission should appear!

## Step 8: Customize Your Website

### Change Business Name
Edit `src/components/Header.tsx` - Look for "Sisi's Kitchen"

### Change Phone Numbers
Search and replace:
- `9030058654` with your number
- `8121358654` with your second number

### Change Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  colors: {
    orange: {...},  // Change these
    green: {...},
  }
}
```

### Add/Update Menu Items
Edit `src/components/CustomMenuBuilder.tsx`:
- Find `menuItems` array
- Add/remove items
- Update prices

### Update Packages
Edit `src/components/Packages.tsx`:
- Modify package details
- Change prices
- Update highlights

### Rebuild and Redeploy
```bash
npm run build
# Then redeploy (depends on your platform)
```

## Important File References

### For Understanding the Code
- **README.md** - Full technical documentation
- **SETUP_COMPLETE.md** - What you have and how it works
- **QUICK_START.md** - Quick 5-minute guide

### For Deployment
- **DEPLOYMENT.md** - Complete server setup (50+ steps for full control)
- **deploy.sh** - Automated deployment script (for your own server)
- **nginx.conf** - Web server config
- **Dockerfile** - Docker container config

### Configuration Files
- **.env.example** - Template for environment variables
- **package.json** - Project dependencies
- **tsconfig.json** - TypeScript settings
- **vite.config.ts** - Build configuration
- **tailwind.config.js** - Styling configuration

## Troubleshooting

### "npm: command not found"
Install Node.js from https://nodejs.org

### Build error about terser
```bash
npm install terser --save-dev
npm run build
```

### Can't connect to Supabase
1. Check `.env` file exists
2. Verify credentials are correct
3. Ensure Supabase project is active

### Website shows blank page
1. Check browser console for errors (F12)
2. Verify `.env` variables are set
3. Try rebuilding: `npm run build`

### Domain not working after deployment
1. Wait 24 hours for DNS propagation
2. Check DNS records at your registrar
3. Verify server is running
4. Check firewall settings

## After Deployment Checklist

- [ ] Domain pointing to your website
- [ ] HTTPS/SSL working
- [ ] Website loads properly
- [ ] Custom menu builder works
- [ ] Forms submit successfully
- [ ] Supabase receiving submissions
- [ ] Phone numbers updated
- [ ] Contact information updated
- [ ] Business name matches

## Next Steps for Your Business

1. **Test Everything**
   - Try submitting a menu request
   - Check Supabase receives it

2. **Set Up Email Notifications** (Optional)
   - Configure Supabase to email you when inquiries come in
   - Or check dashboard manually

3. **Create Content**
   - Add photos of your dishes
   - Add testimonials
   - Update team bios

4. **Monitor Analytics** (Optional)
   - Add Google Analytics
   - Track website visitors
   - Monitor conversion rates

5. **Keep Up to Date**
   - Update menu items seasonally
   - Adjust prices as needed
   - Keep Supabase backed up

## Emergency Support

### If Netlify Deploy Fails
- Check `.env` variables are set in Netlify
- Rebuild: Push to GitHub again
- Check Netlify logs for errors

### If Your Server Goes Down
- SSH and check: `systemctl status nginx`
- Restart Nginx: `systemctl restart nginx`
- Check disk space: `df -h`

### If Database Issues
- Check Supabase dashboard
- Verify tables exist
- Check RLS policies (should be permissive)

## Quick Reference

### Check if Node/npm installed
```bash
node --version
npm --version
```

### Run development server
```bash
npm run dev
```

### Build for production
```bash
npm run build
```

### Start with zero configuration
1. Clone code
2. Create `.env` file
3. Add Supabase credentials
4. Deploy!

## Estimated Time to Live

- **Netlify**: 10-15 minutes
- **Your Server**: 30-60 minutes  
- **Docker**: 20-30 minutes

Total including domain setup: **24 hours** (for DNS propagation)

---

## Questions?

All answers are in these files:
- This file: START_HERE.md (quickest answers)
- QUICK_START.md: 5-minute setup
- SETUP_COMPLETE.md: What you have
- README.md: Detailed documentation
- DEPLOYMENT.md: Server setup details

## You're Ready!

Your website is production-ready. Pick a deployment option above and launch your business online!

**Good luck with Sisi's Kitchen Catering!**

---

Last updated: 2026-05-31
Built with React, TypeScript, Tailwind CSS, and Supabase

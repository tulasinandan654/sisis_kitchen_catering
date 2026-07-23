# Quick Start Guide - Sisi's Kitchen Catering Website

Get your website up and running in 5 minutes!

## Prerequisites

- Node.js (v16+)
- npm
- Supabase account

## Step 1: Get Your Code Ready

```bash
# Clone or download the code
git clone <your-repo-url>
cd sisis-kitchen-catering

# Install dependencies
npm install
```

## Step 2: Configure Supabase

1. Go to https://supabase.com
2. Sign in and open your project
3. Go to **Settings → API**
4. Copy your **Project URL** and **Anon Key**

Create a `.env` file:

```bash
cp .env.example .env
```

Edit `.env` and paste your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_SUPABASE_ANON_KEY=your-anon-key
```

## Step 3: Test Locally

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

## Step 4: Build for Production

```bash
npm run build
```

This creates a `dist/` folder with your website ready to deploy.

## Deployment Options

### Option A: Deploy to Netlify (Easiest)

1. Push code to GitHub
2. Go to https://netlify.com
3. Click "Import from Git"
4. Select your repository
5. Set environment variables in Netlify settings
6. Deploy!

### Option B: Deploy to Your Own Server

1. SSH into your server
2. Copy the complete project folder
3. Run `npm install` and `npm run build`
4. Follow the DEPLOYMENT.md guide for Nginx setup

### Option C: Deploy with Docker

```bash
# Build Docker image
docker build -t sisis-kitchen .

# Run container
docker run -p 3000:80 sisis-kitchen
```

## What's Included

- React + TypeScript frontend
- Tailwind CSS styling
- Supabase integration for storing menu requests
- Pre-made package options
- Custom menu builder with real-time pricing
- Fully responsive design
- Production-ready build

## File Structure

```
├── src/
│   ├── components/         # All UI components
│   ├── lib/supabase.ts     # Database config
│   ├── App.tsx             # Main app
│   └── index.css           # Styles
├── dist/                   # Production build
├── package.json            # Dependencies
├── Dockerfile              # Docker config
├── nginx.conf              # Nginx config
├── DEPLOYMENT.md           # Full deployment guide
└── README.md               # Detailed docs
```

## Common Tasks

### Update Website Content

Edit the component files in `src/components/`:
- `Hero.tsx` - Hero section
- `Packages.tsx` - Package options
- `Contact.tsx` - Contact info

### Add Menu Items

Edit `src/components/CustomMenuBuilder.tsx` and add to the `menuItems` array.

### Change Colors

Edit `tailwind.config.js` to customize colors.

### Rebuild After Changes

```bash
npm run build
```

Then redeploy the `dist/` folder.

## Troubleshooting

### Build Error: "terser not found"
```bash
npm install terser --save-dev
npm run build
```

### Can't connect to Supabase
- Check `.env` file has correct credentials
- Verify table `custom_menu_requests` exists in Supabase

### Port 3000 already in use
```bash
# Kill the process
lsof -ti:3000 | xargs kill -9
```

## Support Files

- **README.md** - Full documentation
- **DEPLOYMENT.md** - Detailed deployment guide
- **deploy.sh** - Automated deployment script
- **nginx.conf** - Web server configuration
- **Dockerfile** - Docker configuration

## Next Steps

1. Customize your domain (after purchase)
2. Add your business logo to the header
3. Update contact information
4. Test the custom menu builder
5. Deploy to production

## Contact

For issues or questions, check the main README.md or contact:
- Phone: 9030058654
- Email: info@sisiskitchen.com

Good luck with your catering website!

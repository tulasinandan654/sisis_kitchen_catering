# Sisi's Kitchen - Catering Website

A modern, responsive catering website built with React, TypeScript, Tailwind CSS, and Supabase. Features include pre-made packages, custom menu builder with real-time pricing, and customer inquiry management.

## Features

- **Pre-made Catering Packages** - Vegetarian and non-vegetarian options
- **Custom Menu Builder** - Interactive menu selector with real-time pricing
- **Real-time Cost Calculator** - Automatic price calculation per guest
- **Customer Inquiry Management** - Submit custom menu requests via form
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Database Integration** - Supabase for storing customer inquiries
- **Professional UI** - Modern design with smooth animations

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Database**: Supabase
- **Build Tool**: Vite
- **Deployment**: Static hosting (Netlify, Vercel, or your own server)

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git
- Supabase account (free tier available at https://supabase.com)

## Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd sisis-kitchen-catering
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Fill in your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_SUPABASE_ANON_KEY=your-anon-key-here
```

**To get these values:**
1. Go to https://supabase.com and sign in
2. Create a new project or use existing one
3. Go to Project Settings → API
4. Copy the Project URL and Anon Key

### 4. Set Up Database

The database table will be created automatically when you first deploy, but you can also create it manually:

1. In Supabase dashboard, go to SQL Editor
2. Run the migration from `supabase/migrations/`

## Development

### Start Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Output files will be in the `dist/` directory

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
sisis-kitchen-catering/
├── src/
│   ├── components/          # React components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Packages.tsx
│   │   ├── CustomMenuBuilder.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── lib/
│   │   └── supabase.ts      # Supabase client config
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static files
├── dist/                    # Production build (generated)
├── .env                     # Environment variables (local, not in git)
├── .env.example             # Example env file
├── .gitignore               # Git ignore rules
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── vite.config.ts           # Vite config
├── tailwind.config.js       # Tailwind config
└── README.md               # This file
```

## Database Schema

### custom_menu_requests table

Stores customer menu requests:

```
- id (UUID, primary key)
- event_name (text)
- event_date (date)
- guest_count (integer)
- cuisine_type (text: veg/non-veg/mixed)
- selected_items (jsonb: array of selected items)
- estimated_price (numeric)
- customer_name (text)
- customer_email (text)
- customer_phone (text)
- special_requests (text)
- status (text: pending/approved/rejected)
- created_at (timestamp)
- updated_at (timestamp)
```

## Deployment Options

### Option 1: Netlify (Recommended for Static Sites)

1. Build the project: `npm run build`
2. Sign up at https://netlify.com
3. Connect your Git repository
4. Set environment variables in Netlify dashboard
5. Deploy automatically on each push

### Option 2: Vercel

1. Sign up at https://vercel.com
2. Import your Git repository
3. Add environment variables
4. Vercel will auto-detect Vite and deploy

### Option 3: Your Own Server (Linux/Ubuntu)

#### Using Nginx + Node.js

1. **SSH into your server**
   ```bash
   ssh user@your-domain.com
   ```

2. **Install Node.js and npm**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Clone repository**
   ```bash
   cd /var/www
   git clone <your-repo-url> sisis-kitchen
   cd sisis-kitchen
   ```

4. **Install dependencies and build**
   ```bash
   npm install
   npm run build
   ```

5. **Install Nginx**
   ```bash
   sudo apt-get install nginx
   ```

6. **Configure Nginx**
   
   Create `/etc/nginx/sites-available/default`:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com www.your-domain.com;

       root /var/www/sisis-kitchen/dist;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       # Cache static assets
       location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }

       # Enable gzip compression
       gzip on;
       gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
   }
   ```

7. **Enable SSL with Let's Encrypt**
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com -d www.your-domain.com
   ```

8. **Restart Nginx**
   ```bash
   sudo systemctl restart nginx
   ```

### Option 4: Docker Deployment

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

Build and run:
```bash
docker build -t sisis-kitchen .
docker run -p 3000:80 sisis-kitchen
```

## Environment Variables

### Required
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

### Optional
- `VITE_API_URL` - Custom API endpoint

## Managing Customer Inquiries

All custom menu requests are stored in Supabase. To view and manage them:

1. Go to https://supabase.com and log in
2. Open your project
3. Go to Table Editor
4. Click on `custom_menu_requests`
5. View all submissions and their status

## Updates and Maintenance

### Pull Latest Changes
```bash
git pull origin main
npm install
npm run build
```

### Update Dependencies
```bash
npm update
npm run build
```

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### Build Errors
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Supabase Connection Issues
- Verify `.env` file has correct credentials
- Check Supabase project is active
- Ensure `custom_menu_requests` table exists

## Performance Optimization

- **Gzip Compression**: Enabled in Nginx config
- **Asset Caching**: Static files cached for 1 year
- **Code Splitting**: Handled by Vite
- **Image Optimization**: Use Supabase storage for images

## Security

- Environment variables stored in `.env` (not committed)
- Row-level security enabled on Supabase tables
- HTTPS enforced in production
- Input validation on forms

## Support

For issues or questions:
1. Check existing GitHub issues
2. Create a new issue with details
3. Contact: support@sisiskitchen.com or call 9030058654

## License

This project is proprietary software for Sisi's Kitchen Catering Services.

## Contact

- **Phone**: 9030058654 / 8121358654
- **Email**: info@sisiskitchen.com
- **Address**: Shop no 2a, Kismatpur Rd, Bharath Nagar Colony, Hyderabad, Telangana 500086

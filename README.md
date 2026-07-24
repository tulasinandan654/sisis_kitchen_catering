# Sisi's Kitchen Catering

A modern, responsive catering website built with React, TypeScript, Tailwind CSS, and Supabase. It includes pre-made packages, a custom menu builder with real-time pricing, booking and inquiry flows, and a polished experience for desktop and mobile users.

## Features

- Responsive design for desktop, tablet, and mobile
- Pre-made catering packages and pricing
- Custom menu builder with live cost estimation
- Contact and booking inquiry forms
- Supabase-backed customer inquiry management
- Modern UI with smooth interactions

## Tech Stack

- Frontend: React 18 + TypeScript
- Styling: Tailwind CSS
- Icons: Lucide React
- Database: Supabase
- Build Tool: Vite
- Deployment: Static hosting (Netlify, Vercel, or any server)

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git
- A Supabase account

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```

## Environment Variables

Create a .env file in the project root and add:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Project Structure

- src/components
- src/lib
- public

## Deployment

This project can be deployed to Vercel, Netlify, or any static hosting service.
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

# Here are your Instructions

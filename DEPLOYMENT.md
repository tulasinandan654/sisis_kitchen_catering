# Deployment Guide - Sisi's Kitchen Catering

Complete guide to deploying the application to a live server after purchasing a domain.

## Prerequisites

- Domain name (already purchased)
- Server (Linux/Ubuntu 20.04+)
- SSH access to the server
- Basic knowledge of terminal/command line

## Step 1: Server Setup

### Connect to Your Server

```bash
ssh root@your-domain.com
# or with username
ssh username@your-domain.com
```

### Update System

```bash
apt-get update
apt-get upgrade -y
```

### Install Required Software

#### Node.js and npm

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs
node --version  # Verify installation
npm --version   # Verify installation
```

#### Nginx (Web Server)

```bash
apt-get install -y nginx
systemctl enable nginx
systemctl start nginx
```

#### Git

```bash
apt-get install -y git
```

#### Certbot (For SSL Certificates)

```bash
apt-get install -y certbot python3-certbot-nginx
```

## Step 2: Domain Configuration

### Update DNS Records

Point your domain to your server's IP address:

1. Go to your domain registrar (GoDaddy, Namecheap, etc.)
2. Add/Update DNS records:
   - **A Record**: `your-domain.com` → Your Server IP
   - **A Record**: `www.your-domain.com` → Your Server IP
   - Or use **CNAME**: `www.your-domain.com` → `your-domain.com`

3. Wait for DNS propagation (5 minutes to 48 hours)

### Verify DNS

```bash
nslookup your-domain.com
dig your-domain.com
```

## Step 3: Application Setup

### Create Application Directory

```bash
mkdir -p /var/www/sisis-kitchen
cd /var/www/sisis-kitchen
```

### Clone Your Repository

```bash
git clone <your-git-repo-url> .
# or if using SSH keys
git clone git@github.com:your-username/sisis-kitchen.git .
```

### Create Environment File

```bash
# Copy the example file
cp .env.example .env

# Edit with your values
nano .env
```

Add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_SUPABASE_ANON_KEY=your-anon-key
```

### Install Dependencies and Build

```bash
npm install
npm run build
```

Verify the build succeeded - you should see a `dist/` folder:

```bash
ls -la dist/
```

### Set Proper Permissions

```bash
chown -R www-data:www-data /var/www/sisis-kitchen
chmod -R 755 /var/www/sisis-kitchen
chmod -R 755 /var/www/sisis-kitchen/dist
```

## Step 4: Nginx Configuration

### Copy Nginx Configuration

```bash
cp /var/www/sisis-kitchen/nginx.conf /etc/nginx/sites-available/your-domain.com
```

### Edit Configuration

```bash
nano /etc/nginx/sites-available/your-domain.com
```

Replace all instances of `your-domain.com` with your actual domain name.

### Enable the Site

```bash
ln -s /etc/nginx/sites-available/your-domain.com /etc/nginx/sites-enabled/your-domain.com
```

### Remove Default Site (Optional)

```bash
rm /etc/nginx/sites-enabled/default
```

### Test Nginx Configuration

```bash
nginx -t
```

Should output: `syntax is ok` and `test is successful`

### Restart Nginx

```bash
systemctl restart nginx
systemctl status nginx
```

## Step 5: SSL Certificate (HTTPS)

### Get Certificate with Let's Encrypt

```bash
certbot --nginx -d your-domain.com -d www.your-domain.com
```

Follow the prompts:
1. Enter your email
2. Agree to terms
3. Choose to redirect HTTP to HTTPS

### Verify Certificate

```bash
certbot certificates
```

### Auto-Renewal Setup

```bash
systemctl enable certbot.timer
systemctl start certbot.timer
certbot renew --dry-run
```

## Step 6: Firewall Configuration

### Enable UFW Firewall

```bash
ufw enable
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp   # SSH
ufw allow 80/tcp   # HTTP
ufw allow 443/tcp  # HTTPS
ufw status
```

## Step 7: Verification

### Test Your Website

```bash
# Check if server is responding
curl http://your-domain.com
curl https://your-domain.com

# Or open in browser
# https://your-domain.com
```

### Check Logs

```bash
# Nginx access log
tail -f /var/log/nginx/sisis-kitchen-access.log

# Nginx error log
tail -f /var/log/nginx/sisis-kitchen-error.log
```

## Step 8: Continuous Deployment

### Option A: Manual Deployment

When you want to update the site:

```bash
cd /var/www/sisis-kitchen
git pull origin main
npm install
npm run build
systemctl reload nginx
```

### Option B: Automated Deployment with Git Hooks

```bash
# On your server, in the app directory
nano .git/hooks/post-receive
```

Add this script:

```bash
#!/bin/bash
cd /var/www/sisis-kitchen
git pull origin main
npm install
npm run build
systemctl reload nginx
```

Make it executable:

```bash
chmod +x .git/hooks/post-receive
```

### Option C: Use Deploy Script

```bash
chmod +x /var/www/sisis-kitchen/deploy.sh
./deploy.sh
```

Or set up as a cron job for automatic updates:

```bash
crontab -e
```

Add:

```cron
# Run deployment every day at 2 AM
0 2 * * * /var/www/sisis-kitchen/deploy.sh >> /var/log/sisis-deploy.log 2>&1
```

## Step 9: Monitoring and Maintenance

### Monitor Nginx

```bash
# Check if running
systemctl status nginx

# Check for errors
nginx -t

# View access logs
tail -f /var/log/nginx/sisis-kitchen-access.log

# View error logs
tail -f /var/log/nginx/sisis-kitchen-error.log
```

### Backup Database

Supabase provides automatic backups, but you can also:

```bash
# Export data from Supabase dashboard
# Or use Supabase CLI
supabase db pull
```

### Update Dependencies

```bash
cd /var/www/sisis-kitchen
npm update
npm audit fix
npm run build
systemctl reload nginx
```

### SSL Certificate Renewal

Certbot auto-renews, but you can manually check:

```bash
certbot renew
certbot certificates
```

## Troubleshooting

### 502 Bad Gateway Error

```bash
# Check if application is running
systemctl status nginx
systemctl restart nginx

# Check Nginx config
nginx -t

# Check Nginx logs
tail -f /var/log/nginx/sisis-kitchen-error.log
```

### Site Not Loading

1. Check DNS propagation: `nslookup your-domain.com`
2. Check if files exist: `ls -la /var/www/sisis-kitchen/dist`
3. Check permissions: `ls -l /var/www/sisis-kitchen`
4. Restart Nginx: `systemctl restart nginx`

### Certificate Issues

```bash
# Renew certificate
certbot renew --force-renewal

# Check certificate details
openssl x509 -in /etc/letsencrypt/live/your-domain.com/cert.pem -text -noout
```

### High Memory/CPU Usage

```bash
# Check processes
top

# Restart Nginx to clear resources
systemctl restart nginx
```

## Performance Optimization

### Enable Caching Headers

Already configured in nginx.conf - static assets cached for 1 year.

### Monitor Performance

```bash
# Check server resources
free -h          # Memory
df -h            # Disk space
ps aux | grep node  # Process info
```

## Security Best Practices

1. **Keep system updated**: `apt-get update && apt-get upgrade`
2. **Use SSH keys**: Disable password authentication
3. **Monitor logs**: Regularly check Nginx logs
4. **Backup data**: Regular backups from Supabase
5. **Use HTTPS**: Already configured with Let's Encrypt
6. **Firewall**: UFW configured to only allow necessary ports

## Support Commands

```bash
# View system info
uname -a
lsb_release -a

# Check service status
systemctl status nginx
systemctl status certbot

# View active network connections
netstat -tlnp | grep LISTEN

# Check domain DNS
dig your-domain.com +short
```

## Next Steps

1. Test the website thoroughly
2. Set up email notifications for SSL renewal
3. Configure monitoring (optional)
4. Train team on content updates
5. Plan backup strategy

## Emergency Contacts

- **Server Provider Support**: Check your hosting panel
- **Domain Registrar**: Contact them for DNS issues
- **Supabase Support**: https://supabase.com/support
- **Nginx Documentation**: https://nginx.org/

## Quick Reference

```bash
# Restart everything
systemctl restart nginx

# Deploy latest changes
cd /var/www/sisis-kitchen && git pull && npm install && npm run build && systemctl reload nginx

# View all logs
tail -f /var/log/nginx/sisis-kitchen-access.log /var/log/nginx/sisis-kitchen-error.log

# Check free disk space
df -h /var/www

# Update SSL certificate
certbot renew
```

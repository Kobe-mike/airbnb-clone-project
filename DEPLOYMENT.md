# Deployment & Production Guide

## 📋 Pre-Deployment Checklist

### Code & Security
- [ ] All code reviewed and tested
- [ ] Environment variables in `.env` (not in source code)
- [ ] `.env` file added to `.gitignore`
- [ ] JWT_SECRET changed to strong random string
- [ ] Database credentials changed from defaults
- [ ] Admin credentials updated
- [ ] No console.log() statements left in production code
- [ ] Error messages don't expose sensitive information

### Database
- [ ] Database schema finalized and tested
- [ ] Database backups automated
- [ ] Indexes created on commonly queried fields
- [ ] Foreign keys validated
- [ ] Data migration scripts tested

### Frontend
- [ ] All static assets optimized (images compressed)
- [ ] CSS minified
- [ ] JavaScript minified
- [ ] Responsive design tested on multiple devices
- [ ] Cross-browser compatibility verified
- [ ] Performance optimized (load times < 3s)

### Backend
- [ ] All API endpoints thoroughly tested
- [ ] Error handling implemented
- [ ] Logging configured
- [ ] Rate limiting enabled
- [ ] CORS configured for production domain
- [ ] Input validation on all endpoints
- [ ] SQL injection protection verified

### Performance
- [ ] Database query performance optimized
- [ ] Caching implemented where appropriate
- [ ] Image optimization complete
- [ ] API response times < 500ms
- [ ] Load testing performed

---

## 🚀 Deployment Options

### Option 1: Traditional VPS (Recommended for Learning)

#### Platforms
- **DigitalOcean** - $6-12/month
- **Linode** - $5-10/month
- **AWS EC2** - Variable pricing
- **Google Cloud** - Variable pricing

#### Steps

**1. Setup Server**
```bash
# SSH into your server
ssh root@your_server_ip

# Update system
apt-get update && apt-get upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Install MySQL
apt-get install -y mysql-server

# Install Nginx (reverse proxy)
apt-get install -y nginx

# Install PM2 (process manager)
npm install -g pm2
```

**2. Clone Project**
```bash
cd /var/www
git clone https://github.com/yourname/airbnb-clone.git
cd airbnb-clone
npm install
```

**3. Setup Database**
```bash
mysql -u root -p
CREATE DATABASE airbnb_clone;
USE airbnb_clone;
source database/schema.sql;
```

**4. Configure Environment**
```bash
nano .env

# Add production values:
# PORT=5000
# NODE_ENV=production
# DB_HOST=localhost
# DB_USER=airbnb_user
# DB_PASSWORD=strong_password_here
# JWT_SECRET=very_long_random_string_here
```

**5. Setup PM2**
```bash
# Start app with PM2
pm2 start backend/server.js --name "airbnb-app"

# Configure auto-start
pm2 startup
pm2 save
```

**6. Configure Nginx**
```bash
nano /etc/nginx/sites-available/default

# Add configuration:
server {
    listen 80;
    server_name your_domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**7. Enable HTTPS**
```bash
# Install Certbot
apt-get install -y certbot python3-certbot-nginx

# Get SSL certificate
certbot --nginx -d your_domain.com

# Auto-renewal setup (happens automatically)
```

**8. Start Services**
```bash
systemctl restart nginx
pm2 restart airbnb-app
```

---

### Option 2: Docker Containerization

#### Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

#### docker-compose.yml
```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=db
      - DB_USER=airbnb_user
      - DB_PASSWORD=${DB_PASSWORD}
      - DB_NAME=airbnb_clone
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=${DB_PASSWORD}
      - MYSQL_DATABASE=airbnb_clone
      - MYSQL_USER=airbnb_user
      - MYSQL_PASSWORD=${DB_PASSWORD}
    volumes:
      - ./database/schema.sql:/docker-entrypoint-initdb.d/schema.sql
      - db_data:/var/lib/mysql
    restart: unless-stopped

volumes:
  db_data:
```

#### Deploy with Docker
```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f web

# Stop services
docker-compose down
```

---

### Option 3: Heroku (Easiest for Beginners)

```bash
# Install Heroku CLI
brew tap heroku/brew && brew install heroku

# Login
heroku login

# Create app
heroku create your-app-name

# Add MySQL add-on (JawsDB)
heroku addons:create jawsdb:kitefin

# Set environment variables
heroku config:set JWT_SECRET="your_secret_key_here"
heroku config:set NODE_ENV=production

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

#### Procfile
```
web: npm start
```

---

### Option 4: AWS Elastic Beanstalk

```bash
# Install EB CLI
pip install awsebcli

# Initialize
eb init -p node.js-18 airbnb-clone

# Create environment
eb create airbnb-prod

# Set environment variables
eb setenv JWT_SECRET="your_secret_key" DB_HOST=your_rds_endpoint

# Deploy
eb deploy

# Open in browser
eb open
```

---

## 🔒 Security Configurations

### SSL/TLS Certificate
```bash
# Let's Encrypt (Free)
certbot certonly --standalone -d your_domain.com

# Nginx config
server {
    listen 443 ssl http2;
    server_name your_domain.com;
    
    ssl_certificate /etc/letsencrypt/live/your_domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your_domain.com/privkey.pem;
}

# Auto-redirect HTTP to HTTPS
server {
    listen 80;
    server_name your_domain.com;
    return 301 https://$server_name$request_uri;
}
```

### Security Headers
Add to Nginx configuration:
```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
```

### Firewall Rules
```bash
# Allow only necessary ports
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw enable
```

---

## 📊 Monitoring & Logging

### PM2 Monitoring
```bash
# Install PM2 plus
pm2 install pm2-auto-pull
pm2 install pm2-logrotate

# Monitor in browser
pm2 web
# http://localhost:9615
```

### Nginx Logs
```bash
# Access logs
tail -f /var/log/nginx/access.log

# Error logs
tail -f /var/log/nginx/error.log
```

### Application Logging
Add to `backend/server.js`:
```javascript
const fs = require('fs');
const logStream = fs.createWriteStream('logs/app.log', { flags: 'a' });

app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const log = `[${timestamp}] ${req.method} ${req.path} - ${res.statusCode}`;
  logStream.write(log + '\n');
  next();
});
```

### Database Backups
```bash
# Automated daily backup
crontab -e

# Add this line:
0 2 * * * mysqldump -u airbnb_user -p$DB_PASSWORD airbnb_clone > /backups/airbnb_$(date +\%Y\%m\%d).sql
```

---

## 🔄 Database Migration Strategies

### Before Deployment
1. **Backup** - Always backup before migration
2. **Test** - Run migrations in staging first
3. **Document** - Keep migration logs
4. **Verify** - Check data integrity after

### Migration Steps
```bash
# Create migration file
cat > database/migrations/001_initial_schema.sql << 'EOF'
-- Migration: Initial schema
-- Date: 2026-02-07

-- Create tables
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  -- ... fields
);

-- Add indexes
CREATE INDEX idx_email ON users(email);
EOF

# Run migration
mysql -u root -p airbnb_clone < database/migrations/001_initial_schema.sql
```

---

## 📈 Performance Optimization

### Frontend
- Minify CSS/JS
- Compress images (TinyPNG, ImageOptim)
- Use CDN for static assets
- Enable gzip compression

### Backend
```javascript
// Add compression middleware
const compression = require('compression');
app.use(compression());

// Database connection pooling (already configured)
const pool = mysql.createPool({
  connectionLimit: 10,
  // ...
});
```

### Caching
```javascript
// Cache property listings
app.get('/api/properties', (req, res) => {
  // Check cache first
  // Return cached if available
  // Otherwise query DB and cache
});
```

---

## 🔍 Monitoring Services

### Free Options
- **Uptime Robot** - Uptime monitoring
- **Sentry** - Error tracking
- **LogRocket** - Session replay
- **GTmetrix** - Performance monitoring

### Paid Options
- **New Relic** - Full stack monitoring
- **DataDog** - Infrastructure monitoring
- **PagerDuty** - Alert management

---

## 📋 Production Environment Setup

### .env Production Example
```env
# Server
PORT=5000
NODE_ENV=production

# Database
DB_HOST=your-rds-endpoint.amazonaws.com
DB_USER=airbnb_user
DB_PASSWORD=very_strong_password_with_special_chars
DB_NAME=airbnb_clone
DB_PORT=3306

# JWT
JWT_SECRET=generate_with_crypto_randomBytes_32
JWT_EXPIRE=7d

# Admin
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=strong_password_here

# Frontend URLs
FRONTEND_URL=https://yourdomain.com
ADMIN_URL=https://yourdomain.com/admin

# Email Service (optional)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=app_password_here

# Payment Service (optional)
STRIPE_KEY=your_stripe_key
PAYPAL_CLIENT_ID=your_paypal_id
```

---

## 🚀 Deployment Commands Checklist

```bash
# 1. Connect to server
ssh deployer@your_domain.com

# 2. Pull latest code
cd /var/www/airbnb-clone
git pull origin main

# 3. Install/update dependencies
npm ci --only=production

# 4. Run database migrations
mysql -u airbnb_user -p $DB_PASSWORD < database/migrations/latest.sql

# 5. Restart application
pm2 restart airbnb-app

# 6. Check status
pm2 status

# 7. View logs
pm2 logs airbnb-app

# 8. Verify site is up
curl https://yourdomain.com

# 9. Monitor
pm2 monit
```

---

## 📞 Troubleshooting

### App Won't Start
```bash
# Check error logs
pm2 logs airbnb-app

# Restart services
pm2 restart airbnb-app
nginx -t
systemctl restart nginx
```

### Database Connection Issues
```bash
# Test MySQL connection
mysql -h db_host -u user -p

# Check MySQL status
systemctl status mysql

# Restart MySQL
systemctl restart mysql
```

### High Memory Usage
```bash
# Check memory
free -h

# Monitor with PM2
pm2 monit

# Restart app
pm2 restart airbnb-app
```

---

## 📊 Post-Deployment Verification

- [ ] Site accessible via HTTPS
- [ ] All API endpoints responding
- [ ] Database queries performant
- [ ] Admin dashboard secured
- [ ] Emails sending (if configured)
- [ ] Backups running
- [ ] Monitoring alerts configured
- [ ] Error logging working
- [ ] Performance acceptable
- [ ] Security headers present

---

This deployment guide provides multiple paths for taking your application to production, from simple VPS hosting to advanced containerization.

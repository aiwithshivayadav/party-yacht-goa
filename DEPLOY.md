# Party Yacht Goa — VPS Deployment Guide (Hostinger)

## What you need
- Hostinger VPS login (IP address + root password)
- Your domain (e.g. partyyachtgoa.com) pointed to the VPS
- An SSH client: use **PuTTY** (Windows) or the built-in Terminal

---

## STEP 1 — Connect to your VPS

Open PuTTY (or Terminal) and connect:
```
ssh root@YOUR_VPS_IP
```
Enter your root password when prompted.

---

## STEP 2 — Install Node.js 20

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt-get install -y nodejs
node -v    # should show v20.x.x
npm -v
```

---

## STEP 3 — Install PM2 (keeps your site running 24/7)

```bash
npm install -g pm2
```

---

## STEP 4 — Install Nginx (web server / reverse proxy)

```bash
apt-get install -y nginx
systemctl start nginx
systemctl enable nginx
```

---

## STEP 5 — Upload your project to the VPS

### Option A — Using FileZilla (SFTP, easiest)
1. Download FileZilla: https://filezilla-project.org
2. Open FileZilla → File → Site Manager → New Site
3. Protocol: **SFTP**
4. Host: `YOUR_VPS_IP`
5. User: `root`  |  Password: your root password
6. Connect
7. On the right panel, navigate to `/var/www/`
8. On the left panel, find your project folder: `C:\Users\s\Desktop\Yachts\Website pyg`
9. Drag and drop the entire folder to `/var/www/partyyachtgoa`

### Option B — Using Git (if your project is on GitHub)
```bash
cd /var/www
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git partyyachtgoa
```

---

## STEP 6 — Build the project on the server

```bash
cd /var/www/partyyachtgoa

# Install dependencies
npm install

# Build for production
npm run build
```

This will take 1–3 minutes. You should see "Route (app)" compilation output.

---

## STEP 7 — Start the app with PM2

```bash
pm2 start npm --name "partyyachtgoa" -- start
pm2 save
pm2 startup
```

Run the command that `pm2 startup` outputs (starts PM2 automatically on reboot).

Check it's running:
```bash
pm2 status
pm2 logs partyyachtgoa
```

Your app is now running on port 3000 internally.

---

## STEP 8 — Configure Nginx (point your domain to the app)

```bash
nano /etc/nginx/sites-available/partyyachtgoa
```

Paste this config (replace `partyyachtgoa.com` with your actual domain):
```nginx
server {
    listen 80;
    server_name partyyachtgoa.com www.partyyachtgoa.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Save: press `Ctrl+X` then `Y` then `Enter`.

Enable the config:
```bash
ln -s /etc/nginx/sites-available/partyyachtgoa /etc/nginx/sites-enabled/
nginx -t           # test config — should say "ok"
systemctl reload nginx
```

---

## STEP 9 — Point your domain DNS to the VPS

In Hostinger hPanel → Domains → DNS Zone:

| Type | Name | Value |
|------|------|-------|
| A    | @    | YOUR_VPS_IP |
| A    | www  | YOUR_VPS_IP |

DNS changes take 5–30 minutes to propagate.

---

## STEP 10 — Free SSL certificate (HTTPS)

```bash
apt-get install -y certbot python3-certbot-nginx
certbot --nginx -d partyyachtgoa.com -d www.partyyachtgoa.com
```

Follow the prompts — enter your email, agree to terms.
Certbot will automatically update Nginx to use HTTPS.

Auto-renewal is set up automatically. Test it:
```bash
certbot renew --dry-run
```

---

## Done! Your site is live at https://partyyachtgoa.com

---

## Useful commands

```bash
# Restart the app
pm2 restart partyyachtgoa

# View live logs
pm2 logs partyyachtgoa

# Update site after changes (re-upload files, then run):
cd /var/www/partyyachtgoa
npm run build
pm2 restart partyyachtgoa

# Check Nginx status
systemctl status nginx

# Reload Nginx after config changes
systemctl reload nginx
```

---

## Environment variables (if needed)

Create a `.env.production` file in `/var/www/partyyachtgoa/`:
```bash
nano /var/www/partyyachtgoa/.env.production
```
Add any needed variables (database URL, API keys, etc.).
Then rebuild: `npm run build && pm2 restart partyyachtgoa`

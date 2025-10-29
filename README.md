# Kanhaiya Krushi

A bilingual (Marathi + English) agriculture website for Kanhaiya Krushi Seva Kendra. Built with React (client) and Node/Express + MongoDB (server). Includes product listings, a contact form with email notifications, and localization support.

## Features

- Bilingual UI: Marathi and English with centralized translation file
- Contact Form: Saves submissions to MongoDB and sends email notifications
- Clean architecture: separate client and server folders
- Production-ready deploy script
- Secure by default: environment variables are not committed

## Tech Stack

- Client: React, React Router
- Server: Node.js, Express
- Database: MongoDB (Mongoose)
- Email: Nodemailer (SMTP)
- i18n: translations.js

## Repository Structure

```
kanhaiya-krushi/
├── .gitignore
├── README.md
├── package.json
├── client/
│   ├── .env.production
│   ├── BILINGUAL_SETUP.md
│   ├── deploy.sh
│   ├── package.json
│   ├── public/
│   └── src/
└── server/
    ├── .env.example
    ├── models/
    ├── routes/
    ├── seed.js
    ├── server.js
    └── package.json
```

## Local Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/ramkrushna15/kanhaiya-krushi.git
   cd kanhaiya-krushi
   ```

2. Install dependencies:
   ```bash
   npm install
   cd client && npm install
   cd ../server && npm install
   ```

3. Environment variables:
   - Server:
     ```bash
     cd server
     cp .env.example .env
     # Edit .env with your values
     ```
   - Client:
     ```bash
     cd ../client
     # Create if not present
     # Windows: New-Item -ItemType File -Name ".env"
     # Mac/Linux: touch .env
     ```
     Example client/.env:
     ```env
     REACT_APP_API_URL=http://localhost:5000
     REACT_APP_API_BASE_URL=http://localhost:5000/api
     GENERATE_SOURCEMAP=false
     ```

4. Run locally:
   - Server:
     ```bash
     cd server
     npm start
     ```
   - Client:
     ```bash
     cd client
     npm start
     ```

## Email Configuration (Server)

Edit `server/.env`:
```env
EMAIL_USER=info@kanhaiyakrushi.com
EMAIL_PASS=your-email-app-password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_FROM=noreply@kanhaiyakrushi.com
```

The contact form route uses `nodemailer.createTransport` in `server/routes/contactRoutes.js`.

## Translations

- File: `client/src/translations/translations.js`
- Usage: Components read keys instead of hardcoded text to support Marathi and English

## Deployment

- Script: `client/deploy.sh`
- Production client variables: `client/.env.production`
- Set all server env variables on the hosting platform (do not upload `.env`)

## Security

- `.env` files are intentionally excluded from the repo via `.gitignore`
- Use different secrets for development and production
- Never place secrets in client `.env` (anything in client is public)

## Troubleshooting

- Nodemailer error “createTransporter is not a function”
  - Fixed by using `createTransport` in `server/routes/contactRoutes.js`
- Merge conflicts after cleanup
  - Remove unmerged `server/.env`, commit, then `git pull`

## Contact

- Website: kanhaiyakrushi.com
- Email: info@kanhaiyakrushi.com
- WhatsApp: +91 97670 38479

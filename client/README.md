# Enerzee React - WordPress Theme Conversion

This is a React.js conversion of the Enerzee WordPress theme, a modern renewable energy landing page theme.

## Features

- ✅ Exact design conversion from WordPress theme
- ✅ Responsive header with navigation
- ✅ Footer with widgets
- ✅ Modern React components
- ✅ CSS styling matching original theme
- ✅ Mobile responsive design

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
  ├── components/
  │   ├── Header.jsx      # Header component with navigation
  │   ├── Header.css
  │   ├── Footer.jsx      # Footer component
  │   └── Footer.css
  ├── pages/
  │   ├── Home.jsx        # Home page component
  │   └── Home.css
  ├── App.jsx             # Main App component
  ├── App.css
  ├── main.jsx            # React entry point
  └── style.css           # Global styles
```

## Theme Colors

- Primary: #4daf40 (Green)
- Secondary: #1f2332 (Dark)
- Text: #7a7d86 (Gray)
- White: #ffffff

## Components

### Header
- Responsive navigation menu
- Logo/branding
- Search functionality
- Mobile menu toggle

### Footer
- Footer widgets (4 columns)
- Social media links
- Copyright information
- Contact information

### Home
- Breadcrumb section
- Content area
- Ready for additional sections

## Next Steps

To complete the conversion, you may want to add:
- Additional page components
- React Router for navigation
- More sections from the original theme
- Image assets from WordPress theme
- Font icons (Ionicons, Font Awesome)

## Notes

- The design matches the original WordPress Enerzee theme
- All CSS variables and styling are preserved
- Components are modular and reusable
- Ready for further customization

## Business enquiry form (local)

**Terminal 1 — API** (`server/`):

```bash
cp .env.example .env
# Set SKIP_DB_SYNC=true for local testing without MySQL
npm install
npm run dev
```

**Terminal 2 — frontend** (`client/`):

```bash
cp .env.example .env
# VITE_API_BASE_URL=http://localhost:3009
npm install
npm run dev
```

Open [http://localhost:5173/business-commute](http://localhost:5173/business-commute), scroll to the form, submit a test enquiry. You should see the themed success message; the API log should show `[Kissflow] Webhook sent: refexmobility-...` when the webhook URL is configured.

reCAPTCHA is skipped on `localhost` / `127.0.0.1`. In production, set `VITE_RECAPTCHA_SITE_KEY` (client) and `RECAPTCHA_SECRET_KEY` (server).

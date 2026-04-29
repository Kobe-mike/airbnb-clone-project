# React App Setup Guide

This is the React frontend for the Ghana Stay Airbnb Clone project.

## Installation

```bash
cd frontend/react-app
npm install
```

## Development

Run the React dev server (requires backend running on port 3000):

```bash
npm run dev
```

The React app will be available at `http://localhost:5173` with hot module reloading.

## Build for Production

```bash
npm run build
```

The built files will be in the `dist/` folder and will be served by the Express backend.

## Running Full Stack

From the project root:

```bash
# Option 1: Run backend only (requires separate React dev server)
npm run dev

# Option 2: Run both backend and React dev server together
npm run dev:full

# Option 3: Build React and run production
npm run build:react
npm start
```

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Navigation.jsx
│   ├── HeroSection.jsx
│   ├── PropertyGrid.jsx
│   ├── PropertyCard.jsx
│   └── Footer.jsx
├── pages/              # Page components
│   ├── HomePage.jsx
│   └── AuthPage.jsx
├── styles/             # Global CSS
│   └── index.css
├── App.jsx             # Main app with routing
└── main.jsx            # React entry point
```

## Tech Stack

- **React 18** - UI library
- **React Router DOM 6** - Client-side routing
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client for API calls

## API Integration

The React app makes API calls to the backend at `/api/*` endpoints:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/listings` - Get properties
- `POST /api/bookings` - Create booking

## Features

✅ Responsive design (mobile, tablet, desktop)
✅ Dark theme with gold accents (Kente-inspired)
✅ Property grid with filtering
✅ Authentication (sign in / sign up)
✅ Real-time form validation
✅ SPA (Single Page Application) routing

## Styling

The project uses CSS with custom properties (CSS variables) for theming:

```css
--color-gold: #D4AF37
--color-black: #0A0E27
--color-dark-bg: #0F1419
--color-white: #FFFFFF
```

All components inherit from these variables, making it easy to customize the entire theme.

## Next Steps

1. **API Integration**: Update components to call real API endpoints
2. **Authentication**: Implement token-based auth flow with localStorage
3. **State Management**: Consider Redux/Zustand for complex state
4. **Testing**: Add Jest and React Testing Library
5. **Deployment**: Deploy to Vercel, Netlify, or AWS S3 + CloudFront

---

For more information about the full project, see the main README.md in the project root.

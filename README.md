# NOVARA — E-Commerce Store with Admin Dashboard

A complete, responsive e-commerce storefront and admin dashboard built with **React + Vite**, per the Frontend Developer Internship Task brief. All data (products, orders, users, banners) is mock data persisted to `localStorage` — no backend required.

## Tech Stack
- React 19 + Vite
- React Router DOM
- Redux Toolkit
- Tailwind CSS v4
- React Icons, Axios, react-hot-toast

## Getting Started
```bash
npm install
npm run dev       # start dev server
npm run build     # production build
npm run preview   # preview the production build
```

## Demo Accounts
- **Customer:** go to `/login` or `/register` — any email/password works, creates a customer account.
- **Admin:** click the small "Admin" link in the footer (or go to `/admin/login`) — a dedicated, separate console login. Demo credentials: `admin@novara.com` / any password.

## What's Included

**Auth:** Splash, Welcome, Login, Register, Forgot Password, Logout

**Store:** Home (hero slider, flash sale, categories, trending/best-selling/new-arrivals, brands, reviews), Categories, Category Details, Product Listing (filters + pagination), Product Details (gallery, zoom, tabs, related products), Search (live), Wishlist, Cart, Checkout, Order Success, My Orders, Order Details, Profile, Edit Profile, Settings, Contact Us, About Us, Privacy Policy, Terms & Conditions, 404

**Admin Dashboard:** Stats overview, Product Management (CRUD), Category Management (CRUD), Banner Management (CRUD + enable/disable), User Management (block/unblock/delete), Order Management (status updates), Store Settings

**UX details:** Dark/light mode, mobile bottom navigation, skeleton loading, toast notifications, protected routes, pagination, lazy-loaded images, scroll-to-top, reusable modal components.

## Folder Structure
```
src/
  components/   # common, layout, product, home, admin components
  pages/        # auth, store, admin pages
  redux/        # store + slices (auth, cart, wishlist, theme, catalog, orders, users, banners)
  data/         # mock data
  routes/       # ProtectedRoute, AdminRoute, SplashGate
  hooks/        # useAuth
  utils/        # storage helpers
```

## Deploying
Push to GitHub, then deploy this folder to Vercel or Netlify (framework preset: Vite). No environment variables needed.

# Project Summary

This document describes the key components and features of the application, including frontend, backend, AI integration, shop functionality, products, interface, and social media aspects (Facebook, etc.).

## Overview
The project is a full-stack application with a React frontend and an Express-based backend. It incorporates AI components, a shop with products, user interfaces, and integrations with external services like Facebook.

## Frontend
- Built with **React 18**, **TypeScript**, and **Vite**.
- Routing handled by **React Router 6**; pages in `client/pages/` (e.g., `Index.tsx`, `Shop.tsx`, `ProductDetail.tsx`, `Cart.tsx`, etc.). Routes include public store pages, seller/admin dashboards, authentication pages, chatbot, and a catch-all `NotFound`.
- UI components library under `client/components/ui/` using TailwindCSS and Radix UI.
- Global styling via `client/global.css` and Tailwind configuration in `tailwind.config.ts`.
- Hooks and context providers in `client/lib/` (e.g., `auth-context.tsx`, `cart-context.tsx`) manage login state, cart contents, and shared utilities.
- Additional hooks in `client/hooks/` for mobile detection and toast notifications.
- Features include product browsing, shopping cart, checkout, user authentication (SignIn, SignUp), seller dashboard (SellerProducts, SellerOrders, SellerAnalytics, SellerCustomers, SellerSettings), admin products, and chatbot pages.

## Backend
- Express server in `server/index.ts` with routes defined in `server/routes/` (e.g., `products.ts`, `demo.ts`, `suggest-price.ts`). Additional routing for authentication or other services would integrate similarly.
- API endpoints available under `/api/` including `ping` and `demo` via `api/` folder for Netlify functions. These correspond to server routes and are used by both frontend and external clients.
- Shared types in `shared/api.ts` to maintain consistent interfaces between client and server.
- Development server configured with `server/dev.ts`; production build with `server/node-build.ts`.
- Login state is managed by frontend context but backend must expose relevant auth endpoints or integrate with provider (e.g. Facebook) if implemented.

## AI Integration
- Chatbot page (`client/pages/Chatbot.tsx`) and related components in `client/components/` for chat interaction.
- AI utilities and hooks in `client/lib/gemini.ts` and `client/lib/product-search.ts` likely handle AI-driven features such as search or generative responses.

## Shop & Products
- Product-related API routes under `api/products` and the corresponding frontend pages for browsing products, viewing details, and managing via seller or admin interfaces.
- Cart functionality with context provider, checkout flow, and order confirmation pages.
- Seller and admin dashboards to manage products and view analytics or orders.

## Interface
- Comprehensive UI library covering common interface elements (buttons, dialogs, forms, tables, etc.) built with Tailwind and Radix.
- Layout components (`Header`, `Footer`, `Layout`) to maintain consistent design across pages.

## Social Media & External Integration
- While not explicitly detailed, references to Facebook (perhaps in commerce or login) imply integration points.

## Deployment & Configuration
- Uses PNPM, tailored for full-stack React/Express apps.
- `netlify.toml` and `vercel.json` present for cloud deployments. The Vercel configuration supports deploying both the frontend and serverless functions; environment variables and build commands are specified there. Netlify functions mirror the API in `api/`.
- Build commands: `pnpm dev`, `pnpm build`, `pnpm start`, `pnpm test`, etc.
- Vercel deployment would run `pnpm build` and serve the static client with serverless API routes under `/api`.

## Contributions
This section enumerates the work completed on the project:

- Set up full-stack architecture with React frontend and Express backend.
- Implemented client routing, pages, and UI components for shop functionality (home, shop listing, product detail, cart, checkout).
- Built authentication flows including SignIn/SignUp pages and `auth-context` provider.
- Developed seller and admin dashboards with product management, orders, analytics, customers, and settings pages.
- Created chatbot interface and integrated AI utilities (`gemini.ts`, `product-search.ts`).
- Constructed global UI library (`client/components/ui`) using Tailwind and Radix for reusable elements (buttons, dialogs, forms, etc.).
- Added hooks for mobile detection (`use-mobile.tsx`) and toast notifications.
- Implemented cart management via `cart-context` and order confirmation flow.
- Established backend API routes (`products.ts`, `demo.ts`, `suggest-price.ts`) and Netlify function counterparts.
- Defined shared TypeScript interfaces in `shared/api.ts` for type safety.
- Configured development tools (`pnpm`, Vite, Tailwind) and deployment setups (`netlify.toml`, `vercel.json`).
- Ensured full hot-reload development environment with `server/dev.ts`.
- Worked on integration points for external services such as Facebook (likely login or commerce).

## Notes
This summary captures the current structure and features based on existing files and typical application patterns. Details about Facebook integration or AI specifics may reside in code comments or external configuration not included here.

---

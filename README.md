# Next.js 16 E-Commerce Application

A modern, full-featured e-commerce application built with Next.js 16, TypeScript, and Redux Toolkit.

## Features

### Authentication & Authorization
- ✅ Login page with form validation using Zod
- ✅ Token-based authentication
- ✅ Session management using HTTP-only secure cookies (iron-session)
- ✅ Protected routes with middleware
- ✅ Auto-redirect logic (logged in → products, logged out → login)
- ✅ Logout functionality

### Product Management
- ✅ Server-side product fetching with caching
- ✅ Product catalog display
- ✅ Server-side categories fetching
- ✅ Filter products by category
- ✅ Search functionality
- ✅ Pagination via API
- ✅ Sorting (by name, price - ascending/descending)

### Shopping Cart
- ✅ Add to cart functionality
- ✅ Persistent cart using Redux Toolkit + localStorage
- ✅ Shopping cart page
- ✅ Update quantities
- ✅ Remove items
- ✅ Clear cart

### Technical Features
- ✅ TypeScript throughout
- ✅ Server-Side Rendering (SSR)
- ✅ Client components only where necessary
- ✅ Next.js App Router (/app directory)
- ✅ API Route Handlers (/app/api/*)
- ✅ No secrets exposed to client
- ✅ Loading states
- ✅ Error handling
- ✅ Testing (Jest + React Testing Library)
- ✅ Responsive UI

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Session Management**: iron-session
- **Validation**: Zod
- **Testing**: Jest + React Testing Library
- **Styling**: Inline CSS (for simplicity and performance)

## Project Structure

```
nextjs-ecommerce/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts
│   │   │   ├── logout/route.ts
│   │   │   └── session/route.ts
│   │   ├── categories/route.ts
│   │   └── products/
│   │       ├── route.ts
│   │       └── [id]/route.ts
│   ├── cart/
│   │   └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── products/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Error.tsx
│   ├── Header.tsx
│   ├── Loading.tsx
│   ├── ProductCard.tsx
│   └── StoreProvider.tsx
├── lib/
│   ├── session.ts
│   └── validations.ts
├── store/
│   ├── cartSlice.ts
│   ├── hooks.ts
│   └── index.ts
├── types/
│   └── index.ts
├── __tests__/
│   ├── cartSlice.test.ts
│   └── login.test.tsx
├── middleware.ts
├── next.config.js
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd nextjs-ecommerce
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and update the `SESSION_SECRET` with a strong random string (minimum 32 characters).

### Running the Application

**Development mode:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Production build:**
```bash
npm run build
npm start
```

### Testing

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Demo Credentials

Use these credentials to log in:
- **Username**: emilys
- **Password**: emilyspass

Other test users from DummyJSON API:
- michaelw / michaelwpass
- sophiab / sophiabpass

## API Endpoints Used

All API calls are proxied through Next.js API routes to keep secrets secure:

- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/session` - Check session status
- `GET /api/products` - Get products (with pagination, sorting, filtering, search)
- `GET /api/products/[id]` - Get single product
- `GET /api/categories` - Get all categories

## Key Features Explained

### Authentication Flow

1. User submits credentials on `/login`
2. Credentials are validated using Zod schema
3. API route handler calls DummyJSON API
4. On success, session is created using iron-session
5. Session data stored in HTTP-only secure cookie
6. User redirected to `/products`

### Protected Routes

Middleware (`middleware.ts`) intercepts all requests:
- Checks for valid session
- Redirects unauthenticated users to `/login`
- Redirects authenticated users away from `/login` to `/products`

### State Management

Redux Toolkit manages cart state:
- Cart items persisted to localStorage
- State initialized on app load
- Actions: add, remove, update quantity, clear cart

### Server-Side Rendering

Products page uses SSR:
- Data fetched on server via API routes
- Reduces client-side JavaScript
- Better SEO and initial load performance

### Caching Strategy

API routes use Next.js caching:
- Products: Revalidate every 1 hour
- Categories: Revalidate every 24 hours

## Environment Variables

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://dummyjson.com

# Session Secret (32+ characters)
SESSION_SECRET=your-secret-key-min-32-characters-long
```

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Netlify

1. Connect repository
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add environment variables
5. Deploy

## Testing Coverage

- ✅ Login form validation
- ✅ Login flow (success/failure)
- ✅ Cart operations (add, remove, update)
- ✅ Redux state management

## Performance Optimizations

- Server-side rendering for initial page load
- API response caching
- Image optimization with Next.js Image
- Code splitting (client components)
- Lazy loading

## Security Features

- HTTP-only secure cookies
- Session encryption (iron-session)
- CSRF protection via same-site cookies
- No API secrets in client code
- Input validation (Zod)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Known Limitations

- Cart is stored locally (not synced with backend)
- Checkout is not implemented (demo purposes)
- Limited error recovery mechanisms

## Future Enhancements

- Product detail pages
- User profile management
- Order history
- Advanced search filters
- Wishlist functionality
- Product reviews/ratings

## License

MIT

## Author

Built as a technical assessment project.

## Support

For issues or questions, please open an issue in the repository.

# Next.js Dashboard Application

A full-featured dashboard application built with Next.js 15+ (App Router), featuring authentication, database integration, and a modern UI.

## Features

- **Authentication** - Secure login with NextAuth.js
- **Dashboard** - Overview with revenue charts and latest invoices
- **Invoice Management** - Create, edit, and delete invoices
- **Customer Management** - View and search customers
- **Search & Pagination** - Filter and paginate through data
- **Modern UI** - Built with Tailwind CSS and Heroicons
- **Server Actions** - Form handling with Next.js server actions
- **Type Safety** - Full TypeScript support with Zod validation
- **Tested** - Unit tests with Vitest

## Tech Stack

- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Database:** [PostgreSQL](https://www.postgresql.org/) via [Postgres.js](https://github.com/porsager/postgres)
- **Authentication:** [NextAuth.js v5](https://next-auth.js.org/)
- **Validation:** [Zod](https://zod.dev/)
- **Icons:** [Heroicons](https://heroicons.com/)
- **Testing:** [Vitest](https://vitest.dev/)
- **Package Manager:** [pnpm](https://pnpm.io/)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- pnpm installed (`npm install -g pnpm`)
- PostgreSQL database (local or hosted)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd nextjs-dashboard
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   Copy `.env.example` to `.env` and fill in your values:

   ```bash
   cp .env.example .env
   ```

   Required environment variables:

   ```env
   # Database connection
   POSTGRES_URL="your-postgres-connection-string"

   # Authentication
   AUTH_SECRET="your-secret-key"  # Generate with: openssl rand -base64 32
   AUTH_URL="http://localhost:3000/api/auth"
   ```

4. **Set up the database**

   Follow the [Next.js Learn course](https://nextjs.org/learn/dashboard-app/setting-up-your-database) to set up your PostgreSQL database with the required schema.

5. **Run the development server**

   ```bash
   pnpm dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

```bash
# Development
pnpm dev          # Start development server with Turbopack
pnpm build        # Build for production
pnpm start        # Start production server

# Code Quality
pnpm lint         # Run ESLint

# Testing
pnpm test         # Run tests in watch mode
pnpm test:run     # Run tests once (CI mode)
pnpm test:ui      # Run tests with interactive UI
```

## Project Structure

```
├── app/
│   ├── dashboard/          # Dashboard pages
│   │   ├── (overview)/     # Dashboard home
│   │   ├── customers/      # Customer list
│   │   └── invoices/       # Invoice management
│   ├── lib/
│   │   ├── actions.ts      # Server actions
│   │   ├── data.ts         # Data fetching functions
│   │   ├── definitions.ts  # TypeScript types
│   │   └── utils.ts        # Utility functions
│   ├── ui/                 # Reusable UI components
│   ├── login/              # Login page
│   └── layout.tsx          # Root layout
├── auth.ts                 # NextAuth configuration
├── auth.config.ts          # Auth configuration
├── vitest.config.ts        # Vitest configuration
└── tailwind.config.ts      # Tailwind configuration
```

## Testing

This project uses Vitest for unit testing. See [TESTING.md](./TESTING.md) for detailed testing documentation.

**Current test coverage:**

- Utility functions (`app/lib/utils.ts`) - 24 tests

**Run tests:**

```bash
pnpm test          # Watch mode
pnpm test:run      # Run once
pnpm test:ui       # Interactive UI
```

## Key Features Explained

### Authentication

The app uses NextAuth.js v5 (beta) with credentials provider. Users can log in with email and password. Authentication is configured in `auth.ts` and `auth.config.ts`.

### Server Actions

Form submissions are handled with Next.js Server Actions in `app/lib/actions.ts`:

- `createInvoice` - Create new invoices
- `updateInvoice` - Update existing invoices
- `deleteInvoice` - Delete invoices
- `authenticate` - Handle user login

### Data Fetching

Database queries are in `app/lib/data.ts` using the Postgres.js client. All queries use parameterized statements for security.

### Form Validation

Forms are validated using Zod schemas with proper error handling and user feedback.

## Deployment

### Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Environment Variables for Production

Make sure to set these in your deployment platform:

- `POSTGRES_URL` - Your production database URL
- `AUTH_SECRET` - A secure random string
- `AUTH_URL` - Your production domain + `/api/auth`

## Learning Resources

This project is based on the [Next.js Learn Course](https://nextjs.org/learn). Check out the course curriculum for detailed explanations of:

- Next.js App Router
- Server and Client Components
- Server Actions
- Database integration
- Authentication
- And more!

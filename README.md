# Ad Locations Management Platform - Backend

This is the backend API for the Ad Locations Management Platform, built with Node.js, Express, tRPC, and Drizzle ORM.

## Features

- **tRPC API** - Type-safe API endpoints
- **Drizzle ORM** - Database management with PostgreSQL/MySQL
- **Authentication** - JWT-based authentication
- **File Uploads** - Multer for handling file uploads
- **AI Integration** - DeepSeek AI via OpenRouter
- **CORS Support** - Cross-origin resource sharing

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **API**: tRPC v11
- **Database**: PostgreSQL (Supabase) / MySQL
- **ORM**: Drizzle ORM
- **Validation**: Zod
- **Authentication**: JWT

## Prerequisites

- Node.js 18 or higher
- pnpm (or npm/yarn)
- PostgreSQL database (Supabase recommended)
- OpenRouter API key (for AI features)

## Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables (see below)
cp .env.example .env

# Run database migrations
pnpm db:push

# Start development server
pnpm dev
```

## Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL_SUPABASE=postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres

# Supabase
SUPABASE_URL=https://[PROJECT_ID].supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# OpenRouter (AI)
OPENROUTER_API_KEY=sk-or-v1-your-key-here

# JWT
JWT_SECRET=your-random-secret-key-here

# Mapbox
VITE_MAPBOX_ACCESS_TOKEN=pk.your-mapbox-token
VITE_MAPBOX_STYLE_URL=mapbox://styles/your-style

# App Config
VITE_APP_ID=ad-locations-platform
VITE_APP_TITLE=Ad Locations Management
VITE_APP_LOGO=https://your-logo-url.com/logo.png

# Owner Info
OWNER_OPEN_ID=your-manus-open-id
OWNER_NAME=Your Name

# OAuth
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im

# Built-in APIs
BUILT_IN_FORGE_API_URL=https://api.manus.im
BUILT_IN_FORGE_API_KEY=your-forge-api-key

# CORS
ALLOWED_ORIGINS=http://localhost:3000,https://your-frontend-domain.vercel.app
```

## Development

```bash
# Start development server with hot reload
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## API Endpoints

### tRPC Endpoints

All tRPC endpoints are available at `/api/trpc`

#### Authentication
- `auth.me` - Get current user
- `auth.logout` - Logout user

#### Ad Locations
- `adLocations.list` - Get all ad locations
- `adLocations.getById` - Get ad location by ID
- `adLocations.create` - Create new ad location
- `adLocations.update` - Update ad location
- `adLocations.delete` - Delete ad location

#### Landlords
- `landlords.list` - Get all landlords
- `landlords.getById` - Get landlord by ID
- `landlords.create` - Create new landlord
- `landlords.update` - Update landlord
- `landlords.delete` - Delete landlord

#### Clients
- `clients.list` - Get all clients
- `clients.getById` - Get client by ID
- `clients.create` - Create new client
- `clients.update` - Update client
- `clients.delete` - Delete client

#### Structures
- `structures.list` - Get all structures
- `structures.getById` - Get structure by ID
- `structures.getByAdLocationId` - Get structure by ad location ID
- `structures.create` - Create new structure
- `structures.update` - Update structure
- `structures.delete` - Delete structure

#### Photo Documentation
- `photoDocumentation.list` - Get photos for a structure
- `photoDocumentation.upload` - Upload new photo

#### AI Features (DeepSeek)
- `deepseek.analyzeLocation` - Analyze location photo
- `deepseek.reviewContract` - Review contract text
- `deepseek.predictMaintenance` - Predict maintenance needs
- `deepseek.generateEmail` - Generate client email
- `deepseek.enhancedPricing` - Get enhanced price estimation
- `deepseek.assistant` - General AI assistant

#### AI Features (Legacy)
- `ai.estimatePrice` - Estimate ad location price
- `ai.generateQuote` - Generate quote for client
- `ai.predictRenewal` - Predict renewal likelihood

### REST Endpoints

- `POST /api/upload` - Upload file (multipart/form-data)
- `GET /api/health` - Health check endpoint

## Database Schema

### Tables

- **users** - User accounts
- **adLocations** - Advertising locations
- **landlords** - Property owners
- **clients** - Renters/clients
- **structures** - Physical structures and maintenance
- **photoDocumentation** - Before/after photos

See `drizzle/schema.ts` for complete schema definition.

## Deployment

### Railway

1. Create new Railway project
2. Connect GitHub repository
3. Add environment variables
4. Deploy!

See `DEPLOYMENT_GUIDE.md` for detailed instructions.

### Docker (Optional)

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
```

## Project Structure

```
ad-locations-backend/
├── server/
│   ├── _core/          # Core server setup
│   │   ├── index.ts    # Express server
│   │   ├── trpc.ts     # tRPC setup
│   │   ├── context.ts  # Request context
│   │   └── ...
│   ├── db.ts           # Database queries
│   ├── routers.ts      # tRPC routers
│   ├── ai.ts           # AI features
│   ├── deepseek.ts     # DeepSeek integration
│   └── upload.ts       # File upload handler
├── drizzle/
│   ├── schema.ts       # Database schema
│   └── migrations/     # SQL migrations
├── shared/
│   └── const.ts        # Shared constants
├── package.json
├── tsconfig.json
├── drizzle.config.ts
└── README.md
```

## Testing

```bash
# Run tests (if configured)
pnpm test

# Type checking
pnpm tsc --noEmit
```

## Troubleshooting

### Database Connection Issues

```bash
# Test database connection
pnpm tsx -e "import { getDb } from './server/db'; getDb().then(db => console.log('Connected:', !!db))"
```

### CORS Errors

Ensure `ALLOWED_ORIGINS` includes your frontend URL.

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

## License

MIT

## Support

For deployment issues, see `DEPLOYMENT_GUIDE.md`
For application issues, contact your development team

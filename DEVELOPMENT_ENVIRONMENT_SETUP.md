# Development Environment Setup

## System Requirements

- **OS**: Windows 10+, macOS 11+, or Ubuntu 20.04+
- **Node.js**: 20.19.0 or higher (use nvm/fnm to manage versions)
- **npm**: 9.0.0 or higher (comes with Node.js)
- **Git**: 2.30.0 or higher

## Required Tools

### 1. Node.js & npm

**Windows (using Chocolatey)**:
```bash
choco install nodejs
```

**macOS (using Homebrew)**:
```bash
brew install node
```

**Linux (Ubuntu)**:
```bash
curl -sL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Verify installation**:
```bash
node --version   # Should be v20.19.0 or higher
npm --version    # Should be 9.0.0 or higher
```

### 2. Git

**Windows**:
```bash
choco install git
```

**macOS**:
```bash
brew install git
```

**Linux (Ubuntu)**:
```bash
sudo apt-get install git
```

### 3. PostgreSQL (for local development)

**Windows**:
```bash
choco install postgresql
```

**macOS**:
```bash
brew install postgresql
brew services start postgresql
```

**Linux (Ubuntu)**:
```bash
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Create development user**:
```bash
createuser -P devuser
createdb -O devuser software_project_dev
```

### 4. Redis (for queue system)

**Windows** (using WSL2 or Docker):
```bash
docker run -d -p 6379:6379 redis:latest
```

**macOS**:
```bash
brew install redis
brew services start redis
```

**Linux**:
```bash
sudo apt-get install redis-server
sudo systemctl start redis-server
```

### 5. RabbitMQ (optional, for message queue)

**Docker (recommended)**:
```bash
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

**Or install locally** - See [RabbitMQ docs](https://www.rabbitmq.com/download.html)

## IDE & Tools

### VS Code (Recommended)

**Install extensions**:
1. ESLint
2. Prettier - Code formatter
3. TypeScript Vue Plugin
4. GitLens
5. Thunder Client (or Postman)
6. PostgreSQL
7. Thunder Client (API testing)

**User settings (`.vscode/settings.json`)**:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.validate": ["javascript", "typescript"],
  "eslint.useFlatConfig": true,
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### Other IDEs
- **WebStorm**: Built-in support for Next.js, Prisma, and Database
- **Neovim**: With appropriate plugins (Copilot, LSP, etc.)

## Project Setup

### 1. Clone Repository

```bash
git clone https://github.com/YOUR_ORG/software-project.git
cd software-project
```

### 2. Create .env Files

Create `.env.local` file in project root:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your local settings:
```env
# Database
DATABASE_URL="postgresql://devuser:password@localhost:5432/software_project_dev"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-generate-with-openssl-rand-hex-32"
NEXTAUTH_URL="http://localhost:3000"

# Optional: AI/Chat API Keys
GEMINI_API_KEY="your-api-key"
ANTHROPIC_API_KEY="your-api-key"

# Optional: Queue System
REDIS_URL="redis://localhost:6379"
RABBITMQ_URL="amqp://guest:guest@localhost:5672"

# Logging
LOG_LEVEL="debug"
```

**Generate NEXTAUTH_SECRET**:
```bash
# Windows PowerShell
$([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32) | ForEach-Object { $_.ToString("x2") }) -join ""

# macOS/Linux
openssl rand -hex 32
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Setup Database

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed database (if seed file exists)
npx prisma db seed
```

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Verification Checklist

After setup, verify everything works:

- [ ] `npm run build` completes successfully
- [ ] `npm test` passes all tests
- [ ] `npm run lint` shows no errors
- [ ] `npm run dev` starts server without errors
- [ ] Open http://localhost:3000 in browser
- [ ] Database connection is active
- [ ] Can see development data in Prisma Studio

```bash
# Run verification
npm run build
npm test
npm run lint
npx prisma studio
```

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm start               # Start production server
npm test                # Run tests
npm test:watch          # Run tests in watch mode
npm test:coverage       # Generate coverage report
npm run lint            # Lint code
npm run lint -- --fix   # Auto-fix lint issues

# Database
npx prisma studio      # Open Prisma Studio
npx prisma migrate dev # Create new migration
npx prisma db push     # Sync schema to DB
npx prisma db seed     # Seed database

# Type checking
npx tsc --noEmit       # Check TypeScript types
npx tsc --watch        # Watch mode type checking
```

## Environment Variables Explained

| Variable | Purpose | Example |
|----------|---------|---------|
| `DATABASE_URL` | PostgreSQL connection | `postgresql://user:pass@host:5432/db` |
| `NEXTAUTH_SECRET` | NextAuth session encryption | 32-character hex string |
| `NEXTAUTH_URL` | NextAuth callback URL | `http://localhost:3000` |
| `REDIS_URL` | Redis connection | `redis://localhost:6379` |
| `LOG_LEVEL` | Logging verbosity | `debug`, `info`, `warn`, `error` |
| `NODE_ENV` | Environment type | `development`, `production` |

## Troubleshooting

### PostgreSQL Connection Error
```bash
# Check if PostgreSQL is running
# Windows: Services app or 'net start postgresql-x64-15'
# macOS: brew services list
# Linux: sudo systemctl status postgresql

# Check connection string format
# postgresql://username:password@localhost:5432/database_name
```

### Port Already in Use
```bash
# Find process using port 3000
# Windows: netstat -ano | findstr :3000
# macOS/Linux: lsof -i :3000

# Kill the process (Windows)
taskkill /PID <PID> /F

# Kill the process (macOS/Linux)
kill -9 <PID>
```

### Node Modules Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Prisma Client Issues
```bash
# Regenerate Prisma Client
npx prisma generate

# Reset database
npx prisma migrate reset
```

### Tests Failing
```bash
# Check test database
# Ensure DATABASE_URL points to test database

# Run tests with output
npm test -- --verbose

# Run specific test file
npm test -- validation.test.ts
```

## Docker Setup (Alternative)

If you prefer containerized development:

```bash
# Using docker-compose
docker-compose up -d

# Verify services are running
docker ps

# View logs
docker-compose logs -f app
```

See [DOCKER.md](./DOCKER.md) for detailed Docker setup.

## VS Code Dev Container (Optional)

For consistent development environment across team:

1. Install Remote - Containers extension
2. Click "Reopen in Container" when prompted
3. VS Code will setup everything automatically

See `.devcontainer/devcontainer.json` if it exists.

## Pre-commit Hooks

Install pre-commit hooks to catch issues before committing:

```bash
npm install husky lint-staged --save-dev
npx husky install

# Hooks will auto-run on git commit:
# - Run linter
# - Check types
# - Run unit tests
# - Format code
```

## Performance Tips

- Use `npm ci` instead of `npm install` in production
- Enable VS Code extensions only as needed
- Use `npm run dev` for active development (fast refresh)
- Run tests in watch mode: `npm test:watch`
- Use Prisma Studio for database inspection: `npx prisma studio`

## Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Jest Testing Framework](https://jestjs.io/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

## IDE Setup Videos/Guides

Bookmark these for team reference:
- VS Code setup guide (create if helpful for team)
- WebStorm setup guide (if team uses it)
- Debugging guide for the project

---

**Having issues?** Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) or open an issue.

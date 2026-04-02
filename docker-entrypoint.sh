#!/bin/sh

set -e

echo "🔧 Starting application initialization..."

# Run Prisma migrations
echo "📦 Running database migrations..."
npx prisma migrate deploy

echo "✅ Database migrations completed!"

# Start the application
echo "🚀 Starting Next.js application..."
exec "$@"

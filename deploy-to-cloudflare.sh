#!/bin/bash

# Deploy to Cloudflare Pages with environment variables

echo "Deploying to Cloudflare Pages..."

# Read environment variables from .env.local
source .env.local

# Deploy using wrangler pages
wrangler pages deploy .next \
  --project-name=autosite-saas \
  --branch=fix/fatal-errors-partial \
  --commit-dirty=true \
  --env-var="NODE_ENV=production" \
  --env-var="NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL" \
  --env-var="NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY" \
  --env-var="SUPABASE_SERVICE_ROLE_KEY=$SUPABASE_SERVICE_ROLE_KEY" \
  --env-var="OPENAI_API_KEY=$OPENAI_API_KEY" \
  --env-var="OPENAI_API_BASE=$OPENAI_API_BASE" \
  --env-var="OPENAI_MODEL=$OPENAI_MODEL" \
  --env-var="NEXT_PUBLIC_REPLICATE_API_TOKEN=$NEXT_PUBLIC_REPLICATE_API_TOKEN" \
  --env-var="NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=$NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY" \
  --env-var="STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY" \
  --env-var="STRIPE_WEBHOOK_SECRET=$STRIPE_WEBHOOK_SECRET" \
  --env-var="NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID_MONTHLY=$NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID_MONTHLY" \
  --env-var="NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID_YEARLY=$NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID_YEARLY" \
  --env-var="NEXT_PUBLIC_STRIPE_PRO_PRICE_ID_MONTHLY=$NEXT_PUBLIC_STRIPE_PRO_PRICE_ID_MONTHLY" \
  --env-var="NEXT_PUBLIC_STRIPE_PRO_PRICE_ID_YEARLY=$NEXT_PUBLIC_STRIPE_PRO_PRICE_ID_YEARLY" \
  --env-var="NEXT_PUBLIC_STRIPE_PRICE_ID_BASIC=$NEXT_PUBLIC_STRIPE_PRICE_ID_BASIC" \
  --env-var="NEXT_PUBLIC_STRIPE_PRICE_ID_PRO=$NEXT_PUBLIC_STRIPE_PRICE_ID_PRO"

echo "Deployment complete!"
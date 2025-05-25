#!/bin/bash

# Set all secrets for Cloudflare Pages project
PROJECT_NAME="autosite-saas"

# Source the .env.local file to get values
source .env.local

echo "Setting secrets for Cloudflare Pages project: $PROJECT_NAME"

# Set each secret using wrangler pages secret put
echo "$NODE_ENV" | wrangler pages secret put NODE_ENV --project-name="$PROJECT_NAME"
echo "$NEXT_PUBLIC_SUPABASE_URL" | wrangler pages secret put NEXT_PUBLIC_SUPABASE_URL --project-name="$PROJECT_NAME"
echo "$NEXT_PUBLIC_SUPABASE_ANON_KEY" | wrangler pages secret put NEXT_PUBLIC_SUPABASE_ANON_KEY --project-name="$PROJECT_NAME"
echo "$SUPABASE_SERVICE_ROLE_KEY" | wrangler pages secret put SUPABASE_SERVICE_ROLE_KEY --project-name="$PROJECT_NAME"
echo "$OPENAI_API_KEY" | wrangler pages secret put OPENAI_API_KEY --project-name="$PROJECT_NAME"
echo "$OPENAI_API_BASE" | wrangler pages secret put OPENAI_API_BASE --project-name="$PROJECT_NAME"
echo "$OPENAI_MODEL" | wrangler pages secret put OPENAI_MODEL --project-name="$PROJECT_NAME"
echo "$NEXT_PUBLIC_REPLICATE_API_TOKEN" | wrangler pages secret put NEXT_PUBLIC_REPLICATE_API_TOKEN --project-name="$PROJECT_NAME"
echo "$NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY" | wrangler pages secret put NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY --project-name="$PROJECT_NAME"
echo "$STRIPE_SECRET_KEY" | wrangler pages secret put STRIPE_SECRET_KEY --project-name="$PROJECT_NAME"
echo "$STRIPE_WEBHOOK_SECRET" | wrangler pages secret put STRIPE_WEBHOOK_SECRET --project-name="$PROJECT_NAME"
echo "$NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID_MONTHLY" | wrangler pages secret put NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID_MONTHLY --project-name="$PROJECT_NAME"
echo "$NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID_YEARLY" | wrangler pages secret put NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID_YEARLY --project-name="$PROJECT_NAME"
echo "$NEXT_PUBLIC_STRIPE_PRO_PRICE_ID_MONTHLY" | wrangler pages secret put NEXT_PUBLIC_STRIPE_PRO_PRICE_ID_MONTHLY --project-name="$PROJECT_NAME"
echo "$NEXT_PUBLIC_STRIPE_PRO_PRICE_ID_YEARLY" | wrangler pages secret put NEXT_PUBLIC_STRIPE_PRO_PRICE_ID_YEARLY --project-name="$PROJECT_NAME"
echo "$NEXT_PUBLIC_STRIPE_PRICE_ID_BASIC" | wrangler pages secret put NEXT_PUBLIC_STRIPE_PRICE_ID_BASIC --project-name="$PROJECT_NAME"
echo "$NEXT_PUBLIC_STRIPE_PRICE_ID_PRO" | wrangler pages secret put NEXT_PUBLIC_STRIPE_PRICE_ID_PRO --project-name="$PROJECT_NAME"

echo "All secrets have been set! The deployment should now work with proper configuration."
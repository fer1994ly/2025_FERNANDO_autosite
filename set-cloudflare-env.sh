#!/bin/bash

# Set environment variables for Cloudflare Pages project
PROJECT_NAME="autosite-saas"

echo "Setting environment variables for $PROJECT_NAME..."

# Source the .env.local file to get values
source .env.local

# Function to set an environment variable
set_env_var() {
    local key=$1
    local value=$2
    
    echo "Setting $key..."
    
    # Use wrangler pages secret put command
    echo "$value" | wrangler pages secret put "$key" --project-name="$PROJECT_NAME"
}

# Set all environment variables
set_env_var "NODE_ENV" "production"
set_env_var "NEXT_PUBLIC_SUPABASE_URL" "$NEXT_PUBLIC_SUPABASE_URL"
set_env_var "NEXT_PUBLIC_SUPABASE_ANON_KEY" "$NEXT_PUBLIC_SUPABASE_ANON_KEY"
set_env_var "SUPABASE_SERVICE_ROLE_KEY" "$SUPABASE_SERVICE_ROLE_KEY"
set_env_var "OPENAI_API_KEY" "$OPENAI_API_KEY"
set_env_var "OPENAI_API_BASE" "$OPENAI_API_BASE"
set_env_var "OPENAI_MODEL" "$OPENAI_MODEL"
set_env_var "NEXT_PUBLIC_REPLICATE_API_TOKEN" "$NEXT_PUBLIC_REPLICATE_API_TOKEN"
set_env_var "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY" "$NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
set_env_var "STRIPE_SECRET_KEY" "$STRIPE_SECRET_KEY"
set_env_var "STRIPE_WEBHOOK_SECRET" "$STRIPE_WEBHOOK_SECRET"
set_env_var "NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID_MONTHLY" "$NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID_MONTHLY"
set_env_var "NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID_YEARLY" "$NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID_YEARLY"
set_env_var "NEXT_PUBLIC_STRIPE_PRO_PRICE_ID_MONTHLY" "$NEXT_PUBLIC_STRIPE_PRO_PRICE_ID_MONTHLY"
set_env_var "NEXT_PUBLIC_STRIPE_PRO_PRICE_ID_YEARLY" "$NEXT_PUBLIC_STRIPE_PRO_PRICE_ID_YEARLY"
set_env_var "NEXT_PUBLIC_STRIPE_PRICE_ID_BASIC" "$NEXT_PUBLIC_STRIPE_PRICE_ID_BASIC"
set_env_var "NEXT_PUBLIC_STRIPE_PRICE_ID_PRO" "$NEXT_PUBLIC_STRIPE_PRICE_ID_PRO"

echo "All environment variables have been set!"
echo "The deployment should now succeed with the proper configuration."
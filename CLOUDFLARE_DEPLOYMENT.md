# Cloudflare Pages Deployment Guide

## 1. Environment Variables Setup

After connecting your GitHub repository to Cloudflare Pages, you need to add these environment variables in the Cloudflare Pages dashboard:

### Required Environment Variables:

```bash
# Supabase Configuration (Get from your Supabase project settings)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key
OPENAI_API_BASE=https://api.openai.com/v1
OPENAI_MODEL=gpt-4o-mini

# Replicate Configuration (For image generation)
NEXT_PUBLIC_REPLICATE_API_TOKEN=your_replicate_api_token

# Stripe Configuration (Get from your Stripe dashboard)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key

# Node Environment
NODE_ENV=production
```

### Optional Environment Variables (add when available):

```bash
# Stripe Webhook Secret (Get this from Stripe after setting up webhook endpoint)
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Stripe Price IDs (Create these in your Stripe dashboard)
NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID_MONTHLY=price_xxx
NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID_YEARLY=price_xxx
NEXT_PUBLIC_STRIPE_PRO_PRICE_ID_MONTHLY=price_xxx
NEXT_PUBLIC_STRIPE_PRO_PRICE_ID_YEARLY=price_xxx
NEXT_PUBLIC_STRIPE_PRICE_ID_BASIC=price_basic_plan_usd
NEXT_PUBLIC_STRIPE_PRICE_ID_PRO=price_pro_plan_usd
```

## 2. Deployment Steps

1. **In Cloudflare Pages Dashboard:**
   - Go to your project settings
   - Navigate to "Environment variables"
   - Click "Add variable"
   - Add each variable from the list above
   - Make sure to select "Production" environment

2. **Trigger a new deployment:**
   - Either push a new commit
   - Or manually trigger a deployment from the Cloudflare dashboard

3. **Verify deployment:**
   - Check the build logs for any errors
   - Visit your deployed site
   - Test the functionality

## 3. Post-Deployment Setup

### Stripe Webhook Configuration:
1. Go to Stripe Dashboard > Webhooks
2. Add endpoint: `https://your-domain.pages.dev/api/webhook/stripe`
3. Select events to listen for (checkout.session.completed, etc.)
4. Copy the webhook secret and add it to Cloudflare Pages environment variables

### Custom Domain (Optional):
1. In Cloudflare Pages > Custom domains
2. Add your domain
3. Follow DNS configuration instructions

## Important Notes:

- All `NEXT_PUBLIC_*` variables are exposed to the client
- Keep sensitive keys (like `STRIPE_SECRET_KEY`) secure
- The build uses placeholder values, real values are injected at runtime
- Make sure to update Stripe price IDs with your actual product prices
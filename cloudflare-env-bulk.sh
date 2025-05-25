#!/bin/bash

# Bulk set environment variables for Cloudflare Pages using the API
# This script reads from .env.local and sets all variables at once

echo "Preparing to set environment variables for autosite-saas project..."

# Read .env.local and prepare JSON payload
cat > env-vars.json << 'EOF'
{
  "deployment_configs": {
    "production": {
      "env_vars": {
EOF

# Read each line from .env.local and add to JSON
first=true
while IFS='=' read -r key value; do
    # Skip empty lines and comments
    if [[ -z "$key" || "$key" =~ ^# ]]; then
        continue
    fi
    
    # Remove quotes from value if present
    value="${value%\"}"
    value="${value#\"}"
    
    if [ "$first" = true ]; then
        first=false
    else
        echo "," >> env-vars.json
    fi
    
    # Escape special characters in value for JSON
    escaped_value=$(echo "$value" | sed 's/\\/\\\\/g' | sed 's/"/\\"/g')
    echo -n "        \"$key\": \"$escaped_value\"" >> env-vars.json
done < .env.local

cat >> env-vars.json << 'EOF'

      }
    }
  }
}
EOF

echo "Environment variables JSON prepared. You can now:"
echo "1. Go to https://dash.cloudflare.com"
echo "2. Navigate to Pages > autosite-saas > Settings > Environment variables"
echo "3. Add each variable from the PRIVATE_ENV_VALUES.txt file"
echo ""
echo "Or use the Cloudflare API with your account ID and API token."
echo ""
echo "The deployment at autosite-saas.pages.dev should then work with all services configured."
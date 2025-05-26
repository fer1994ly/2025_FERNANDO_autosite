# Migration from OpenAI to Hugging Face API

This project has been updated to use Hugging Face's OpenAI-compatible API instead of OpenAI directly.

## Environment Variables

Update your environment variables:

### Before (OpenAI)
```
OPENAI_API_KEY=your_openai_key_here
OPENAI_API_BASE=https://api.openai.com/v1
```

### After (Hugging Face)
```
HUGGINGFACE_API_KEY=hf_xxxxxxxxxxxxxxxxxxxxxxxx
HUGGINGFACE_API_BASE=https://router.huggingface.co/fireworks-ai/inference/v1
```

## Model Changes

- **Before**: `gpt-3.5-turbo`
- **After**: `accounts/fireworks/models/deepseek-r1`

## Code Changes

The main changes were made in:
- `app/api/generate-landing/route.ts` - Updated to use Hugging Face endpoint

## Benefits

1. **Cost-effective**: Hugging Face often provides more competitive pricing
2. **OpenAI Compatible**: Uses the same OpenAI SDK, minimal code changes required
3. **Alternative Models**: Access to different models like DeepSeek R1

## Setup Instructions

1. Get a Hugging Face API key from https://huggingface.co/settings/tokens
2. Update your `.env.local` file with the new variables
3. The application will automatically use the new endpoint

## Testing

You can test the API directly:

```bash
curl -X POST "https://router.huggingface.co/fireworks-ai/inference/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer hf_your_token_here" \
  -d '{
    "model": "accounts/fireworks/models/deepseek-r1",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
``` 
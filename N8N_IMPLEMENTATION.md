# N8N Implementation Guide
## Async Callback Architecture for Live Sessions

## Overview

This system implements **asynchronous n8n workflow execution** with real-time callbacks to provide a "live" user experience without timeouts or blocking requests.

### Architecture Flow
1. User submits input → Website returns `202 Accepted` immediately
2. n8n workflow runs in background
3. n8n sends progress updates to website callback endpoint
4. Frontend polls every 2 seconds to show live updates
5. Final output appears when n8n completes

---

## 1. Environment Variables

### Add to Vercel

Go to: **Project Settings → Environment Variables → Create new**

```bash
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/session
N8N_CALLBACK_SECRET=generate_a_long_random_string_here
```

**Generate secret:**
```bash
openssl rand -hex 32
```

### Add to n8n

In your n8n workflow, add the same secret as a variable or credential.

---

## 2. Standard Event Schema

### All callbacks MUST follow this format:

#### Session Started
```json
{
  "sessionId": "abc123",
  "activeAgent": "router",
  "agent": "router",
  "step": "Session started. Routing request to specialist agent.",
  "status": "started"
}
```

#### Agent Routed
```json
{
  "sessionId": "abc123",
  "activeAgent": "content",
  "agent": "content",
  "step": "Routed to Content Strategy Agent.",
  "status": "in_progress"
}
```

#### Agent Processing
```json
{
  "sessionId": "abc123",
  "activeAgent": "content",
  "agent": "content",
  "step": "Generating content ideas and hooks.",
  "status": "in_progress"
}
```

#### Final Output
```json
{
  "sessionId": "abc123",
  "activeAgent": "content",
  "agent": "content",
  "output": "Here are your content ideas:\n\n1. Hook: ...\n2. Post idea: ...",
  "status": "done"
}
```

#### Error
```json
{
  "sessionId": "abc123",
  "activeAgent": "router",
  "agent": "router",
  "error": "Failed to classify request. Please try again.",
  "status": "error"
}
```

---

## 3. N8N Workflow Configuration

### Step 1: Webhook Trigger Node

**Settings:**
- **HTTP Method:** POST
- **Response Mode:** Respond Immediately ✅
- **Response Code:** 200
- **Response Body:**
```json
{
  "ok": true,
  "sessionId": "={{$json.sessionId}}"
}
```

This makes n8n return instantly, preventing timeouts.

---

### Step 2: Add Callback Nodes

#### Node 1 — "Callback: Session Started"

**Type:** HTTP Request  
**Position:** Right after webhook trigger  
**Method:** POST  
**URL:** `={{$json.callbackUrl}}`  
**Headers:**
```json
{
  "Content-Type": "application/json",
  "x-ams-callback-secret": "YOUR_SECRET_HERE"
}
```
**Body:**
```json
{
  "sessionId": "={{$json.sessionId}}",
  "activeAgent": "router",
  "agent": "router",
  "step": "Session started. Analyzing your request.",
  "status": "started"
}
```

---

#### Node 2 — "Callback: Agent Routed"

**Type:** HTTP Request  
**Position:** After routing/classification decision  
**Method:** POST  
**URL:** `={{$json.callbackUrl}}`  
**Headers:** (same as above)  
**Body:**
```json
{
  "sessionId": "={{$json.sessionId}}",
  "activeAgent": "={{$json.agentKey}}",
  "agent": "={{$json.agentKey}}",
  "step": "Routed to selected specialist agent.",
  "status": "in_progress"
}
```

Where `agentKey` is one of:
- `strategy`
- `content`
- `funnel`
- `affiliate`
- `automation`
- `analytics`
- `store`

---

#### Node 3 — "Callback: Agent Processing"

**Type:** HTTP Request  
**Position:** Before each agent executes  
**Method:** POST  
**URL:** `={{$json.callbackUrl}}`  
**Headers:** (same as above)  
**Body:**
```json
{
  "sessionId": "={{$json.sessionId}}",
  "activeAgent": "={{$json.agentKey}}",
  "agent": "={{$json.agentKey}}",
  "step": "Agent started. Processing your request.",
  "status": "in_progress"
}
```

---

#### Node 4 — "Callback: Final Output" (REQUIRED)

**Type:** HTTP Request  
**Position:** At END of workflow  
**Method:** POST  
**URL:** `={{$json.callbackUrl}}`  
**Headers:** (same as above)  
**Body:**
```json
{
  "sessionId": "={{$json.sessionId}}",
  "activeAgent": "={{$json.agentKey}}",
  "agent": "={{$json.agentKey}}",
  "output": "={{$json.finalReply}}",
  "status": "done"
}
```

⚠️ **CRITICAL:** The `output` field MUST contain the final user-facing response as a string.

---

## 4. Security: Callback Secret

### Why?
Without auth, anyone could POST fake updates to your site.

### How it works:
1. Website checks `x-ams-callback-secret` header
2. If missing or incorrect → `401 Unauthorized`
3. If valid → Process callback

### Implementation:
- In n8n: Add secret to all HTTP Request callback nodes
- In Vercel: Add `N8N_CALLBACK_SECRET` env var
- Website automatically validates (already implemented)

---

## 5. Testing Checklist

### ✅ Test 1: Instant Response
1. Start a new session
2. You should land on `/session/{id}` within 1 second
3. Page should NOT hang or timeout

### ✅ Test 2: Live Updates Appear
1. Within 2-3 seconds, see "Session started..." message
2. See agent name change (e.g., "Content Strategy")
3. See step updates appear in real-time

### ✅ Test 3: Final Output Displays
1. After workflow completes, see green "Response" panel
2. Output should be formatted and readable
3. No raw JSON visible

### ✅ Test 4: Error Handling
1. If n8n fails, error message appears in red
2. Input form remains usable
3. No infinite loading states

---

## 6. Troubleshooting

### Issue: No live updates appear
**Check:**
- n8n callback nodes have correct `callbackUrl`
- Secret header matches Vercel env var
- Frontend is polling (check Network tab for `/api/session/{id}` calls every 2s)

### Issue: Unauthorized (401) errors in n8n logs
**Fix:**
- Verify `N8N_CALLBACK_SECRET` matches in both Vercel and n8n
- Check header name is exactly `x-ams-callback-secret`

### Issue: Output not showing
**Check:**
- Final callback includes `output` field
- `status` is set to `"done"`
- Output is a string, not an object

### Issue: Page keeps showing "Processing..."
**Check:**
- n8n sent final callback with `status: "done"`
- Polling is working (Network tab)
- No errors in browser console

---

## 7. Agent Keys Reference

These MUST match between n8n and website:

| Agent ID | Display Name | Purpose |
|----------|-------------|----------|
| `strategy` | Growth Strategy Architect | Business strategy, scaling |
| `content` | Content Strategy Agent | Content ideas, hooks |
| `funnel` | Funnel Optimization Agent | Sales funnels, conversions |
| `affiliate` | Affiliate Systems Agent | Affiliate programs |
| `automation` | Automation Design Agent | Workflows, n8n, Zapier |
| `analytics` | Data & Analytics Agent | Metrics, tracking |
| `store` | Store Setup Agent | E-commerce setup |

---

## 8. Sample n8n Callback Payload

**Paste this in your implementation to verify schema:**

```json
{
  "sessionId": "NpK4jX2mR9",
  "activeAgent": "content",
  "agent": "content",
  "step": "Analyzing your content request and generating ideas.",
  "status": "in_progress"
}
```

**Final callback example:**
```json
{
  "sessionId": "NpK4jX2mR9",
  "activeAgent": "content",
  "agent": "content",
  "output": "Here are 3 content ideas for your niche:\n\n1. Hook: 'Most people think...'\n2. Educational post about...\n3. Behind-the-scenes story...",
  "status": "done"
}
```

---

## 9. Deployment Steps

1. ✅ Add `N8N_CALLBACK_SECRET` to Vercel
2. ✅ Add secret to n8n workflow
3. ✅ Configure n8n webhook to "Respond Immediately"
4. ✅ Add callback HTTP Request nodes (5 total minimum)
5. ✅ Deploy Vercel project (auto-deploys on push to main)
6. ✅ Test end-to-end with real session

---

## 10. What's Already Implemented

✅ Async step endpoint (`/api/session/[sessionId]/step`)  
✅ Secure callback endpoint (`/api/session/update`)  
✅ Callback secret validation  
✅ Session storage with events  
✅ Live polling UI (every 2s)  
✅ Active agent display  
✅ Event feed with status indicators  
✅ Final output panel  
✅ Error handling  

**You only need to configure n8n workflows.**

---

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check n8n execution logs
3. Check browser console for errors
4. Verify all callbacks match the standard schema

**The system is production-ready. Configure n8n and test.**

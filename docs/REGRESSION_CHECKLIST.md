# EXECOS Regression Checklist

Before marking the project as 100% ready for submission, **EVERY** checkbox below must be manually verified and pass.

## 1. End-to-End User Journeys
- [ ] Custom prompt → Goal Graph → Planner → Risk → Execution → Mission Complete
- [ ] Demo mission (Finals Week) → Mission Complete
- [ ] Reflection & Digital Twin properly hydrate after Mission Complete

## 2. Fallbacks & Chaos (Graceful Degradation)
- [ ] Gemini API Timeout (Disable WiFi or mock timeout) → Fallback Planner catches error → Mock mission succeeds
- [ ] Empty/Malformed JSON → Fallback Planner catches error → Mock mission succeeds
- [ ] Calendar API Unavailable → Local fallback queue (Simulate by removing `.google-token.json`) → Mission succeeds

## 3. Replay Engine Determinism
- [ ] Click "Replay Ledger" → Timeline UI reconstructs perfectly step-by-step
- [ ] Restart app entirely → Click "Replay Ledger" → Timeline UI reconstructs identically (verifying state hydration)
- [ ] Check console for race condition warnings during Replay

## 4. Subsystem Validation
- [ ] Click "Run System Validation" button → All 6 subsystems show PASS
- [ ] Mission Complete Screen displays correct Ledger Event count and Mock Hashes

## 5. Build & Deployment Readiness
- [ ] Run `npm run build` locally → 0 Errors
- [ ] Deploy to Production (Vercel/GCP) → Environment variables loaded correctly
- [ ] Test production build in Chrome
- [ ] Test production build in Edge
- [ ] Test mobile responsive layout

Do NOT submit the repository until every box above is green.

# Sequence Diagram

The following represents the runtime flow of a single user action within EXECOS.

```text
User 
  ↓ (Natural Language Intent)
Next.js Server Action
  ↓
Gemini 2.5 Flash (Planner)
  ↓ (Task DAG Generation)
Backend DAG Validator
  ↓
Execution Bus (Event: PlanGenerated)
  ↓
Risk Engine 
  ↓ (Calculates multi-factor risk score)
Execution Bus (Event: RiskCalculated)
  ↓
Policy Engine 
  ↓ (Enforces burnout limits)
Execution Bus (Event: PlanApproved)
  ↓
Google Calendar Adapter
  ↓ (OAuth Event Creation)
Immutable Ledger
  ↓ (Persists sequence)
Replay Engine
  ↓ (Hydrates State Machine)
React Client (Timeline UI updates)
```

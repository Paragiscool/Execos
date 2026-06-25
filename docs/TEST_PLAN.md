# Test Matrix & Chaos Engineering

EXECOS is designed to gracefully degrade during failure states.

| Scenario | Subsystem | Result | Fallback Behavior |
|----------|-----------|--------|-------------------|
| Gemini timeout (>5s) | Planner | ✅ PASS | Execution Core catches timeout, instantly falls back to `MockPlanner` offline simulation. |
| Empty / null response | Planner | ✅ PASS | Rejected. Trigger retry. |
| Invalid JSON schema | Planner | ✅ PASS | Caught by schema validator. `MALFORMED_JSON_RESPONSE` thrown. |
| Circular Dependency (A->B->A) | DAG Validator | ✅ PASS | Deterministic backend graph traversal rejects cycle before state mutation. |
| Missing Node Reference | DAG Validator | ✅ PASS | Rejected if `dependencies` array references unknown ID. |
| Replay Engine desync | Ledger | ✅ PASS | Replay engine deep-clones state from scratch on every tick, eliminating race conditions. |
| Calendar API unavailable | Calendar | ✅ PASS | Queue events locally in memory until connection is restored. |
| Burnout Policy Violated | Policy Engine | ✅ PASS | Vetoes plan. Injects 1-hour buffer blocks automatically. |

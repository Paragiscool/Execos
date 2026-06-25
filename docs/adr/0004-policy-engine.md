# ADR 0004: Hardcoded Policy Engine Firewalls

## Date
2026-06-25

## Decision
Implement a deterministic, mathematically hardcoded Policy Engine that has final veto power over all AI-generated plans.

## Alternatives Considered
- **LLM-as-a-Judge:** Using a secondary LLM prompt to evaluate if the primary LLM's plan is safe.
- **No Policy Engine:** Trusting the initial Gemini prompt to follow the rules.

## Reason
LLMs are probabilistic. They will inevitably generate illegal states (e.g., scheduling 16 hours of continuous studying). An LLM-as-a-Judge introduces double the latency and double the hallucination risk. A deterministic Policy Engine (`policies.ts`) provides absolute, mathematical guarantees regarding user safety (burnout prevention) and platform stability.

## Consequences
- **Benefits:** Zero-hallucination safety boundary. Enterprise-grade compliance.

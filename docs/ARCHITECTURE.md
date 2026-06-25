# EXECOS Architecture

EXECOS is an **Agentic Operating System** built on a strictly deterministic, event-driven foundation.

## Core Modules

1. **Gemini Planner (LLM)**
   Converts natural language intent into a structured Directed Acyclic Graph (DAG) of tasks.
   
2. **Deterministic Risk Engine**
   A configuration-driven engine that evaluates the LLM's plan against 5 factors: deadline proximity, schedule load, behavioral history (Digital Twin), goal dependencies, and priority.

3. **Policy Engine**
   A mathematical firewall that acts as a final veto over all AI-generated actions to prevent burnout and ensure safety.

4. **Execution Bus & Ledger**
   An append-only cryptographic-style ledger that records every state transition. This enables perfect 1:1 state reconstruction for the Replay Engine.

5. **Replay Engine**
   Uses event sourcing to hydrate the `ExecutionContext` from scratch, enabling full explainability and UI timeline scrubbing.

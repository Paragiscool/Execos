# ADR 0002: Immutable State Machine

## Date
2026-06-25

## Decision
Treat the `ExecutionContext` as an immutable state machine where every state transition is strictly deterministic.

## Alternatives Considered
- **Mutable Global State:** Directly mutating global variables (e.g., `globalContext.tasks.push(new_task)`).
- **React Context / Redux:** Standard frontend state management.

## Reason
Because LLMs (Gemini) are non-deterministic, the platform orchestrating them MUST be strictly deterministic to ensure reliability. By utilizing an immutable state machine, we guarantee that the output state is mathematically verifiable for any given sequence of events.

## Consequences
- **Slight memory overhead:** Deep cloning the state map on every transition.
- **Benefits:** Complete elimination of race conditions. We can safely run thousands of parallel simulations of a student's week.

# ADR 0001: Event-Driven Architecture (Event Bus)

## Date
2026-06-25

## Decision
Use an Event-Driven Architecture via an async Event Bus (`ExecutionBus`) as the central nervous system of EXECOS, rather than a monolithic synchronous controller.

## Alternatives Considered
- **Synchronous Monolith:** Controller directly invokes Planner -> Risk Engine -> Policy Engine.
- **REST APIs:** Microservices communicating over HTTP.

## Reason
The execution lifecycle of a student's week is inherently asynchronous and unpredictable. An Event Bus allows us to decouple sub-agents (Planner, Risk, Policy). If a task fails or a user misses a study block, the execution engine simply emits a `MissedBlock` event, and any interested subscriber (like the Risk Engine or Digital Twin) can independently react to it.

## Consequences
- **Higher complexity in debugging:** Tracing the exact flow requires a strong observability layer.
- **Benefits:** Massive scalability. Adding a new AI agent in the future (e.g., a "Nutrition Engine") simply requires subscribing to the existing event bus without modifying core code.

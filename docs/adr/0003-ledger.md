# ADR 0003: Append-Only Execution Ledger

## Date
2026-06-25

## Decision
Use a cryptographic-style, append-only ledger to record every AI decision, rather than standard application logging.

## Alternatives Considered
- **Winston/Pino Logs:** Standard text-based logging to stdout.
- **Database CRUD:** Overwriting existing database rows when tasks change state.

## Reason
"Explainability" is the biggest hurdle for AI agents in production. If an AI decides to delete a user's study block, the user needs to know *exactly* why. An append-only ledger guarantees full auditability. Furthermore, the ledger acts as the single source of truth for the **Replay Engine**.

## Consequences
- **Higher storage cost:** We store the entire history of a task, not just its current state.
- **Benefits:** Deterministic Reconstruction. We can "rewind" time to any specific millisecond to debug exactly why Gemini hallucinated a task, or why the Policy Engine rejected a schedule.

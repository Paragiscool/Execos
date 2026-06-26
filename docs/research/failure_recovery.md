# Chaos Engineering & Failure Recovery

Generative AI models are fundamentally probabilistic. EXECOS assumes the LLM will fail and designs its architecture around graceful degradation.

## 1. Malformed Output Recovery
If the LLM returns invalid JSON or violates the requested schema (e.g., missing a required `goalId`), the generation is immediately aborted. 

*Recovery:* The Event Bus catches the error and falls back to `MockPlanner` which returns a safe, pre-compiled static execution plan to keep the user unblocked.

## 2. Hallucinated State Recovery
If the LLM generates a valid schema but hallucinated internal logic (e.g., Task C depends on non-existent Task Z, or Task A depends on Task B depends on Task A), the **Backend DAG Validator** mathematically proves the graph is invalid and throws.

*Recovery:* Same as above. The system never commits an invalid DAG to the Ledger.

## 3. Policy Violations
If the LLM generates a valid, mathematically sound graph, but it violates human-centric policies (e.g., scheduling a focus block at 3:00 AM), the hardcoded **Policy Engine** vetoes the plan.

## 4. Replay Corruption
Because the entire system state is derived from an append-only Ledger, if a corrupted event manages to bypass all firewalls, the user can manually revert the system. The `ReplayEngine` simply deletes the tail end of the ledger and perfectly reconstructs the system exactly as it was prior to the failure.

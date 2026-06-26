# System Benchmarks

Because EXECOS operates as an Agentic Operating System, bounding latency is critical. 

## The Orchestration Latency Budget
End-to-end execution of a user intent follows a strict latency budget.

| Operation | Component | Time Bound | Fallback |
|-----------|-----------|------------|----------|
| Generation | Gemini Flash | 4000ms | MockPlanner |
| Validation | DAG Validator | <5ms | Abort Event |
| Evaluation | Risk Engine | <5ms | Static Heuristic |
| Simulation| Strategy Arena| Cinematic | - |

## Replay Engine Performance
The Immutable Ledger allows instantaneous time-travel. 
Reconstructing the `ExecutionContext` from a 1,000-event ledger takes `< 15ms` in the browser via the synchronous `replayToIndex` function. This performance is achieved because the state machine mutations are strictly deterministic and require no network I/O.

# Abstracting Execution Intent: The Planner Engine

EXECOS treats Large Language Models (LLMs) fundamentally as non-deterministic translation layers, rather than trusted state machines.

## The LLM Boundary Problem
While models like Gemini 2.5 Flash are excellent at semantic understanding, they are statistically prone to hallucination when tracking complex dependencies (e.g., "Task B must follow Task A"). 

If an LLM directly manipulates an execution database, a single hallucinated foreign key or circular dependency can crash the orchestrator.

## The Deterministic DAG Solution
To solve this, EXECOS implements a hard boundary between the **Generative Space** and the **Execution Space**.

1. **Generation:** The LLM generates a proposed Directed Acyclic Graph (DAG) of execution tasks, represented as a JSON array.
2. **Validation:** Before any state is committed to the Ledger, the `GeminiPlanner` backend runs a deterministic Graph Validation algorithm.
   - It verifies all `dependency` IDs exist.
   - It performs a depth-first search (DFS) to detect circular dependencies.
3. **Rejection:** If the DAG is invalid, the operation is immediately aborted, the state is unharmed, and the system falls back to a safe pre-compiled policy graph.

This ensures that EXECOS benefits from LLM flexibility without inheriting its instability.

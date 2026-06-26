# Deterministic Risk Evaluation Engine

Unlike semantic plan generation, evaluating the risk of an execution timeline must be strictly deterministic, reproducible, and mathematically verifiable.

## Configuration-Driven Heuristics
The EXECOS Risk Engine evaluates generated plans against a statically defined weighting matrix. This isolates risk tolerance from the non-deterministic LLM output.

```typescript
const riskConfig = {
  deadlineWeight: 0.35,
  scheduleWeight: 0.25,
  historicalWeight: 0.20,
  dependencyWeight: 0.10,
  priorityWeight: 0.10
};
```

## Input Vectors
The Risk Engine continuously ingests the following vectors:
1. **Deadline Proximity:** Temporal distance to the goal's hard constraint.
2. **Schedule Load:** Calendar saturation over the next 48 hours.
3. **Behavioral Friction:** The Digital Twin's historical procrastination index.
4. **Graph Complexity:** The maximum depth of the task dependency tree.
5. **Goal Priority:** The user-defined importance scalar.

By decoupling Risk Evaluation from Generation, the system can transparently reject dangerous execution strategies before they are enacted.

# Counterfactual Decision Simulation

A hallmark of advanced autonomous systems is the ability to simulate counterfactual realities before committing to physical (or temporal) execution. EXECOS implements this via the **Decision Simulator**.

## The Strategy Arena
When an execution intent is received, EXECOS does not immediately generate a single execution plan. Instead, it generates multiple distinct Execution Strategies (e.g., Aggressive, Balanced, Conservative).

These strategies are not merely textual; they are full proposed sub-graphs.

## Expected Utility Optimization
Each generated strategy is fed into the Risk Engine, which computes its **Expected Utility** based on trade-offs:

$U = (Completion * W_c) + (Opportunity * W_o) - (Stress * W_s) - (Risk * W_r)$

By evaluating these counterfactual sub-graphs against the user's current Digital Twin state (e.g., high fatigue = high Stress weighting), EXECOS can select a globally optimal execution path, rather than a locally greedy one.

This explicitly mirrors multi-agent consensus architectures, condensed into a single orchestrator pipeline.

# AI Evaluation Framework

A critical weakness in many wrapper-based AI applications is the lack of internal evaluation. EXECOS inherently evaluates its own AI subsystems as a core function of its architecture.

## Execution Accuracy vs Generation Accuracy
EXECOS does not measure "success" by whether the LLM generated valid JSON. It measures success via **Execution Accuracy**.

When the Gemini Planner generates an estimated duration of `45 minutes` for a task, and the user's eventual completion takes `130 minutes`, the system logs an Execution Accuracy delta of `-85 minutes`.

## Subsystem Metrics
EXECOS tracks accuracy across four dimensions:
1. **Planner Accuracy:** The delta between generated task duration/dependencies and ground-truth execution.
2. **Risk Accuracy:** The correlation between High Risk scores and actual Mission Failure rates.
3. **Execution Accuracy:** The ratio of scheduled blocks adhered to vs. missed.
4. **Reflection Accuracy:** The ability of the Digital Twin updates to successfully reduce the Planner Accuracy delta over time.

By tracking these, EXECOS can be treated as a research testbed for autonomous orchestrators.

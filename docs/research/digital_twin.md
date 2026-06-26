# The Quantitative Digital Twin

Autonomous scheduling fails when it assumes humans behave like deterministic servers. EXECOS models human volatility through a continuously updating `BehavioralProfile`, referred to as the Digital Twin.

## Continuous Learning Loop
The Digital Twin is not a semantic persona; it is a matrix of quantitative execution metrics. 

Every time the user executes (or fails to execute) a scheduled block, the **Reflection Engine** emits an event:
- `taskTypeMetrics` updates parameters like `averageDelayMins` and `confidenceScore`.
- The system employs an exponential moving average (EMA) or defined `learningRate` to prevent sudden erratic shifts based on single anomalies.

## Injecting Context into the Planner
When the Gemini Planner generates strategies, it receives the Digital Twin vectors as strict system context. 

```text
[Digital Twin Context]
- Average Start Delay: 130 minutes
- Max Focus Duration: 45 minutes
```

This closes the loop: the system observes human failure, updates the Twin, and the next generated plan automatically pads task durations to absorb the statistical delay.

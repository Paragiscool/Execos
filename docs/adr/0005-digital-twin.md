# ADR 0005: Quantitative Digital Twin

## Date
2026-06-25

## Decision
The `BehavioralProfile` (Digital Twin) must learn via strict quantitative feedback loops from the execution engine, tracking `averageDelayMins`, `confidenceScore`, and `sampleCount`.

## Alternatives Considered
- **Vector Database RAG:** Storing user behavior as raw text and injecting it into the LLM prompt.

## Reason
Text-based RAG ("The user is bad at coding") is subjective and prone to misinterpretation by the LLM. Quantitative metrics allow our backend Risk Engine to apply deterministic math: if the user's `averageDelayMins` for Coding is 45 minutes across 12 samples with high confidence, the Risk Engine will automatically pad the schedule by 45 minutes *before* the LLM even sees the plan.

## Consequences
- **Benefits:** Real, adaptive machine learning. The system objectively improves over time without requiring expensive LLM fine-tuning.

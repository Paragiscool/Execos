# EXECOS: Autonomous Execution Intelligence

> **We don't need another to-do list. We need an execution engine.**

## 1. Executive Summary

EXECOS is an **Autonomous Execution Operating System**. It continuously observes your constraints, generates counterfactual execution strategies, mathematically evaluates their utility, and actively orchestrates your timeline. It acts as an active verification engineer for your life.

<!-- Replace with your actual screenshot -->
![Mission Control Dashboard](docs/images/01-dashboard.png)
*The Mission Control Dashboard, featuring the Immutable Ledger Feed, the Execution Timeline, and real-time Digital Twin Analytics.*

---

## 2. The Problem

Human execution is highly volatile. We misestimate task durations, ignore opportunity costs, and fail to adapt our plans when unexpected conflicts arise. We spend more time organizing our work than actually executing it.

## 3. Why Existing Productivity Apps Fail

Most AI productivity tools are fundamentally passive: they take your commands, generate a static plan, and wait for you to fail. They act as glorified text editors. They do not simulate alternative futures, they do not understand risk, and they do not mathematically learn from your past failures.

## 4. What Makes EXECOS Different?

| Typical AI Task Manager | EXECOS                             |
| ----------------------- | ---------------------------------- |
| Single plan             | Multi-strategy decision simulation |
| Static reminders        | Continuous execution monitoring    |
| Hidden reasoning        | Explainable decision journal       |
| Mutable state           | Immutable event ledger             |
| Manual rescheduling     | Deterministic replay & replanning  |
| Generic personalization | Quantitative Digital Twin          |

---

## 5. System Architecture

EXECOS is built on a strict, deterministic cognitive architecture:
1. **Goal Intelligence Layer**: Translates messy user intent into a structured Goal Graph.
2. **Decision Layer (Gemini)**: Uses specialized modules (Planner, Risk Engine) to generate counterfactual execution strategies and assess timeline risks.
3. **Policy Engine**: Validates every AI decision against strict user-defined boundaries (e.g., "Never move a scheduled interview").
4. **Event-Driven Execution**: Uses a strictly typed Event Bus and Execution State Machine to coordinate actions.
5. **Immutable Ledger**: Records every decision, prompt version, and confidence score for total explainability.

## 6. Live Execution Walkthrough

<!-- Replace with your actual screenshot -->
![Timeline Execution](docs/images/04-timeline.png)
*The Execution Timeline explicitly logs the Decision Source (Planner → Risk Engine → Policy → Scheduled) and Expected Utility for every task.*

## 7. AI Decision Lifecycle (The Decision Simulator)

Instead of asking an LLM to blindly generate "a schedule," EXECOS forces the AI to generate **three distinct counterfactual strategies** (e.g., Aggressive, Balanced, Conservative). The deterministic **Risk Engine** then scores each strategy based on strict utility parameters.

<!-- Replace with your actual screenshot -->
![Decision Simulator](docs/images/02-decision-simulator.png)
*Evaluates multiple execution strategies before committing to a plan.*

## 8. Engineering Decisions

Check out the `/docs` folder for deep dives into our system architecture and ADRs (Architecture Decision Records):
* [`ARCHITECTURE.md`](docs/ARCHITECTURE.md)
* [`STATE_MACHINE.md`](docs/STATE_MACHINE.md)
* [`SEQUENCE.md`](docs/SEQUENCE.md)

Read our technical whitepapers in the `/docs/research` folder:
* [`planner.md`](docs/research/planner.md) - The DAG Validation Boundary
* [`risk_model.md`](docs/research/risk_model.md) - Deterministic Heuristics
* [`digital_twin.md`](docs/research/digital_twin.md) - Continuous Learning Loops

## 9. Evaluation & Benchmarks

To prove that EXECOS actually improves execution, the system includes a built-in **Evaluation Engine**.

<!-- Replace with your actual screenshot -->
![Evaluation Dashboard](docs/images/07-evaluation.png)
*Quantitatively proves system learning and execution accuracy over time.*

<!-- Replace with your actual screenshot -->
![Benchmarks](docs/images/06-benchmarks.png)
*Validates optimization utility across diverse execution workloads.*

## 10. Reliability & Safety

Large Language Models hallucinate. EXECOS treats LLMs as untrusted generation layers. Before any AI decision is committed to the Ledger, it must pass through the **Policy Engine**—a hardcoded verification layer that mathematically checks for circular DAG dependencies and scheduling constraints.

## 11. Demo Scenarios

Run the **Finals Week** mission or construct a **Custom** prompt directly from the Mission Control Bar. Watch the Execution State Machine transition from PLANNING to SIMULATING to EXECUTING.

<!-- Replace with your actual screenshot -->
![Mission Report](docs/images/08-mission-report.png)
*The final Execution Intelligence Report quantifies the exact value added by the AI orchestration.*

## 12. Future Work

* **Multi-Agent Orchestration**: Delegating execution blocks to specialized sub-agents.
* **Continuous Cloud Sync**: Background synchronization of the Immutable Ledger across devices.

---

## 🛠 Tech Stack

* **Frontend:** Next.js (App Router), React, Tailwind CSS, Framer Motion
* **Intelligence:** Google Gemini 1.5 Pro / Flash
* **State Management:** Custom Event-Sourced Replay Engine
* **Auth & DB:** Firebase, Google OAuth

## 🚀 Getting Started

1. Clone the repository.
2. Copy `.env.example` to `.env.local` and add your Gemini API Key.
3. Install dependencies: `npm install`
4. Run the development server: `npm run dev`
5. Visit `http://localhost:3000` to access Mission Control.

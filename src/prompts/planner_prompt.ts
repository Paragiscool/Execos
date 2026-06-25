// EXECOS - Planner Agent Prompt

export const PLANNER_SYSTEM_PROMPT = `
You are the EXECOS Planner Agent. Your ONLY job is to take an abstract human intent and output a structured list of actionable tasks.

Do not return conversational text, markdown formatting, or any preamble. You must return ONLY a JSON object that matches the exact schema requested.

<Rules>
1. Break down the user's goal into realistic, atomic tasks.
2. Estimate the duration of each task in minutes (minimum 15, maximum 180).
3. Assign a priority score (1 = Lowest, 100 = Highest).
4. Do NOT attempt to schedule these tasks (that is the Executor's job).
5. Output strict JSON.
</Rules>
`;

export const PLANNER_RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    goalId: { type: "string" },
    goalTitle: { type: "string" },
    tasks: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          estimatedDurationMins: { type: "integer" },
          priority: { type: "integer" }
        },
        required: ["title", "estimatedDurationMins", "priority"]
      }
    }
  },
  required: ["goalId", "goalTitle", "tasks"]
};

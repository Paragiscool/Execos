// EXECOS - Scenario 3: Chaotic Professional
import { MissionScenario } from '../simulation/MissionOrchestrator';

export const chaoticProfessionalMission: MissionScenario = {
  missionId: "chaotic_professional",
  title: "Chaotic Professional",
  initialGoals: [
    {
      id: "goal_work_1",
      title: "Ship Q3 Roadmap",
      deadline: "2026-06-30T17:00:00Z",
      rawInput: "I have 4 client calls today, I need to go to the gym, and ship the Q3 roadmap."
    }
  ],
  scriptedInterruptions: [
    {
      atMinutes: 45,
      type: "MISSED_TASK",
      payload: { taskId: "task_gym_1" }
    },
    {
      atMinutes: 180,
      type: "MEETING_CANCELLED",
      payload: { freedMinutes: 60 }
    }
  ]
};

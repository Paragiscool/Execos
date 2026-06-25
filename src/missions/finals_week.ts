// EXECOS - Scenario 1: Graduate Without Missing Anything
import { MissionScenario } from '../simulation/MissionOrchestrator';

export const finalsWeekMission: MissionScenario = {
  missionId: "finals_week",
  title: "Graduate Without Missing Anything",
  initialGoals: [
    {
      id: "goal_finals_1",
      title: "Pass DSA Final",
      deadline: "2026-06-28T15:00:00Z",
      rawInput: "I have my DSA final on Friday and a portfolio due."
    }
  ],
  scriptedInterruptions: [
    {
      atMinutes: 120, // 2 hours into simulation
      type: "MISSED_TASK",
      payload: { taskId: "task_dsa_study_1" }
    }
  ]
};

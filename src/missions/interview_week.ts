// EXECOS - Scenario 2: Interview Week
import { MissionScenario } from '../simulation/MissionOrchestrator';

export const interviewWeekMission: MissionScenario = {
  missionId: "interview_week",
  title: "Interview Week",
  initialGoals: [
    {
      id: "goal_interview_1",
      title: "Google APM Interview",
      deadline: "2026-06-29T10:00:00Z",
      rawInput: "I have a Google APM interview on Wednesday and I need to update my portfolio."
    }
  ],
  scriptedInterruptions: [
    {
      atMinutes: 60,
      type: "MEETING_CANCELLED", // Simulates the Opportunity Engine triggering
      payload: { freedMinutes: 90 }
    }
  ]
};

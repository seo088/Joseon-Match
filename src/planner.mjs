import { assignments, courses } from "./campusData.mjs";

export function findCourse(courseId) {
  return courses.find((course) => course.id === courseId);
}

export function findAssignment(assignmentId) {
  return assignments.find((assignment) => assignment.id === assignmentId);
}

export function daysUntil(dueDate, today = "2026-07-16") {
  const base = new Date(`${today}T00:00:00+09:00`);
  const due = new Date(`${dueDate}T00:00:00+09:00`);
  return Math.ceil((due.getTime() - base.getTime()) / 86400000);
}

export function listAssignments({ status = "all", courseId = "all", daysAhead = 30, today = "2026-07-16" } = {}) {
  return assignments
    .map((assignment) => ({
      ...assignment,
      courseName: findCourse(assignment.courseId)?.name ?? assignment.courseId,
      daysLeft: daysUntil(assignment.dueDate, today)
    }))
    .filter((assignment) => status === "all" || assignment.status === status)
    .filter((assignment) => courseId === "all" || assignment.courseId === courseId)
    .filter((assignment) => assignment.daysLeft <= daysAhead)
    .sort((a, b) => a.daysLeft - b.daysLeft || b.estimatedHours - a.estimatedHours);
}

export function planStudyWeek({ availableHours = 10, today = "2026-07-16" } = {}) {
  const upcoming = listAssignments({ daysAhead: 14, today });
  const totalWeight = upcoming.reduce((sum, item) => {
    const urgency = Math.max(1, 15 - item.daysLeft);
    const priority = item.priority === "high" ? 2 : 1;
    return sum + urgency * priority * item.estimatedHours;
  }, 0);

  return upcoming.map((item) => {
    const urgency = Math.max(1, 15 - item.daysLeft);
    const priority = item.priority === "high" ? 2 : 1;
    const weight = urgency * priority * item.estimatedHours;
    const hours = totalWeight === 0 ? 0 : Math.max(1, Math.round((availableHours * weight) / totalWeight));
    return {
      assignmentId: item.id,
      title: item.title,
      courseName: item.courseName,
      dueDate: item.dueDate,
      daysLeft: item.daysLeft,
      recommendedHours: hours,
      nextAction: item.checklist.find(Boolean)
    };
  });
}

export function checkSubmissionReady({ assignmentId, completedItems = [] }) {
  const assignment = findAssignment(assignmentId);

  if (!assignment) {
    return {
      assignmentId,
      ready: false,
      completionRate: 0,
      missingItems: ["알 수 없는 과제 ID입니다."]
    };
  }

  const completed = new Set(completedItems);
  const missingItems = assignment.checklist.filter((item) => !completed.has(item));
  const completionRate = Math.round(((assignment.checklist.length - missingItems.length) / assignment.checklist.length) * 100);

  return {
    assignmentId,
    title: assignment.title,
    ready: missingItems.length === 0,
    completionRate,
    missingItems
  };
}

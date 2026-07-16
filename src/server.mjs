import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { fileURLToPath } from "node:url";
import * as z from "zod/v4";
import { assignments, courses, gradingRubric } from "./campusData.mjs";
import { checkSubmissionReady, listAssignments, planStudyWeek } from "./planner.mjs";

export function createServer() {
  const server = new McpServer({
    name: "campus-study-planner",
    version: "1.0.0"
  });

  server.registerResource(
    "courses",
    "campus://courses",
    {
      title: "수강 과목 목록",
      description: "과제 계획에 사용할 수강 과목과 주간 학습 시간 정보",
      mimeType: "application/json"
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "application/json",
          text: JSON.stringify(courses, null, 2)
        }
      ]
    })
  );

  server.registerResource(
    "assignments",
    "campus://assignments",
    {
      title: "과제 목록",
      description: "마감일, 우선순위, 체크리스트가 포함된 과제 데이터",
      mimeType: "application/json"
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "application/json",
          text: JSON.stringify(assignments, null, 2)
        }
      ]
    })
  );

  server.registerResource(
    "grading-rubric",
    "campus://grading-rubric",
    {
      title: "제출 평가 기준",
      description: "MCP 프로젝트 제출물의 자체 점검용 평가 기준",
      mimeType: "application/json"
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "application/json",
          text: JSON.stringify(gradingRubric, null, 2)
        }
      ]
    })
  );

  server.registerTool(
    "list_assignments",
    {
      title: "과제 조회",
      description: "상태, 과목, 기간 조건으로 과제 목록을 조회합니다.",
      inputSchema: {
        status: z.enum(["all", "todo", "in-progress", "done"]).default("all"),
        courseId: z.string().default("all"),
        daysAhead: z.number().int().min(1).max(365).default(30),
        today: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).default("2026-07-16")
      }
    },
    async (args) => ({
      content: [
        {
          type: "text",
          text: JSON.stringify(listAssignments(args), null, 2)
        }
      ]
    })
  );

  server.registerTool(
    "plan_study_week",
    {
      title: "주간 학습 계획 생성",
      description: "마감일과 우선순위를 기반으로 이번 주 권장 학습 시간을 배분합니다.",
      inputSchema: {
        availableHours: z.number().int().min(1).max(80).default(10),
        today: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).default("2026-07-16")
      }
    },
    async (args) => ({
      content: [
        {
          type: "text",
          text: JSON.stringify(planStudyWeek(args), null, 2)
        }
      ]
    })
  );

  server.registerTool(
    "check_submission_ready",
    {
      title: "제출 준비도 점검",
      description: "완료한 체크리스트를 기준으로 과제 제출 가능 여부를 확인합니다.",
      inputSchema: {
        assignmentId: z.string(),
        completedItems: z.array(z.string()).default([])
      }
    },
    async (args) => ({
      content: [
        {
          type: "text",
          text: JSON.stringify(checkSubmissionReady(args), null, 2)
        }
      ]
    })
  );

  server.registerPrompt(
    "assignment_breakdown",
    {
      title: "과제 분해 프롬프트",
      description: "선택한 과제를 작은 실행 단계로 나누도록 요청하는 프롬프트입니다.",
      argsSchema: {
        assignmentTitle: z.string(),
        dueDate: z.string(),
        remainingHours: z.string().default("3")
      }
    },
    async ({ assignmentTitle, dueDate, remainingHours }) => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `${assignmentTitle} 과제를 ${dueDate}까지 끝내야 합니다. 남은 시간은 ${remainingHours}시간입니다. 제출 가능한 단위로 작업을 쪼개고, 우선순위와 검증 방법을 함께 제안해 주세요.`
          }
        }
      ]
    })
  );

  server.registerPrompt(
    "weekly_study_coach",
    {
      title: "주간 학습 코치 프롬프트",
      description: "주간 학습 가능 시간에 맞춘 실행 계획을 요청하는 프롬프트입니다.",
      argsSchema: {
        availableHours: z.string().default("10"),
        stressLevel: z.enum(["low", "medium", "high"]).default("medium")
      }
    },
    async ({ availableHours, stressLevel }) => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `이번 주 학습 가능 시간은 ${availableHours}시간이고 피로도는 ${stressLevel}입니다. 마감이 가까운 과제를 먼저 끝내되, 무리하지 않는 일정표와 하루별 목표를 만들어 주세요.`
          }
        }
      ]
    })
  );

  return server;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const transport = new StdioServerTransport();
  const server = createServer();
  await server.connect(transport);
}

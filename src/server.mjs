import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { fileURLToPath } from "node:url";
import * as z from "zod/v4";

export function createServer() {
  const server = new McpServer({
    name: "joseon-career-oracle",
    version: "1.0.0"
  });

  server.registerResource(
    "project-plan",
    "joseon://project-plan",
    {
      title: "프로젝트 구현 계획",
      description: "현대판 조선시대 직업/관상 테스트 MCP의 구현 범위와 단계",
      mimeType: "application/json"
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "application/json",
          text: JSON.stringify({
            topic: "현대판 조선시대 직업/관상 테스트",
            flow: [
              "사용자 고민 또는 관심사 입력",
              "키워드와 성향 단서 추출",
              "조선시대 직업군/인물 데이터와 매칭",
              "결과 캐릭터, 이유, 추천 행동 출력"
            ],
            requiredMcpItems: {
              tools: [
                "analyze_user_profile",
                "match_joseon_role",
                "generate_questionnaire"
              ],
              resources: [
                "joseon://role-seed",
                "joseon://project-plan"
              ],
              prompts: [
                "profile_interview",
                "result_writer"
              ]
            }
          }, null, 2)
        }
      ]
    })
  );

  server.registerResource(
    "role-seed",
    "joseon://role-seed",
    {
      title: "조선시대 직업군 샘플 데이터",
      description: "초기 개발과 Harness 검증에 사용할 직업군 샘플",
      mimeType: "application/json"
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "application/json",
          text: JSON.stringify([
            {
              id: "jeongisu",
              name: "전기수",
              summary: "저잣거리에서 이야기를 생생하게 읽어 주던 낭독가",
              traits: ["표현력", "설득", "사교성", "이야기"]
            },
            {
              id: "uigeumbu-dosa",
              name: "의금부 도사",
              summary: "사건의 실마리를 추적하고 질서를 바로잡던 관원",
              traits: ["분석", "정의감", "집중력", "원칙"]
            },
            {
              id: "hwawon",
              name: "도화서 화원",
              summary: "관청에서 그림과 기록 이미지를 담당하던 전문 화가",
              traits: ["관찰", "창작", "미감", "섬세함"]
            }
          ], null, 2)
        }
      ]
    })
  );

  server.registerTool(
    "analyze_user_profile",
    {
      title: "사용자 성향 분석",
      description: "사용자 입력에서 관심사와 성향 키워드를 추출하는 자리 표시자 Tool입니다.",
      inputSchema: {
        userText: z.string().min(1)
      }
    },
    async ({ userText }) => ({
      content: [
        {
          type: "text",
          text: JSON.stringify({
            userText,
            status: "setup-only",
            message: "환경 세팅 단계입니다. 다음 단계에서 키워드 추출 로직을 구현합니다."
          }, null, 2)
        }
      ]
    })
  );

  server.registerTool(
    "match_joseon_role",
    {
      title: "조선시대 직업 매칭",
      description: "성향 키워드를 조선시대 직업군과 매칭하는 자리 표시자 Tool입니다.",
      inputSchema: {
        keywords: z.array(z.string()).default([])
      }
    },
    async (args) => ({
      content: [
        {
          type: "text",
          text: JSON.stringify({
            keywords: args.keywords,
            status: "setup-only",
            message: "환경 세팅 단계입니다. 다음 단계에서 점수 기반 매칭 알고리즘을 구현합니다."
          }, null, 2)
        }
      ]
    })
  );

  server.registerTool(
    "generate_questionnaire",
    {
      title: "간단 검사지 생성",
      description: "AI 판단용 질문지를 생성하는 자리 표시자 Tool입니다.",
      inputSchema: {
        count: z.number().int().min(3).max(10).default(5)
      }
    },
    async ({ count }) => ({
      content: [
        {
          type: "text",
          text: JSON.stringify({
            count,
            status: "setup-only",
            message: "환경 세팅 단계입니다. 다음 단계에서 검사지 문항을 구현합니다."
          }, null, 2)
        }
      ]
    })
  );

  server.registerPrompt(
    "profile_interview",
    {
      title: "성향 인터뷰 프롬프트",
      description: "사용자의 고민과 관심사를 끌어내는 인터뷰 프롬프트입니다.",
      argsSchema: {
        topic: z.string().default("진로와 성향")
      }
    },
    async ({ topic }) => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `${topic}을 바탕으로 조선시대 직업군 매칭에 필요한 성향 질문 5개를 만들어 주세요. 질문은 짧고 답하기 쉬워야 합니다.`
          }
        }
      ]
    })
  );

  server.registerPrompt(
    "result_writer",
    {
      title: "결과 카드 작성 프롬프트",
      description: "매칭된 조선시대 직업 결과를 재미있고 설득력 있게 작성하는 프롬프트입니다.",
      argsSchema: {
        roleName: z.string(),
        reason: z.string().default("성향 키워드가 잘 맞습니다.")
      }
    },
    async ({ roleName, reason }) => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `사용자의 조선시대 매칭 결과는 ${roleName}입니다. 이유는 "${reason}"입니다. 결과 제목, 한 줄 해설, 강점 3개, 현대식 조언 1개를 재미있게 작성해 주세요.`
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

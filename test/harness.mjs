import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");

function parseTextJson(result) {
  const textBlock = result.content.find((item) => item.type === "text");
  assert.ok(textBlock, "텍스트 응답이 있어야 합니다.");
  return JSON.parse(textBlock.text);
}

async function main() {
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: [join(rootDir, "src", "server.mjs")],
    cwd: rootDir,
    stderr: "pipe"
  });

  const client = new Client({
    name: "campus-study-planner-harness",
    version: "1.0.0"
  });

  await client.connect(transport);

  try {
    const tools = await client.listTools();
    const toolNames = tools.tools.map((tool) => tool.name).sort();
    assert.deepEqual(toolNames, [
      "check_submission_ready",
      "list_assignments",
      "plan_study_week"
    ]);

    const resources = await client.listResources();
    const resourceUris = resources.resources.map((resource) => resource.uri).sort();
    assert.deepEqual(resourceUris, [
      "campus://assignments",
      "campus://courses",
      "campus://grading-rubric"
    ]);

    const prompts = await client.listPrompts();
    const promptNames = prompts.prompts.map((prompt) => prompt.name).sort();
    assert.deepEqual(promptNames, [
      "assignment_breakdown",
      "weekly_study_coach"
    ]);

    const assignmentsResource = await client.readResource({ uri: "campus://assignments" });
    const assignments = JSON.parse(assignmentsResource.contents[0].text);
    assert.equal(assignments[0].id, "mcp-demo");

    const listed = parseTextJson(await client.callTool({
      name: "list_assignments",
      arguments: { status: "in-progress", daysAhead: 14, today: "2026-07-16" }
    }));
    assert.equal(listed.length, 1);
    assert.equal(listed[0].title, "Codex 기반 MCP 프로젝트 구축 및 시연");

    const weeklyPlan = parseTextJson(await client.callTool({
      name: "plan_study_week",
      arguments: { availableHours: 12, today: "2026-07-16" }
    }));
    assert.ok(weeklyPlan[0].recommendedHours >= 1);
    assert.equal(weeklyPlan[0].assignmentId, "mcp-demo");

    const readiness = parseTextJson(await client.callTool({
      name: "check_submission_ready",
      arguments: {
        assignmentId: "mcp-demo",
        completedItems: [
          "개별 주제 선정",
          "MCP Tool 구현",
          "MCP Resource 구현"
        ]
      }
    }));
    assert.equal(readiness.ready, false);
    assert.ok(readiness.missingItems.includes("MCP Prompt 구현"));

    const prompt = await client.getPrompt({
      name: "assignment_breakdown",
      arguments: {
        assignmentTitle: "Codex 기반 MCP 프로젝트 구축 및 시연",
        dueDate: "2026-07-22",
        remainingHours: "5"
      }
    });
    assert.match(prompt.messages[0].content.text, /작업을 쪼개고/);

    console.log("MCP Harness 검증 통과");
    console.log(`- Tools: ${toolNames.join(", ")}`);
    console.log(`- Resources: ${resourceUris.join(", ")}`);
    console.log(`- Prompts: ${promptNames.join(", ")}`);
  } finally {
    await client.close();
  }
}

main().catch((error) => {
  console.error("MCP Harness 검증 실패");
  console.error(error);
  process.exitCode = 1;
});

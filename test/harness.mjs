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
    name: "joseon-career-oracle-harness",
    version: "1.0.0"
  });

  await client.connect(transport);

  try {
    const tools = await client.listTools();
    const toolNames = tools.tools.map((tool) => tool.name).sort();
    assert.deepEqual(toolNames, [
      "analyze_user_profile",
      "generate_questionnaire",
      "match_joseon_role"
    ]);

    const resources = await client.listResources();
    const resourceUris = resources.resources.map((resource) => resource.uri).sort();
    assert.deepEqual(resourceUris, [
      "joseon://project-plan",
      "joseon://role-seed"
    ]);

    const prompts = await client.listPrompts();
    const promptNames = prompts.prompts.map((prompt) => prompt.name).sort();
    assert.deepEqual(promptNames, [
      "profile_interview",
      "result_writer"
    ]);

    const roleSeedResource = await client.readResource({ uri: "joseon://role-seed" });
    const roles = JSON.parse(roleSeedResource.contents[0].text);
    assert.equal(roles[0].id, "jeongisu");

    const analysis = parseTextJson(await client.callTool({
      name: "analyze_user_profile",
      arguments: { userText: "나는 사람 만나는 걸 좋아하고 말로 설득하는 게 자신 있어." }
    }));
    assert.equal(analysis.status, "setup-only");

    const match = parseTextJson(await client.callTool({
      name: "match_joseon_role",
      arguments: { keywords: ["설득", "사교성"] }
    }));
    assert.equal(match.status, "setup-only");

    const questionnaire = parseTextJson(await client.callTool({
      name: "generate_questionnaire",
      arguments: { count: 5 }
    }));
    assert.equal(questionnaire.status, "setup-only");

    const prompt = await client.getPrompt({
      name: "result_writer",
      arguments: {
        roleName: "전기수",
        reason: "사람을 만나고 말로 설득하는 성향이 강합니다."
      }
    });
    assert.match(prompt.messages[0].content.text, /전기수/);

    console.log("조선시대 직업 테스트 MCP 환경 검증 통과");
    console.log(`- Tools: ${toolNames.join(", ")}`);
    console.log(`- Resources: ${resourceUris.join(", ")}`);
    console.log(`- Prompts: ${promptNames.join(", ")}`);
  } finally {
    await client.close();
  }
}

main().catch((error) => {
  console.error("조선시대 직업 테스트 MCP 환경 검증 실패");
  console.error(error);
  process.exitCode = 1;
});

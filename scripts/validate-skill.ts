#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { basename, join, resolve } from "node:path";

type Frontmatter = Record<string, string>;

const skillDir = resolve(process.argv[2] ?? "agent-task-contract");
const errors: string[] = [];
const warnings: string[] = [];

function fail(message: string): void {
  errors.push(message);
}

function warn(message: string): void {
  warnings.push(message);
}

function read(path: string): string {
  return readFileSync(path, "utf8");
}

function fileExists(path: string): boolean {
  return existsSync(path) && statSync(path).isFile();
}

function dirExists(path: string): boolean {
  return existsSync(path) && statSync(path).isDirectory();
}

function parseFrontmatter(markdown: string): Frontmatter | null {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) return null;

  const data: Frontmatter = {};
  for (const line of match[1].split(/\r?\n/)) {
    const field = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!field) continue;
    data[field[1]] = field[2].replace(/^["']|["']$/g, "").trim();
  }
  return data;
}

if (!dirExists(skillDir)) {
  fail(`Skill directory does not exist: ${skillDir}`);
} else {
  const expectedName = basename(skillDir);
  const skillPath = join(skillDir, "SKILL.md");
  const agentsPath = join(skillDir, "agents", "openai.yaml");

  if (!fileExists(skillPath)) {
    fail("Missing SKILL.md");
  } else {
    const skill = read(skillPath);
    const frontmatter = parseFrontmatter(skill);

    if (!frontmatter) {
      fail("SKILL.md must start with YAML frontmatter");
    } else {
      const skillName = frontmatter.name ?? "";
      const description = frontmatter.description ?? "";

      if (skillName !== expectedName) {
        fail(`Frontmatter name must equal folder name: expected ${expectedName}, got ${skillName}`);
      }

      if (!/^[a-z0-9-]{1,64}$/.test(skillName)) {
        fail("Skill name must use lowercase letters, digits, and hyphens only, max 64 chars");
      }

      if (!description || description.includes("TODO")) {
        fail("Frontmatter description is missing or still contains TODO");
      } else if (description.length < 120) {
        warn("Frontmatter description is short; include concrete trigger contexts");
      }
    }

    const referencesDir = join(skillDir, "references");
    if (dirExists(referencesDir)) {
      for (const entry of readdirSync(referencesDir)) {
        if (entry.endsWith(".md") && !skill.includes(`references/${entry}`)) {
          warn(`Reference file is not linked from SKILL.md: references/${entry}`);
        }
      }
    }

    for (const forbidden of ["README.md", "CHANGELOG.md", "CONTRIBUTING.md"]) {
      if (fileExists(join(skillDir, forbidden))) {
        fail(`Do not put repository documentation inside the skill folder: ${forbidden}`);
      }
    }
  }

  if (!fileExists(agentsPath)) {
    fail("Missing agents/openai.yaml");
  } else {
    const openaiYaml = read(agentsPath);
    if (!openaiYaml.includes("display_name:")) fail("agents/openai.yaml missing display_name");
    if (!openaiYaml.includes("short_description:")) fail("agents/openai.yaml missing short_description");
    if (!openaiYaml.includes(`$${expectedName}`)) {
      fail(`agents/openai.yaml default_prompt must mention $${expectedName}`);
    }
  }
}

for (const warning of warnings) {
  console.warn(`Warning: ${warning}`);
}

if (errors.length) {
  for (const error of errors) {
    console.error(`Error: ${error}`);
  }
  process.exit(1);
}

console.log(`Skill validation passed: ${skillDir}`);

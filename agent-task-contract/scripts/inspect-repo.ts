#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { execFileSync } from "node:child_process";

type PackageJson = {
  scripts?: Record<string, string>;
};

const startDir = resolve(process.argv[2] ?? process.cwd());

function run(command: string, args: string[], cwd: string): string {
  try {
    return execFileSync(command, args, {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"]
    }).trim();
  } catch {
    return "";
  }
}

function fileExists(path: string): boolean {
  return existsSync(path) && statSync(path).isFile();
}

function readJson<T>(path: string): T | null {
  try {
    return JSON.parse(readFileSync(path, "utf8")) as T;
  } catch {
    return null;
  }
}

const gitRootOutput = run("git", ["rev-parse", "--show-toplevel"], startDir);
const repoRoot = gitRootOutput ? resolve(gitRootOutput) : startDir;
const gitStatus = gitRootOutput ? run("git", ["status", "--short", "--branch"], repoRoot) : "";
const branch = gitRootOutput ? run("git", ["branch", "--show-current"], repoRoot) : "";

const instructionCandidates = [
  "AGENTS.md",
  "CLAUDE.md",
  "README.md",
  ".github/copilot-instructions.md",
  ".cursor/rules",
  ".cursorrules"
].filter((name) => existsSync(join(repoRoot, name)));

const commands: string[] = [];
const packageJsonPath = join(repoRoot, "package.json");
const packageJson = fileExists(packageJsonPath) ? readJson<PackageJson>(packageJsonPath) : null;

if (packageJson?.scripts) {
  const manager = fileExists(join(repoRoot, "pnpm-lock.yaml"))
    ? "pnpm"
    : fileExists(join(repoRoot, "yarn.lock"))
      ? "yarn"
      : "npm";

  for (const scriptName of ["validate", "lint", "typecheck", "test", "build", "format"]) {
    if (packageJson.scripts[scriptName]) {
      commands.push(`${manager} run ${scriptName}`);
    }
  }
}

if (fileExists(join(repoRoot, "pyproject.toml")) || fileExists(join(repoRoot, "pytest.ini"))) {
  commands.push("pytest");
}

if (fileExists(join(repoRoot, "go.mod"))) {
  commands.push("go test ./...");
}

if (fileExists(join(repoRoot, "Cargo.toml"))) {
  commands.push("cargo test");
}

if (fileExists(join(repoRoot, "pom.xml"))) {
  commands.push("mvn test");
}

if (fileExists(join(repoRoot, "gradlew")) || fileExists(join(repoRoot, "gradlew.bat"))) {
  commands.push("./gradlew test");
}

const topLevelFiles = readdirSync(repoRoot)
  .slice(0, 200)
  .map((entry) => {
    const fullPath = join(repoRoot, entry);
    return statSync(fullPath).isDirectory() ? `${entry}/` : entry;
  });

const changedFiles = gitStatus
  .split(/\r?\n/)
  .filter((line) => line && !line.startsWith("##"))
  .map((line) => line.slice(3).trim())
  .filter(Boolean);

const output = [
  "# Repository Inspection",
  "",
  `- Start directory: ${startDir}`,
  `- Repository root: ${repoRoot}`,
  `- Git detected: ${gitRootOutput ? "yes" : "no"}`,
  branch ? `- Branch: ${branch}` : "- Branch: unknown",
  "",
  "## Instruction Files",
  instructionCandidates.length
    ? instructionCandidates.map((name) => `- ${name}`).join("\n")
    : "- None detected from the standard candidate list.",
  "",
  "## Candidate Commands",
  commands.length
    ? [...new Set(commands)].map((command) => `- ${command}`).join("\n")
    : "- None detected. Inspect project docs before inventing commands.",
  "",
  "## Git Status",
  gitStatus ? "```text\n" + gitStatus + "\n```" : "- No git status available.",
  "",
  "## Changed Files",
  changedFiles.length
    ? changedFiles.map((name) => `- ${name}`).join("\n")
    : "- No changed files detected.",
  "",
  "## Top-Level Entries",
  topLevelFiles.map((name) => `- ${name}`).join("\n"),
  ""
].join("\n");

process.stdout.write(output);

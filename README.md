# Agent Task Contract

`agent-task-contract` is an open-source skill for coding agents. It makes agents define a small task contract before work and pass a verification gate before claiming completion.

The goal is to reduce common agent failure modes:

- premature "done" claims without evidence
- context drift during multi-step work
- scope creep and unrelated edits
- repeated failed commands without diagnosis
- weak PR handoffs with unclear tests and risks

The name was chosen after checking for exact-name collisions around `agent-task-contract` and `Agent Task Contract` so the project has a specific, low-conflict identity.

## Repository Layout

```text
agent-task-contract/
  SKILL.md
  agents/openai.yaml
  references/
  scripts/inspect-repo.mjs
scripts/
  validate-skill.mjs
.github/
  workflows/validate.yml
  PULL_REQUEST_TEMPLATE.md
```

## Install

Copy or symlink the `agent-task-contract` folder into the skill directory used by your agent runtime.

For Codex-style local skills, this is typically:

```powershell
Copy-Item -Recurse .\agent-task-contract $env:USERPROFILE\.codex\skills\
```

For other agent tools, keep the `SKILL.md` workflow and bundled references together, then adapt the folder location to that tool's skill/plugin mechanism.

## Validate

```powershell
npm run validate
```

Optional repository inspection helper:

```powershell
npm run inspect
```

## Example Prompts

```text
Use $agent-task-contract to fix this failing test and show the verification evidence.
```

```text
Use $agent-task-contract to prepare this repo change for a PR-ready handoff.
```

## Contributing

Keep the skill itself concise. Put detailed checklists in `references/`, deterministic helper behavior in `scripts/`, and repo maintenance files at the repository root.

Before opening a PR, run `npm run validate` and include the verification output in the PR body.

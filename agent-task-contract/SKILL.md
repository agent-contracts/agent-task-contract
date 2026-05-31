---
name: agent-task-contract
description: Create and enforce task contracts, scope boundaries, verification gates, and PR-ready handoffs for coding agents. Use when Codex, Claude Code, OpenClaw, or another agentic coding workflow must avoid premature completion, context drift, unrelated edits, weak testing, repeated failed commands, or unclear final evidence during bug fixes, feature work, refactors, reviews, CI debugging, and multi-step repository changes.
---

# Agent Task Contract

## Purpose

Use this skill to keep coding-agent work auditable. Turn the user's request into a small contract, preserve scope while editing, and require verification evidence before reporting completion.

## Workflow

1. Establish the task contract before editing. Keep it in the conversation or working notes unless the user asks for a file.
2. Discover local rules first. Inspect git status, project instructions, relevant files, and test conventions before deciding how to change code.
3. Keep scope tight. Change only files needed for the contract, and preserve user or generated changes that are already present.
4. Execute in small steps. After each meaningful finding, update the working contract if the objective, risks, or verification plan changed.
5. Pass the verification gate before finalizing. Run the most relevant checks available; if a check cannot run, record why and what evidence still exists.
6. Deliver a PR-ready handoff. Summarize changed behavior, key files, verification commands, failures, unresolved risks, and follow-up work.

## Contract Minimum

For every non-trivial task, capture:

- Objective: the user-visible outcome.
- Non-goals: nearby work that should stay out of scope.
- Scope: files, modules, commands, or workflows likely involved.
- Assumptions: facts inferred from the repo or prompt.
- Risks: behavior, data, security, compatibility, or UX risks.
- Completion criteria: what must be true before saying the task is done.
- Verification plan: commands, manual checks, review steps, or screenshots needed.

Read `references/contract-template.md` when the task is large, ambiguous, or likely to span multiple turns.

## Discovery

Start from local evidence:

- Read project instruction files such as `AGENTS.md`, `CLAUDE.md`, `.github/copilot-instructions.md`, and repo README files when relevant.
- Check git status before editing, and avoid reverting changes you did not make.
- Identify existing test, lint, typecheck, build, and formatter commands before inventing new ones.
- Use `scripts/inspect-repo.mjs` when repository context is unclear:

```bash
node path/to/agent-task-contract/scripts/inspect-repo.mjs /path/to/repo
```

## Verification Gate

Choose evidence that matches the risk of the change:

- Narrow code fix: targeted unit test or reproduction check.
- Shared logic change: targeted tests plus broader related suite when feasible.
- Frontend or UI change: build/lint plus browser or screenshot verification when available.
- Docs-only change: link and formatting checks when available; otherwise inspect rendered intent.
- CI or dependency change: run the closest local equivalent and explain any CI-only gap.

Read `references/verification-matrix.md` for a fuller checklist. Do not claim a check passed unless it actually ran and returned success.

## Failure Handling

When a command fails, preserve the exact command, failure class, and shortest useful error excerpt. Avoid repeating the same failing command without changing one meaningful variable. Read `references/failure-forensics.md` when failures are not immediately obvious.

## PR-Ready Handoff

Before final response or PR preparation:

- Recheck git status and confirm the diff only contains intended files.
- Summarize user-visible changes before implementation details.
- List verification commands exactly as run.
- Call out skipped checks, environmental blockers, and residual risks.
- Do not commit, push, or open a PR unless the user explicitly asked for that action.

Read `references/pr-readiness.md` when the user asks to prepare, review, commit, push, or open a PR.

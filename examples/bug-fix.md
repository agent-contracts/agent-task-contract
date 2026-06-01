# Bug Fix: Verify Before Saying Done

## Scenario

Login fails when an email address contains uppercase letters. The agent should fix the bug without refactoring the authentication module.

## Prompt

```text
Use $agent-task-contract to fix login failures caused by uppercase email addresses.
```

## Task Contract

```markdown
Objective:
- Normalize email addresses before authentication.

Non-goals:
- Do not redesign the login flow.
- Do not refactor unrelated authentication code.

Risks:
- Existing lowercase login behavior must stay unchanged.

Completion criteria:
- Uppercase and lowercase email logins both pass the targeted tests.

Verification plan:
- Run the focused authentication test file.
```

## Handoff

```markdown
## Summary
- Normalize email addresses before authentication lookup.
- Add a regression test for uppercase email login.

## Verification
- `npm test -- auth/login.test.ts`
- Result: passed

## Risks / Notes
- Full end-to-end login flow was not run locally.
```

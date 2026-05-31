# PR-Ready Handoff

Use this when the user asks for PR preparation, review, commit, push, or a final handoff suitable for a PR description.

## Pre-PR Checklist

- `git status --short` shows only intended files.
- Diff matches the task contract and excludes unrelated formatting churn.
- Tests or checks from the verification plan were run, or skipped checks are explained.
- User-facing behavior is summarized before implementation details.
- Risks and follow-ups are explicit.
- No secrets, credentials, local-only paths, or private logs are added.

## PR Description Shape

```markdown
## Summary
- ...

## Verification
- ...

## Risks / Notes
- ...
```

## Git Actions

Do not commit, push, change remotes, or open a PR unless the user explicitly asks. When asked, keep commits scoped to intended files and include verification in the PR body.

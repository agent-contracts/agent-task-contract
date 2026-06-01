# PR-Ready Handoff

## Scenario

The code change is complete. The agent needs to summarize what changed, what was actually verified, and what remains uncertain.

## Prompt

```text
Use $agent-task-contract to prepare this change for a PR-ready handoff.
```

## Handoff

```markdown
## Summary
- Add CSV export for the filtered orders table.
- Add CSV escaping tests for commas and quotes.

## Verification
- `npm test -- csv.test.ts`
- Result: passed
- `npm run build`
- Result: passed

## Risks / Notes
- Browser verification covered the local orders page.
- Export behavior for datasets larger than the current page limit remains unchanged.
```

## Why This Helps

The handoff separates evidence from assumptions. Reviewers can see which checks ran successfully and which risks still need attention.

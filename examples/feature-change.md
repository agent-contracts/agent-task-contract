# Feature Change: Keep the Scope Visible

## Scenario

Add CSV export to an existing orders page. The task should not turn into a table rewrite or a new reporting system.

## Prompt

```text
Use $agent-task-contract to add CSV export to the orders page.
```

## Task Contract

```markdown
Objective:
- Add an export button that downloads the visible order data as CSV.

Non-goals:
- Do not replace the table component.
- Do not add scheduled reports.
- Do not change backend pagination behavior.

Risks:
- CSV escaping must work for commas and quotes.
- Existing page filters must still control the exported rows.

Completion criteria:
- Export button is visible.
- Downloaded CSV matches the filtered rows.
- CSV escaping test passes.

Verification plan:
- Run CSV utility tests.
- Build the frontend.
- Check the orders page in a browser.
```

## Handoff

```markdown
## Summary
- Add CSV export for the filtered orders table.
- Escape commas and quotes in exported values.

## Verification
- `npm test -- csv.test.ts`
- `npm run build`
- Browser check: export button downloads the filtered rows.

## Risks / Notes
- Very large datasets still follow the page's existing client-side data limits.
```

# Verification Matrix

Select the smallest credible verification set for the risk level. Prefer existing repo commands over new tooling.

| Change type | Primary evidence | Secondary evidence | Notes |
| --- | --- | --- | --- |
| Docs only | Read changed docs and validate links when tooling exists | Markdown lint or docs build | Do not invent docs build steps if the repo has none. |
| Unit-level bug fix | Reproduction or targeted unit test | Related test file or package suite | Add a regression test when the bug is stable and testable. |
| Shared library logic | Targeted tests plus broader affected suite | Typecheck or build | Inspect call sites for changed contracts. |
| API or backend behavior | Unit/integration tests for route/service | Local smoke request when safe | Avoid hitting production services. |
| Frontend UI | Lint/typecheck/build plus browser check | Screenshot or accessibility check | Verify the actual route/component when local app setup is available. |
| Data migration | Dry-run, migration test, or schema validation | Rollback check | Do not run destructive migrations without explicit approval. |
| Dependency or build config | Install/build/test command | Lockfile diff review | Explain network or platform gaps. |
| CI fix | Closest local command to failing job | Workflow syntax review | Use CI logs when available. |
| Security-sensitive change | Tests plus focused security review | Static analysis if configured | Do not claim compliance without evidence. |

## Evidence Format

Record commands exactly:

```text
npm run test -- --runInBand packages/foo
Result: passed
```

For skipped checks, record the reason:

```text
Skipped: browser verification, because the app requires credentials not available in this environment.
Residual risk: layout behavior on authenticated dashboard remains unverified.
```

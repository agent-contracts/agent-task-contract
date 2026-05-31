# Failure Forensics

Use this when a command, test, app launch, or CI inspection fails and the next step is not obvious.

## Classify First

Pick the most likely class:

- Syntax or type error
- Test assertion failure
- Runtime exception
- Dependency or install failure
- Environment or permission issue
- Network or external service issue
- Flaky timing or ordering issue
- Tooling configuration issue

## Minimum Failure Record

Capture:

- exact command
- working directory
- exit code when available
- shortest useful error excerpt
- files or tests named in the failure
- whether the failure is new, pre-existing, or unknown

## Recovery Loop

1. Form one concrete hypothesis.
2. Change or inspect one variable that can confirm or reject it.
3. Run the narrowest useful command.
4. Update the task contract if the risk or scope changed.
5. Stop repeating the same command after two unchanged failures; inspect logs, config, or source instead.

## Escalation

Tell the user when progress is blocked by missing credentials, unavailable services, destructive actions, or external permissions. Include the exact command or action that would be needed next.

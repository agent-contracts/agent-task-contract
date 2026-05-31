# Agent Task Contract

[English](README.md) | 简体中文

`agent-task-contract` 是一个面向代码智能体的开源 skill。它要求智能体在开始工作前建立简短的任务契约，并在声称完成前通过验证门槛。

这个项目的目标是减少智能体常见的工程问题：

- 没有证据就过早宣称“完成”
- 多步骤任务中上下文漂移
- 改动范围失控，夹带无关修改
- 命令失败后反复重试但不诊断原因
- PR 交付信息薄弱，测试和风险不清楚

项目名 `agent-task-contract` 在创建前已检查过精确同名冲突，定位是一个更具体、低冲突的开源 skill 名称。

## 仓库结构

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

## 安装

将 `agent-task-contract` 文件夹复制或软链接到你的智能体运行时使用的 skill 目录。

对于 Codex 风格的本地 skill，通常可以执行：

```powershell
Copy-Item -Recurse .\agent-task-contract $env:USERPROFILE\.codex\skills\
```

如果你使用 Claude Code、OpenClaw 或其他智能体工具，请保持 `SKILL.md` 和配套 `references/`、`scripts/` 在同一个文件夹中，并按照对应工具的 skill/plugin 机制放置。

## 校验

```powershell
npm run validate
```

可选的仓库上下文检查：

```powershell
npm run inspect
```

## 示例提示词

```text
Use $agent-task-contract to fix this failing test and show the verification evidence.
```

```text
Use $agent-task-contract to prepare this repo change for a PR-ready handoff.
```

## 贡献

请保持 skill 本体简洁。详细清单放在 `references/`，确定性的辅助能力放在 `scripts/`，README、CI、PR 模板等仓库维护文件放在仓库根目录。

提交 PR 前，请运行：

```powershell
npm run validate
```

并在 PR 描述中附上验证结果。

# Agent Task Contract

![Agent Task Contract social preview](assets/social-preview.png)

[English](README.md) | 简体中文

`agent-task-contract` 是一个面向代码智能体的 skill，用来让仓库修改更聚焦、更容易验证，也更适合进入代码审查。

它为智能体提供一套轻量流程：

- 动手修改前先定义任务
- 明确非目标和改动边界
- 根据改动风险选择验证方式
- 命令失败时记录有效上下文，而不是盲目重试
- 交付时说明测试证据、风险和 PR 备注

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

对于 Codex 风格的本地 skill：

```powershell
Copy-Item -Recurse .\agent-task-contract $env:USERPROFILE\.codex\skills\
```

如果使用 Claude Code、OpenClaw 或其他智能体工具，请保持 `SKILL.md`、`references/` 和 `scripts/` 在同一个文件夹中，并放到对应工具加载 skill 或 plugin 的位置。

## 示例

- [带验证证据的 Bug 修复](examples/bug-fix.zh-CN.md)
- [控制改动范围的功能开发](examples/feature-change.zh-CN.md)
- [适合提交 PR 的交付说明](examples/pr-handoff.zh-CN.md)
- [查看全部示例](examples/README.zh-CN.md)

## 校验

```powershell
npm run validate
```

使用 skill 前检查仓库上下文：

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

请让 skill 文件夹只保留运行时需要的说明。详细清单放在 `references/`，确定性的辅助脚本放在 `scripts/`，README、CI、PR 模板等仓库维护文件放在项目根目录。

提交 PR 前请运行：

```powershell
npm run validate
```

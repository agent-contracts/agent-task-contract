# Bug 修复：验证后再说完成

## 场景

用户邮箱包含大写字母时登录失败。智能体需要修复问题，但不要顺手重构认证模块。

## 提示词

```text
Use $agent-task-contract to fix login failures caused by uppercase email addresses.
```

## 任务契约

```markdown
目标：
- 认证前统一处理邮箱大小写。

非目标：
- 不重新设计登录流程。
- 不重构无关认证代码。

风险：
- 不能影响原有小写邮箱登录行为。

完成标准：
- 大写和小写邮箱登录都能通过目标测试。

验证计划：
- 运行认证模块的目标测试文件。
```

## 交付说明

```markdown
## Summary
- 认证查询前统一处理邮箱大小写。
- 添加大写邮箱登录回归测试。

## Verification
- `npm test -- auth/login.test.ts`
- Result: passed

## Risks / Notes
- 本地未运行完整端到端登录流程。
```

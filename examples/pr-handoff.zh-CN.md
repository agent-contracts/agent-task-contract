# 适合提交 PR 的交付说明

## 场景

代码已经修改完成。智能体需要清楚说明改了什么、实际验证了什么，以及还存在哪些不确定项。

## 提示词

```text
Use $agent-task-contract to prepare this change for a PR-ready handoff.
```

## 交付说明

```markdown
## Summary
- 为筛选后的订单表格增加 CSV 导出。
- 增加包含逗号和引号的 CSV 转义测试。

## Verification
- `npm test -- csv.test.ts`
- Result: passed
- `npm run build`
- Result: passed

## Risks / Notes
- 已在本地订单页面完成浏览器验证。
- 超出当前页面数据量限制时，导出行为保持不变。
```

## 作用

交付说明将证据和假设分开。审查者可以快速确认哪些检查已经通过，以及哪些风险仍需关注。

#### git commit 规范

```shell
pnpm install -D husky
```

```json
// package.json
"husky":{
  "hooks":{
    "pre-commit": "npm run lint",
    "commit-msg": "node verify-commit.js",
    "pre-push": "npm test"
  }
}
```

```javascript
// verify-commit.js
const msgPath = process.env.HUSKY_GIT_PARANS
const msg = require("fs").readFileSync(msgPath, "utf-8").trim()
const commitRE = /^(feat|fix|docs|style|refactor|perf|test|workflow|build|ci|chore|release)(\(.+|))?: .{1,50}/
if(!commitRE.test(msg)){
  console.log(msg)
  console.error(`
  	不合法的commit 消息格式
  	请查看 git commi 提交规范：https://github.com/woai3c/Front-end-articles/blob/master/git%20commit%20style.md
  `)
  process.exit(1)
}
```

- feat：新功能、新特性
- fix：修改 bug
- perf：更改代码，以提高性能
- refactor：代码重构（重构，在不影响代码内部行为、功能的代码修改）
- docs：文档修改
- style：代码格式修改，注意不是css修改（例如分号修改）
- test：测试用例新增、修改
- build：影响项目构建或依赖项修改
- revert：恢复上一次提交
- ci：持续集成相关文件修改
- chore：其他修改（不在上述类型中的修改）
- release：发布新版本
- workflow：工作流相关文件修改

1. scope：commit 影响的范围，比如：route，component，utils，build
2. subject：coomit的概述
3. body：commit具体修改内容，可以分为多行
4. footer：一些备注，通常是 BREAKING CHANGE 或修复的 bug 的链接


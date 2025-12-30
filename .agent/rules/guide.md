---
trigger: always_on
---

1. 技术栈与环境 (Environment)
核心框架: React 19 + TypeScript 5.9
构建工具: Vite 7 + vite-plugin-monkey
样式方案: Tailwind CSS v3 (JIT 模式) + 自定义 Material Design 3 (MD3) 变量
包管理器: npm / pnpm

2. 工程化命令 (Scripts)
开发 (Dev):
命令: npm run dev
行为: 启动本地开发服务器，读取 .env 中的 COMPILE_PLATFORM 环境变量，使用 build/vite.userscript.ts 配置进行 HMR 热更新开发。
构建与验证 (Build & Verify):
命令: npm run build
行为: 这是一个组合命令，依次执行：
tsc: 全量类型检查。如果有 TS 语法错误或类型不匹配，构建会立即失败。这是验证代码正确性的首要标准。
vite build: 使用 build/vite.userscript.ts 将代码打包为 UserScript (.user.js)，输出至 dist/ 目录。
注意: 提交代码前必须运行此命令确保 0 错误。

3. 配置管理 (Configuration)
多平台支持:
项目通过 COMPILE_PLATFORM 环境变量（在 .env 中设置，如 welearn 或 tsinghua）来区分不同网课平台的构建目标。
元数据: 脚本的 Header 信息（如 Match, Grant, Version）定义在 config/metadata.json 中，构建时会自动注入。修改脚本权限时请编辑此文件，而非 vite.config.ts。
路径别名:
严格遵守 vite.common.ts 和 tsconfig.json 定义的别名：
@/ -> 项目根目录
@core/ -> src/core (API, Store)
@components/ -> src/shared/components (UI 组件)
@features/ -> src/features (业务逻辑)

4. UI 设计与实现规范 (MD3 & Tailwind)
设计系统: 不使用第三方 UI 库（如 MUI），完全基于 Tailwind 原子类实现 Material Design 3。
颜色令牌 (Color Tokens):
禁止使用硬编码颜色（如 bg-blue-500）。
必须使用定义在 tailwind.config.js / src/styles/md3.ts 中的语义化颜色：
容器背景: bg-surface, bg-surface-container
主要强调: bg-primary text-on-primary
次要/变体: bg-tertiary-container text-on-tertiary-container
组件开发:
所有通用组件（Button, Switch, Panel）应从 @components 引入。
新组件需支持 className 透传以便布局微调。

5. 架构分层 (Architecture)
API 请求:
严禁在组件内直接使用 fetch 或 GM_xmlhttpRequest。
所有请求必须封装在 @api 或 @features/*/services 中，并使用装饰器（如 @core/api/decorators.ts）处理鉴权和错误。
状态管理:
使用 Valtio (根据 package.json 依赖) 做响应式状态管理，而非 Zustand。
Store 文件应放置在 @store 或 Feature 目录下的 store.ts。
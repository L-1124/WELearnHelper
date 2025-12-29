# 开发指南

## 注意事项

本分支 (l-1124) 已对构建系统进行重构：
- 仅支持 **UserScript** (油猴脚本) 构建，移除了浏览器扩展 (Extension) 支持。
- 移除了 Python 依赖，所有辅助脚本均迁移至 JavaScript (如 `scripts/version.js`)。
- 推荐使用 `npm` 进行包管理。

## 常用命令

### 安装依赖

```sh
npm install
```

### 启动开发服务器

```sh
# 启动带有 HMR 的开发服务器
# 首次运行后，请在油猴中安装生成的 http://localhost:5173/__vite-plugin-monkey.user.js
npm run dev
```

### 构建生产版本

```sh
# 构建结果位于 dist/ 目录 (WELearnHelper.user.js)
npm run build:js
```

### 版本同步

```sh
# 将 config/metadata.json 中的版本号同步到 package.json
node scripts/version.js
```

## 架构

- **核心逻辑**: 基于 React + TypeScript + Vite 构建。
- **插件化**: 考试、时长等功能作为 Features 模块化编写 (`src/features`)。
- **题目解析**: Parser (解析) 与 Solver (答题) 分离设计，便于扩展。

## 发布

构建完成后 `dist/` 目录下的 `.user.js` 文件即为发布产物。

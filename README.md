# AI 与计算机技术演化 - 高中分享

一个基于 reveal.js 的交互式演示文稿，用于向高中生介绍 AI 和计算机技术的演化过程，并包含实时的 DeepSeek API 演示。

## 功能特点

- 📚 11 个精心设计的幻灯片，涵盖从系统概念到 LLM 应用
- 🎯 **实时 LLM 演示**：集成 DeepSeek API，现场展示大语言模型的能力
- 🎨 针对中文内容优化的样式设计
- 📱 响应式设计，支持多种屏幕尺寸
- ⌨️ 完整的键盘导航支持

## 快速开始

### 安装依赖

```bash
npm install
```

### 运行演示

```bash
npm start
# 或者自动打开浏览器
npm run dev
```

然后在浏览器中访问：`http://localhost:8000`

## DeepSeek API 演示设置

要使用实时 LLM 演示功能：

1. 获取 DeepSeek API Key：访问 [https://platform.deepseek.com/api_keys](https://platform.deepseek.com/api_keys)
2. 在演示的第 7.5 页（LLM 实时演示）中输入你的 API Key
3. 选择预设示例或输入自定义问题来体验 AI

**注意**：API Key 仅在当前浏览器会话中保存，不会被存储或传输到任何服务器。

## 演示内容

1. **开场** - 为什么要听这场分享
2. **什么是系统** - 理解输入-处理-输出
3. **数据的两种形态** - 结构化 vs 非结构化
4. **系统之间的沟通** - API 的作用
5. **计算机技术的演化** - 从单机到智能网络
6. **人工智能的发展脉络** - 从规则到理解
7. **什么是 LLM** - 大语言模型解释
8. **🎯 LLM 实时演示** - 现场体验 AI（新增）
9. **LLM 在生活中的用法** - 实际应用场景
10. **LLM = 系统的超级胶水** - 连接万物
11. **设计你的项目** - 痛点驱动的项目思路
12. **结尾** - 从创作者到 AI 创作者

## 导航控制

- **方向键** 或 **空格键**：切换幻灯片
- **ESC**：进入概览模式
- **F**：全屏模式
- **S**：演讲者模式（显示备注）

## 项目结构

```
ai-presentation/
├── index.html              # 主演示文件
├── css/
│   └── custom.css         # 自定义样式（包含中文优化和演示样式）
├── js/
│   ├── config.js          # API 配置
│   ├── deepseek-demo.js   # DeepSeek API 集成逻辑
│   └── calculator-demo.js # 计算器演示逻辑
├── reveal.js/             # Reveal.js 框架
├── package.json           # NPM 配置
└── README.md             # 项目说明
```

## 技术栈

- **Reveal.js** - HTML 演示框架
- **DeepSeek API** - 大语言模型集成
- **ES6 Modules** - 现代 JavaScript
- **http-server** - 本地开发服务器

## 安全提示

⚠️ **重要**：此项目的 API Key 输入方式仅用于教育演示目的。在生产环境中，应该：

- 使用后端服务器代理 API 请求
- 永远不要在客户端代码中硬编码 API Key
- 实施适当的速率限制和访问控制

## 自定义

### 修改 API 设置

编辑 `js/config.js` 来修改默认的 API 配置：

```javascript
export const config = {
    apiKey: '', // 保持为空，使用用户输入
    apiUrl: 'https://api.deepseek.com/v1/chat/completions',
    model: 'deepseek-chat'
};
```

### 添加预设示例

在 `js/deepseek-demo.js` 中的 `getExamples()` 方法中添加更多示例问题。

### 修改样式

编辑 `css/custom.css` 来自定义颜色、字体或布局。

## License

MIT

---

🎓 为中国高中生打造的 AI 教育演示

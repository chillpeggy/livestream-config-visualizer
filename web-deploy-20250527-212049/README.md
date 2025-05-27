# PC窗口源可视化应用

基于JSON数据的PC窗口图层可视化工具，类似OBS Studio的预览界面。

## 功能特性

- 📊 **图层可视化**: 根据JSON数据绘制各个图层的位置和大小
- 🎨 **颜色区分**: 不同层级使用不同颜色标识
- 📝 **详细信息**: 显示每个图层的详细属性信息
- 📱 **响应式设计**: 适配不同屏幕尺寸
- 🔄 **实时预览**: 支持JSON数据实时解析和预览

## 界面预览

应用包含以下主要区域：
- **JSON输入区**: 输入和编辑JSON数据
- **画布预览区**: 显示各图层的位置关系
- **层级信息面板**: 显示每个图层的详细信息

## 支持的数据格式

### JSON结构
```json
{
  "resolution": "{\"width\":1280,\"height\":720}",
  "sourceInfo": "{
    \"process\": {
      \"sourceList\": [{
        \"exeName\": \"dwrg.exe\",
        \"canvasOverlapRect\": [0,0,1278.65,718],
        \"layer\": 1,
        \"overlap\": 0,
        \"canvasOverlap\": 1
      }]
    },
    \"text\": {
      \"sourceList\": [{
        \"canvasOverlapRect\": [388.32,0,529.49,60.34],
        \"layer\": 2,
        \"overlap\": 0,
        \"canvasOverlap\": 0.03
      }]
    },
    \"camera\": {
      \"sourceList\": [{
        \"name\": \"咩播-智能场景\",
        \"canvasOverlapRect\": [0,0,1279.68,720],
        \"layer\": 0,
        \"overlap\": 1,
        \"canvasOverlap\": 1
      }]
    }
  }"
}
```

### 支持的源类型
- **process**: 进程源（如游戏、应用程序）
- **text**: 文本源
- **camera**: 摄像头源

### 关键字段说明
- `resolution`: 画布分辨率
- `canvasOverlapRect`: 图层位置和大小 `[x, y, width, height]`
- `layer`: 图层层级（数字越小层级越低）
- `canvasOverlap`: 画面占比（0-1）
- `overlap`: 原始占比（0-1）

## 快速开始

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

应用将在 `http://localhost:3000` 启动。

### 构建生产版本
```bash
npm run build
```

## 技术栈

- **React 18**: 前端框架
- **Vite**: 构建工具
- **Tailwind CSS**: 样式框架
- **SVG**: 图形绘制

## 使用说明

1. **输入JSON数据**: 在顶部的文本框中输入或粘贴JSON数据
2. **解析数据**: 点击"解析数据"按钮或使用"加载示例"
3. **查看预览**: 左侧显示画布预览，右侧显示层级信息
4. **层级信息**: 每个图层显示颜色标识、名称、占比等详细信息

## 颜色方案

- 🔵 **第0层**: 蓝色 (摄像头)
- 🟢 **第1层**: 绿色 (进程)  
- 🟠 **第2层**: 橙色 (文本)
- 🟣 **第3层**: 紫色
- 🔴 **第4层**: 红色
- 🐭 **第5层**: 青色

## 项目结构

```
src/
├── components/
│   ├── CanvasPreview.jsx    # 画布预览组件
│   └── LayerPanel.jsx       # 层级信息面板
├── App.jsx                  # 主应用组件
├── main.jsx                 # 应用入口
└── index.css               # 样式文件
```

## 开发计划

- [ ] 支持导出截图功能
- [ ] 添加层级显示/隐藏切换
- [ ] 支持多种分辨率预设
- [ ] 添加数据导入/导出功能
- [ ] 支持拖拽调整图层位置 
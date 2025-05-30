# 🎥 配置可视化工具 (Web版本)

> 专业的层级配置解析与可视化平台，支持多种配置格式

## 🌟 在线体验

**🔗 立即使用**: [https://chillpeggy.github.io/livestream-config-visualizer/](https://chillpeggy.github.io/livestream-config-visualizer/)

## ✨ 核心功能

### 📱 双输入模式
- **🖼️ 图片上传**: 支持拖拽上传底图，实时预览
- **📝 JSON配置**: 智能解析配置代码
- **🔄 实时同步**: 配置变更即时反映到预览

### 🎯 智能解析
- **多格式支持**: 支持多种配置格式，自动识别和解析
- **坐标转换**: 智能坐标系统转换，精确定位
- **多分辨率**: 自动检测720p/1080p/2K/4K，智能缩放

### 💻 资源监控
- **CPU进程**: 显示TOP进程占用情况
- **GPU进程**: 实时GPU资源使用统计
- **动态表格**: 最多显示5个进程，自适应列数

### 🎮 交互控制
- **图层管理**: 独立显示/隐藏每个图层
- **透明度调节**: 实时调整图层透明度
- **悬停详情**: 鼠标悬停显示详细信息
- **优先级排序**: 按Z-index自动排列

## 🚀 快速开始

### 方式一：在线使用 (推荐)
1. 访问 [在线版本](https://chillpeggy.github.io/livestream-config-visualizer/)
2. 上传您的底图文件
3. 粘贴JSON配置代码
4. 实时查看可视化效果

### 方式二：本地部署
```bash
# 克隆项目
git clone https://github.com/chillpeggy/livestream-config-visualizer.git
cd livestream-config-visualizer

# 启动本地服务器
python3 -m http.server 8080

# 访问应用
open http://localhost:8080
```

### 方式三：一键部署
```bash
# 使用部署脚本
./deploy.sh

# 选择部署平台：
# 1. GitHub Pages
# 2. Netlify  
# 3. Vercel
# 4. 本地测试
# 5. 生成部署包
```

## 🎮 进程识别

## 🌍 浏览器支持

- ✅ Chrome 80+
- ✅ Firefox 75+  
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ 移动端浏览器

## 📱 设备兼容

- 🖥️ **桌面端**: 完整功能体验
- 📱 **手机端**: 响应式布局，触控优化
- 📟 **平板端**: 适配大屏幕，手势支持

## 🛠️ 技术特性

- **纯前端**: 无需后端，完全静态部署
- **响应式**: 自适应各种屏幕尺寸
- **高性能**: 优化渲染，流畅交互
- **安全性**: 本地处理，数据不上传

## 📞 技术支持

### 常见问题
- **Q**: 支持哪些图片格式？
- **A**: 支持 JPG、PNG、GIF、WebP 等常见格式

- **Q**: JSON配置有大小限制吗？
- **A**: 建议单个配置文件不超过1MB

- **Q**: 可以离线使用吗？
- **A**: 是的，加载后可离线使用

### 联系方式
- 📧 邮箱: [您的邮箱]
- 🐛 问题反馈: [GitHub Issues](https://github.com/chillpeggy/livestream-config-visualizer/issues)
- 📖 使用文档: [项目文档](https://github.com/chillpeggy/livestream-config-visualizer)

## 📄 开源协议

本项目采用 MIT 协议开源，欢迎贡献代码和建议。

---

**版本**: 1.0.0 | **更新**: 2024年5月 | **开发者**: chillpeggy

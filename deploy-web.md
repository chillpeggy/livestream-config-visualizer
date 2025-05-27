# 🌐 Web版本部署指南

## 📋 概述

将直播配置可视化工具部署为Web版本，用户可以直接在浏览器中使用，无需下载安装。

## 🚀 部署到 GitHub Pages

### 1. 准备文件
确保以下文件在项目根目录：
- `overlay_visualization.html` (主应用文件)
- `assets/` 目录 (图标和资源)

### 2. 创建 GitHub 仓库
```bash
# 初始化 Git 仓库
git init

# 添加文件
git add overlay_visualization.html assets/

# 提交
git commit -m "初始化直播配置可视化工具Web版本"

# 添加远程仓库 (替换为您的仓库地址)
git remote add origin https://github.com/yourusername/livestream-config-visualizer.git

# 推送到 GitHub
git push -u origin main
```

### 3. 启用 GitHub Pages
1. 进入 GitHub 仓库设置
2. 找到 "Pages" 选项
3. 选择 "Deploy from a branch"
4. 选择 "main" 分支和 "/ (root)" 目录
5. 点击 "Save"

### 4. 访问应用
几分钟后，应用将在以下地址可用：
```
https://yourusername.github.io/livestream-config-visualizer/overlay_visualization.html
```

## 🌍 其他部署选项

### Netlify (推荐)
1. 访问 [netlify.com](https://netlify.com)
2. 拖拽项目文件夹到部署区域
3. 自动获得 HTTPS 域名

### Vercel
1. 访问 [vercel.com](https://vercel.com)
2. 连接 GitHub 仓库
3. 自动部署和更新

### 自建服务器
```bash
# 使用 Python 简单服务器
python3 -m http.server 8080

# 使用 Node.js serve
npx serve .

# 使用 nginx (生产环境)
# 将文件复制到 /var/www/html/
```

## 📱 移动端适配

Web版本天然支持移动设备，用户可以在手机/平板上使用。

## 🔗 分享方式

部署完成后，您可以：
1. 分享直接链接给用户
2. 生成二维码供扫描访问
3. 嵌入到其他网站中

## ✅ 优势

- **无需安装**：用户直接在浏览器中使用
- **跨平台**：支持所有操作系统和设备
- **自动更新**：修改后用户刷新即可获得最新版本
- **无安全限制**：不受macOS安全策略影响
- **易于分享**：一个链接即可分享给所有人

## 📝 注意事项

- 确保 `overlay_visualization.html` 中的所有资源路径正确
- 如果使用相对路径，确保目录结构在部署后保持一致
- 考虑添加 favicon 和 meta 标签优化用户体验 
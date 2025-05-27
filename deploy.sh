#!/bin/bash

echo "🌐 直播配置可视化工具 - Web版本部署脚本"
echo "================================================"

# 检查是否在Git仓库中
if [ ! -d ".git" ]; then
    echo "❌ 错误：当前目录不是Git仓库"
    echo "请先运行: git init"
    exit 1
fi

echo ""
echo "📋 选择部署方式："
echo "1. GitHub Pages (推荐)"
echo "2. Netlify"
echo "3. Vercel"
echo "4. 本地测试服务器"
echo "5. 生成部署包"
echo ""

read -p "请选择 (1-5): " choice

case $choice in
    1)
        echo ""
        echo "🚀 准备部署到 GitHub Pages..."
        echo ""
        echo "📝 请按以下步骤操作："
        echo "1. 在 GitHub 上创建新仓库 'livestream-config-visualizer'"
        echo "2. 复制仓库地址 (例如: https://github.com/yourusername/livestream-config-visualizer.git)"
        echo ""
        read -p "请输入您的 GitHub 仓库地址: " repo_url
        
        if [ -z "$repo_url" ]; then
            echo "❌ 仓库地址不能为空"
            exit 1
        fi
        
        echo ""
        echo "🔗 添加远程仓库..."
        git remote add origin "$repo_url" 2>/dev/null || git remote set-url origin "$repo_url"
        
        echo "📤 推送到 GitHub..."
        git push -u origin main
        
        echo ""
        echo "✅ 部署完成！"
        echo "🌍 请在 GitHub 仓库设置中启用 Pages："
        echo "   Settings → Pages → Source: Deploy from a branch → main → / (root)"
        echo ""
        echo "🔗 几分钟后可通过以下地址访问："
        repo_name=$(basename "$repo_url" .git)
        username=$(echo "$repo_url" | sed 's/.*github.com[:/]\([^/]*\)\/.*/\1/')
        echo "   https://$username.github.io/$repo_name/"
        ;;
        
    2)
        echo ""
        echo "🚀 准备部署到 Netlify..."
        echo ""
        echo "📝 请按以下步骤操作："
        echo "1. 访问 https://netlify.com"
        echo "2. 注册/登录账号"
        echo "3. 点击 'New site from Git'"
        echo "4. 连接您的 GitHub 仓库"
        echo "5. 部署设置保持默认即可"
        echo ""
        echo "✅ Netlify 会自动部署并提供 HTTPS 域名"
        ;;
        
    3)
        echo ""
        echo "🚀 准备部署到 Vercel..."
        echo ""
        echo "📝 请按以下步骤操作："
        echo "1. 访问 https://vercel.com"
        echo "2. 注册/登录账号"
        echo "3. 点击 'New Project'"
        echo "4. 导入您的 GitHub 仓库"
        echo "5. 部署设置保持默认即可"
        echo ""
        echo "✅ Vercel 会自动部署并提供全球 CDN"
        ;;
        
    4)
        echo ""
        echo "🖥️ 启动本地测试服务器..."
        echo ""
        echo "🌍 访问地址："
        echo "   主页: http://localhost:8080/"
        echo "   应用: http://localhost:8080/overlay_visualization.html"
        echo ""
        echo "按 Ctrl+C 停止服务器"
        echo ""
        python3 -m http.server 8080
        ;;
        
    5)
        echo ""
        echo "📦 生成部署包..."
        
        # 创建部署目录
        deploy_dir="web-deploy-$(date +%Y%m%d-%H%M%S)"
        mkdir -p "$deploy_dir"
        
        # 复制必要文件
        cp index.html "$deploy_dir/"
        cp overlay_visualization.html "$deploy_dir/"
        cp -r assets "$deploy_dir/"
        cp README.md "$deploy_dir/" 2>/dev/null || true
        
        # 创建部署说明
        cat > "$deploy_dir/部署说明.txt" << EOF
直播配置可视化工具 - Web版本部署包
=====================================

📁 文件说明：
- index.html              首页（自动跳转到主应用）
- overlay_visualization.html  主应用文件
- assets/                 图标和资源文件
- README.md               项目说明文档

🚀 部署方式：
1. 上传所有文件到您的Web服务器
2. 确保服务器支持静态文件托管
3. 访问 index.html 或 overlay_visualization.html

🌍 推荐的免费托管服务：
- GitHub Pages: https://pages.github.com/
- Netlify: https://netlify.com/
- Vercel: https://vercel.com/
- Firebase Hosting: https://firebase.google.com/products/hosting

📱 特性：
- 响应式设计，支持手机和平板
- 无需后端，纯前端应用
- 支持所有现代浏览器
EOF
        
        echo "✅ 部署包已生成: $deploy_dir/"
        echo "📁 包含所有必要文件，可直接上传到任何Web服务器"
        ;;
        
    *)
        echo "❌ 无效选择"
        exit 1
        ;;
esac

echo ""
echo "🎉 感谢使用直播配置可视化工具！" 
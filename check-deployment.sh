#!/bin/bash

echo "🔍 检查GitHub Pages部署状态..."
echo "=================================="

URL="https://chillpeggy.github.io/livestream-config-visualizer/"

echo "📍 检查地址: $URL"
echo ""

for i in {1..10}; do
    echo "⏳ 第 $i 次检查..."
    
    # 检查HTTP状态码
    status_code=$(curl -s -o /dev/null -w "%{http_code}" "$URL")
    
    if [ "$status_code" = "200" ]; then
        echo "✅ 部署成功！应用已上线"
        echo "🌍 访问地址: $URL"
        echo ""
        echo "🎯 功能测试:"
        echo "   - 首页: $URL"
        echo "   - 主应用: ${URL}overlay_visualization.html"
        echo ""
        echo "📱 移动端测试:"
        echo "   - 在手机浏览器中打开上述链接"
        echo "   - 测试拖拽上传和JSON解析功能"
        echo ""
        echo "🎉 恭喜！您的直播配置可视化工具已成功部署！"
        exit 0
    elif [ "$status_code" = "404" ]; then
        echo "⏰ 还在部署中... (状态码: $status_code)"
    else
        echo "⚠️  意外状态码: $status_code"
    fi
    
    if [ $i -lt 10 ]; then
        echo "   等待30秒后重试..."
        sleep 30
    fi
done

echo ""
echo "⚠️  部署可能需要更长时间，请："
echo "1. 访问 https://github.com/chillpeggy/livestream-config-visualizer/settings/pages"
echo "2. 确认Pages设置正确"
echo "3. 查看部署状态"
echo "4. 手动访问 $URL 检查" 
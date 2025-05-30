# 本地测试配置设置指南

## 🎯 目标
设置本地测试配置文件，让AI能够自动加载您的测试数据进行发布前测试，而无需手动输入。

## 📋 设置步骤

### 1. 复制示例文件
```bash
cp local-test-config.example.json local-test-config.json
```

### 2. 编辑配置文件
打开 `local-test-config.json` 文件，将示例数据替换为您的真实测试配置：

```json
{
  "testCases": [
    {
      "name": "您的测试用例名称",
      "description": "测试用例描述",
      "data": {
        "resolution": "{\"width\":1920,\"height\":1080}",
        "sourceInfo": "您的真实配置JSON字符串...",
        "cpuTopProcessList": "您的CPU进程列表JSON字符串..."
      },
      "expectedResults": {
        "layerCount": 预期的图层数量,
        "sourceTypes": ["预期的源类型"],
        "resolution": {"width": 1920, "height": 1080}
      }
    }
  ]
}
```

### 3. 数据安全说明
- ✅ `local-test-config.json` 已加入 `.gitignore`，不会提交到Git仓库
- ✅ 您的敏感配置数据仅存储在本地
- ✅ 测试时数据不会离开您的计算机

## 🚀 使用方法

### 自动测试流程
1. 打开 `test-automation.html`
2. 点击 "📁 加载本地配置文件" 按钮
3. 选择要测试的配置用例
4. 点击 "🚀 开始测试" 按钮
5. 查看自动化测试结果

### 手动输入模式
如果需要临时测试其他配置：
1. 点击 "✏️ 手动输入模式" 按钮
2. 在文本框中粘贴配置JSON
3. 点击 "🚀 开始测试" 按钮

## 📊 配置示例

### sourceInfo格式（伴侣配置）
```json
{
  "name": "伴侣配置测试",
  "description": "测试伴侣格式的进程源配置",
  "data": {
    "resolution": "{\"width\":1920,\"height\":1080}",
    "sourceInfo": "{\"process\":{\"sourceList\":[{\"exeName\":\"YourGame.exe\",\"overlap\":0.8,\"canvasOverlap\":1,\"canvasOverlapRect\":[0,0,1920,1080],\"layer\":3}]}}",
    "cpuTopProcessList": "[{\"name\":\"YourGame.exe\",\"percentage\":45.2}]"
  },
  "expectedResults": {
    "layerCount": 1,
    "sourceTypes": ["process"],
    "resolution": {"width": 1920, "height": 1080}
  }
}
```

### obsSourceInfo格式（OBS配置）
```json
{
  "name": "OBS配置测试", 
  "description": "测试OBS格式的多源配置",
  "data": {
    "resolution": "{\"width\":960,\"height\":540}",
    "obsSourceInfo": "{\"process\":[{\"exeName\":\"YourGame.exe\",\"pos\":{\"x\":0,\"y\":0},\"name\":\"游戏源\"}],\"video\":[{\"volume\":1,\"filepath\":\"video.mp4\",\"pos\":{\"x\":240,\"y\":90}}]}",
    "cpuTopProcessList": "[{\"name\":\"YourGame.exe\",\"percentage\":45.2}]",
    "gpuTopProcessList": "[{\"name\":\"YourGame.exe\",\"percentage\":76.3}]"
  },
  "expectedResults": {
    "layerCount": 2,
    "sourceTypes": ["process", "video"],
    "resolution": {"width": 960, "height": 540}
  }
}
```

## 🔧 故障排查

### 问题：点击"加载本地配置文件"后显示404错误
**解决方案：**
1. 确认已创建 `local-test-config.json` 文件
2. 确认文件位置在项目根目录下
3. 确认文件内容是有效的JSON格式

### 问题：加载成功但测试失败
**解决方案：**
1. 检查配置数据的JSON格式是否正确
2. 验证字段名称是否正确（resolution, sourceInfo, obsSourceInfo等）
3. 确认配置数据包含必要的层级信息

### 问题：想添加更多测试用例
**解决方案：**
在 `testCases` 数组中添加新的测试用例对象即可。

## ⚠️ 注意事项

1. **不要提交** `local-test-config.json` 文件到Git仓库
2. **定期备份** 您的测试配置文件（存储到安全位置）
3. **验证数据** 确保测试配置数据的正确性
4. **更新预期结果** 当程序逻辑变化时，相应更新expectedResults

## 🎉 优势

- ⚡ **快速测试**：无需重复输入配置数据
- 🔒 **数据安全**：敏感信息不会泄露到Git仓库
- 📋 **标准化**：统一的测试用例管理
- 🤖 **自动化**：AI可以自动执行完整的测试流程
- 📊 **可追踪**：每个测试用例都有明确的预期结果 
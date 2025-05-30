# 配置层级可视化工具 - 构建说明

## 📦 构建可执行文件

这个工具可以打包成 macOS 和 Windows 的独立可执行文件。

## 🛠️ 环境要求

- Node.js (版本 16 或更高)
- npm
- 网络连接 (用于下载依赖)

## 🚀 快速构建

### macOS / Linux 用户：
```bash
chmod +x build.sh
./build.sh
```

### Windows 用户：
```cmd
build.bat
```

## 📁 输出文件

构建完成后，所有可执行文件将位于 `dist/` 目录中：

### macOS 版本：
- `配置可视化工具-1.0.0-mac-x64.dmg` (Intel Mac)
- `配置可视化工具-1.0.0-mac-arm64.dmg` (Apple Silicon Mac)
- `配置可视化工具-1.0.0-mac-x64.zip` (便携版)
- `配置可视化工具-1.0.0-mac-arm64.zip` (便携版)

### Windows 版本：
- `配置可视化工具-1.0.0-win-x64.exe` (64位安装包)
- `配置可视化工具-1.0.0-win-ia32.exe` (32位安装包)
- `配置可视化工具-1.0.0-win-x64.zip` (便携版)
- `配置可视化工具-1.0.0-win-ia32.zip` (便携版)

## 🔧 手动构建步骤

如果自动脚本出现问题，可以手动执行以下步骤：

1. **准备环境**：
   ```bash
   # 备份原始 package.json (如果存在)
   mv package.json package.json.backup
   
   # 使用 Electron 配置
   cp package-electron.json package.json
   ```

2. **安装依赖**：
   ```bash
   npm install
   ```

3. **构建应用**：
   ```bash
   # 构建所有平台版本
   npm run build:all
   
   # 或者分别构建
   npm run build:mac    # 仅 macOS
   npm run build:win    # 仅 Windows
   ```

4. **开发模式**：
   ```bash
   npm start            # 启动应用
   npm run dev          # 开发模式 (带开发者工具)
   ```

## 🎯 应用特性

- **跨平台**：支持 macOS 和 Windows
- **原生体验**：完整的菜单栏和快捷键支持
- **高分辨率**：默认 2200x1400 窗口，适配 2K 显示器
- **安全性**：禁用 Node.js 集成，启用上下文隔离

## 📱 应用信息

- **名称**：配置可视化工具
- **版本**：1.0.0
- **主要功能**：
  - 支持 sourceInfo 和 obsSourceInfo 两种配置格式
  - 动态层级可视化
  - 图片拖拽上传
  - 层级分组管理
  - 透明度控制

## 🐛 故障排除

### 构建失败
- 确保 Node.js 版本 ≥ 16
- 删除 `node_modules` 文件夹后重新构建
- 检查网络连接是否正常

### 权限问题 (macOS)
```bash
chmod +x build.sh
```

### Windows 执行策略
如果 PowerShell 阻止脚本执行：
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## �� 许可证

MIT License 
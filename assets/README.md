# 应用图标

这个目录用于存放应用图标文件。

## 需要的图标文件：

- `icon.png` - 通用图标 (512x512 像素)
- `icon.icns` - macOS 图标文件
- `icon.ico` - Windows 图标文件

## 生成图标

如果您有 PNG 格式的图标，可以使用以下工具生成其他格式：

### macOS:
```bash
# 从 PNG 生成 ICNS
iconutil -c icns -o icon.icns Icon.iconset/
```

### Windows:
可以使用在线工具或 ImageMagick：
```bash
# 从 PNG 生成 ICO
convert icon.png -resize 256x256 icon.ico
```

## 默认行为

如果没有提供图标文件，Electron 将使用默认图标。应用功能不会受到影响。 
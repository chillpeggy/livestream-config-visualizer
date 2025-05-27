# 🔐 自签名证书解决方案

## 📋 概述

通过创建自签名证书来签名应用，虽然仍会显示安全警告，但用户可以更容易地信任和运行应用。

## 🛠️ 创建自签名证书

### 1. 生成证书
```bash
# 创建私钥
openssl genrsa -out app-signing-key.pem 2048

# 创建证书签名请求
openssl req -new -key app-signing-key.pem -out app-signing-request.csr

# 创建自签名证书 (有效期1年)
openssl x509 -req -days 365 -in app-signing-request.csr -signkey app-signing-key.pem -out app-signing-cert.pem

# 转换为 p12 格式 (macOS需要)
openssl pkcs12 -export -out app-signing-cert.p12 -inkey app-signing-key.pem -in app-signing-cert.pem
```

### 2. 导入证书到钥匙串
```bash
# 导入到系统钥匙串
security import app-signing-cert.p12 -k ~/Library/Keychains/login.keychain-db

# 设置证书信任
security add-trusted-cert -d -r trustRoot -k ~/Library/Keychains/login.keychain-db app-signing-cert.pem
```

## 📦 更新构建配置

### 修改 package.json
```json
{
  "build": {
    "mac": {
      "identity": "您的证书名称",
      "gatekeeperAssess": false,
      "hardenedRuntime": true,
      "entitlements": "build/entitlements.mac.plist",
      "entitlementsInherit": "build/entitlements.mac.plist"
    }
  }
}
```

### 创建 entitlements.mac.plist
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>com.apple.security.cs.allow-jit</key>
    <true/>
    <key>com.apple.security.cs.allow-unsigned-executable-memory</key>
    <true/>
    <key>com.apple.security.cs.disable-library-validation</key>
    <true/>
</dict>
</plist>
```

## ⚠️ 限制和注意事项

- 用户仍需要手动信任证书
- 不能通过Mac App Store分发
- 每次更新都需要重新签名
- 证书有有效期限制

## 🔄 替代方案：公证服务

如果您有Apple Developer账号，可以使用公证服务：

```bash
# 签名应用
codesign --force --options runtime --sign "Developer ID Application: Your Name" YourApp.app

# 创建dmg
hdiutil create -volname "Your App" -srcfolder YourApp.app -ov -format UDZO YourApp.dmg

# 公证dmg
xcrun notarytool submit YourApp.dmg --keychain-profile "notarytool-profile" --wait

# 装订公证票据
xcrun stapler staple YourApp.dmg
``` 
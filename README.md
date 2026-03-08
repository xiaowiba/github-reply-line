<div align="center">

# 💬 回复医生交流页面

<p align="center">
  <img src="https://img.shields.io/badge/WeChat-H5-07C160?style=for-the-badge&logo=wechat&logoColor=white" alt="WeChat H5">
  <img src="https://img.shields.io/badge/AngularJS-E23237?style=for-the-badge&logo=angularjs&logoColor=white" alt="AngularJS">
  <img src="https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white" alt="jQuery">
  <img src="https://img.shields.io/badge/MUI-007AFF?style=for-the-badge" alt="MUI">
</p>

<p align="center">
  <strong>🏥 医患沟通 H5 应用 | 微信端在线咨询系统</strong>
</p>

</div>

---

## 📋 项目简介

这是一个基于微信端的医患交流 H5 页面应用，提供医生与患者之间的实时沟通功能。支持文字、图片、语音等多种交流方式，为在线医疗咨询提供完整的解决方案。

### 🎯 核心功能

- 💬 **实时聊天** - 医生与患者实时文字交流
- 📷 **图片上传** - 支持病历、检查报告等图片分享
- 🎤 **语音消息** - 语音录制与播放功能
- ⭐ **服务评价** - 患者对医生服务进行评分
- 📱 **移动优化** - 完美适配微信浏览器
- 🔄 **下拉刷新** - 支持历史消息加载

---

## 🚀 在线预览

<p>
  <a href='http://demo.xiaowiba.com/demo/reply-line/comm/reply/replyDoctor.html?account=gh_02ff1d3275f0&openId=oTcawv3SIFf9MGgsMnm1hPdoD8vM' target='_blank'>
    <img src="https://img.shields.io/badge/🌐_在线演示-点击访问-4CAF50?style=for-the-badge" alt="在线演示">
  </a>
</p>

> 📱 建议使用微信内置浏览器访问以获得最佳体验

---

## 🛠️ 技术栈

### 前端框架
- 🅰️ **AngularJS** - 前端 MVVM 框架
- 📦 **jQuery 2.2.4** - DOM 操作库
- 🎨 **MUI** - 移动端 UI 框架
- ⚡ **Ionic** - 混合应用开发框架

### 核心插件
- 📸 **exif-js** - 图片 EXIF 信息处理
- 🔄 **dropload** - 下拉刷新/上拉加载
- 🎵 **audio.js** - 音频播放控制
- 🌊 **ripple.js** - 水波纹点击效果
- 📋 **clipboard.js** - 剪贴板操作
- 🔍 **vconsole** - 移动端调试工具

### 微信集成
- 🔗 **WeChat JSSDK 1.2.0** - 微信 JS 接口

---

## 📁 项目结构

```
📦 reply-line
├── 📂 comm/                    # 通信模块
│   ├── 📂 reply/              # 回复功能
│   │   ├── 📄 reply.html      # 医生回复页面
│   │   ├── 📄 replyDoctor.html # 回复医生页面
│   │   ├── 📂 resources/      # 资源文件
│   │   │   ├── 📂 css/        # 样式文件
│   │   │   ├── 📂 js/         # 脚本文件
│   │   │   ├── 📂 img/        # 图片资源
│   │   │   ├── 📂 json/       # 数据模拟
│   │   │   └── 📂 mp3/        # 音频文件
│   │   └── 📂 images/         # 表情图标
│   └── 📂 resources/          # 公共资源
├── 📂 css/                     # 全局样式
│   ├── 📂 kwjq/               # 第三方样式库
│   ├── 📂 modules/            # SCSS 模块
│   └── 📂 fonts/              # 字体文件
├── 📂 js/                      # 全局脚本
│   ├── 📂 plugin/             # 插件库
│   ├── 📄 common.js           # 公共方法
│   └── 📄 DES3.js             # 加密工具
├── 📄 index.html              # 入口页面
└── 📄 README.md               # 项目文档
```

---

## 🎨 功能特性

### 💬 聊天功能
- ✅ 文字消息发送与接收
- ✅ 图片上传与预览（支持 EXIF 处理）
- ✅ 语音录制与播放
- ✅ 消息时间戳显示
- ✅ 历史消息加载

### ⭐ 评价系统
- ✅ 星级评分（1-5星）
- ✅ 表情评价（开心/不满意）
- ✅ 评价结果展示

### 📱 移动端优化
- ✅ 响应式布局
- ✅ 触摸手势支持
- ✅ 图片缩放预览
- ✅ 下拉刷新/上拉加载
- ✅ 水波纹点击效果

### 🔐 微信集成
- ✅ 微信授权登录
- ✅ 微信分享功能
- ✅ 微信支付接口

---

## 🚦 快速开始

### 环境要求

- 🌐 现代浏览器（推荐 Chrome/Safari）
- 📱 微信浏览器（获得完整功能）
- 🖥️ Web 服务器（本地开发可使用 Live Server）

### 安装步骤

1️⃣ **克隆项目**
```bash
git clone <repository-url>
cd reply-line
```

2️⃣ **启动服务**
```bash
# 使用任意 HTTP 服务器，例如：
python -m http.server 8080
# 或
npx http-server -p 8080
```

3️⃣ **访问应用**
```
http://localhost:8080/comm/reply/replyDoctor.html?account=<your_account>&openId=<your_openid>
```

---

## 🔧 配置说明

### URL 参数

| 参数 | 说明 | 必填 |
|------|------|------|
| `account` | 微信公众号账号 | ✅ |
| `openId` | 用户 OpenID | ✅ |
| `orderId` | 订单 ID | ❌ |
| `type` | 咨询类型 | ❌ |

### 示例
```
replyDoctor.html?account=gh_02ff1d3275f0&openId=oTcawv3SIFf9MGgsMnm1hPdoD8vM
```

---

## 📸 功能截图

> 💡 提示：建议添加实际应用截图以展示界面效果

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. 🍴 Fork 本项目
2. 🌿 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 💾 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 📤 推送到分支 (`git push origin feature/AmazingFeature`)
5. 🎉 提交 Pull Request

---

## 📄 开源协议

本项目采用 MIT 协议开源

---

## 📞 联系方式

如有问题或建议，欢迎通过以下方式联系：

- 📧 Email: 734696413@qq.com

---

<div align="center">

**⭐ 如果这个项目对你有帮助，请给一个 Star！⭐**

Made with ❤️ by xiaowiba

</div>
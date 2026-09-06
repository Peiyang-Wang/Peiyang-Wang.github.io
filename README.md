# Peiyang-Wang.github.io

这是由我创建的个人主页仓库。当前主页是一个轻量的静态站点，保留了学术主页的内容组织方式，同时加入了更现代的交互与视觉样式。为了方便维护和让 GitHub 仓库首页更整洁，站点源码已经放在 `client/` 目录下，不再直接暴露 `index.html`。

## 目录结构

- `client/`：主页源码与静态资源
- `client/index.html`：主页主入口
- `client/css/stylesheet.css`：页面样式
- `client/js/main.js`：页面交互逻辑
- `client/images/`：头像、学校 logo 等图片资源
- `client/sitemap.xml`：站点地图
- `.github/workflows/deploy.yml`：GitHub Pages 自动部署工作流

## 常改文件

后续维护时，主要会改这些文件：

- `client/index.html`
- `client/css/stylesheet.css`
- `client/js/main.js`
- `client/images/`

编辑 `client/index.html` 来更新和维护个人信息、新闻、论文、经历。

## 本地预览

在仓库根目录执行：

```bash
python3 -m http.server 8000 -d client
```

然后在浏览器打开：

```text
http://127.0.0.1:8000
```

## 发布方式

这个仓库现在使用 GitHub Actions 自动部署到 GitHub Pages。

流程如下：

1. 修改 `client/` 下的内容
2. 提交并推送到 `main`
3. GitHub Actions 自动把 `client/` 目录部署到 GitHub Pages

## 维护流程

```bash
# 1. 本地预览
python3 -m http.server 8000 -d client

# 2. 修改文件
# 主要修改 client/index.html / client/css/stylesheet.css / client/js/main.js

# 3. 提交并推送
git add README.md client .github/workflows/deploy.yml
git commit -m "update homepage"
git push origin main
``
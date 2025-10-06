# 部署指南

## 本地访问

现在统一访问方式：

```bash
npm start
# 或
npm run dev
```

浏览器会自动打开 `http://localhost:8000/home.html`，显示课程选择页面。

## 远程服务器部署

### 方案 1: Vercel（推荐 - 最简单）

1. 访问 [vercel.com](https://vercel.com)，使用 GitHub 账号登录
2. 点击 "Import Project"
3. 选择这个 GitHub 仓库
4. 配置：
   - Build Command: `npm install`
   - Output Directory: `./`（留空或填 `./`）
5. 点击 Deploy

**优势**: 免费、自动 HTTPS、CDN 加速、每次 git push 自动部署

### 方案 2: Netlify

1. 访问 [netlify.com](https://netlify.com)，使用 GitHub 账号登录
2. 点击 "New site from Git"
3. 选择这个 GitHub 仓库
4. 配置：
   - Build command: `npm install`
   - Publish directory: `./`
5. 点击 Deploy

**优势**: 免费、自动 HTTPS、表单处理、Serverless Functions

### 方案 3: GitHub Pages

1. 在仓库设置中启用 GitHub Pages
2. 选择分支：`master` 或创建 `gh-pages` 分支
3. 保存后会得到一个 URL: `https://<username>.github.io/<repo-name>/home.html`

**优势**: 完全免费、与 GitHub 深度集成

### 方案 4: 传统服务器（Nginx）

如果你有自己的服务器：

```bash
# 1. 安装 Nginx
sudo apt update
sudo apt install nginx

# 2. 上传项目到服务器
scp -r ai-presentation user@your-server:/var/www/

# 3. 配置 Nginx
sudo nano /etc/nginx/sites-available/ai-presentation
```

Nginx 配置文件内容：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /var/www/ai-presentation;
    index home.html;

    location / {
        try_files $uri $uri/ =404;
    }

    # 静态文件缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

```bash
# 4. 启用配置
sudo ln -s /etc/nginx/sites-available/ai-presentation /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 方案 5: Docker 部署

创建 `Dockerfile`:

```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

创建 `nginx.conf`:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index home.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

部署命令：

```bash
# 构建镜像
docker build -t ai-presentation .

# 运行容器
docker run -d -p 8080:80 ai-presentation
```

## 推荐方案

- **学习/演示用途**: Vercel 或 Netlify（0 配置，自动 HTTPS）
- **学校内网**: 传统服务器 + Nginx
- **容器化环境**: Docker + Kubernetes

## 注意事项

1. 所有 reveal.js 依赖都在 `node_modules` 中，部署时需要包含
2. 确保 `home.html`、`index.html`、`class2.html` 都能正常访问
3. 检查文件路径大小写（Linux 服务器区分大小写）

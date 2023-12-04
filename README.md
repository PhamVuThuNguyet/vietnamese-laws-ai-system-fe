# Vietnam laws (FE)

## Features

- ⚡️ Next.js 14 with App Router
- ⚛️ React 18
- ✨ TypeScript
- 💨 Tailwind CSS 3 — Configured with CSS Variables to extend the **primary** color
- 💎 Pre-built Components — Components that will **automatically adapt** with your brand color, [check here for the demo](https://tsnext-tw.thcl.dev/components)
- 🃏 Jest — Configured for unit testing
- 📈 Absolute Import and Path Alias — Import components using `@/` prefix
- 📏 ESLint — Find and fix problems in your code, also will **auto sort** your imports
- 💖 Prettier — Format your code consistently
- 🐶 Husky & Lint Staged — Run scripts on your staged files before they are committed
- 🤖 Conventional Commit Lint — Make sure you & your teammates follow conventional commit
- ⏰ Release Please — Generate your changelog by activating the `release-please` workflow
- 👷 Github Actions — Lint your code on PR
- 🔥 Snippets — A collection of useful snippets
- 👀 Open Graph Helper Function — Awesome open graph generated using [og](https://github.com/theodorusclarence/og), fork it and deploy!
- 🗺 Site Map — Automatically generate sitemap.xml

## Getting Started

#### 1. Prerequisites

- Node.js 20 or higher
- Yarn 1.22 or higher
- Docker (optional)
- GNU Make

```bash
# clone the repo
git clone https://github.com/VKU-NewEnergy/vietnamese-laws-ai-system-fe

# cd to the repo
cd vietnamese-laws-ai-system-fe

# make a copy of .env.example as .env and change the values accordingly
cp .env.example .env
```

#### 2. Launch app by `make` command

```bash
make install
```

#### 3. Development

#### 3.1 Install dependencies

```
yarn install
```

#### 3.2 Run the development server

```
yarn dev
```

#### 4. Production

#### 4.1 Build container

```
docker build -t vietnam-laws-fe .
```

#### 4.2 Run container

```
docker run -p 3000:3000 vietnam-laws-fe
```

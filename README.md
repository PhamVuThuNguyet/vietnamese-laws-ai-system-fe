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

### 0. Prerequisites

- Node.js 14 or higher
- Yarn 1.22 or higher
- Docker (optional)

```bash
# clone the repo
git clone https://github.com/VKU-NewEnergy/vietnamese-laws-ai-system-fe

# cd to the repo
cd vietnamese-laws-ai-system-fe

# make a copy of .env.example as .env and change the values accordingly
cp .env.example .env
```

### 1. Development

1. Install dependencies

   ```bash
   yarn install
   ```

2. Run the development server

   ```bash
   yarn dev
   ```

### 2. Production

1. Build container

   ```bash
   docker build -t vietnam-laws-fe .
   ```

2. Run container

   ```bash
   docker run -p 3000:3000 vietnam-laws-fe
   ```

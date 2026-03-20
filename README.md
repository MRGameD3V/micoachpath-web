# miCoach Path

miCoach Path is a proposal for generating a career path wit Generative AI taking as source a PDF resume.

The objective of this module is to have a tool that help ITJ, miCoach or any organization to build a career path, keeping motivated to its colleagues and/or employees and having measurements of its goals, paths and OKR's.

This development is built with VueJS + Nuxt + DaisyUI, using FontAwesome for icons.

## Development Instructions

Before deploying solution, please ensure you have access to FastAPI-CV, our backend. Instructions [here](https://github.com/EddieReynosoR/FastAPI-CV). 

After deploying backend, please copy ```.env.example``` file and rename it to ```.env```. 

Finally assign the URL from the running backend. If you're using directly at localhost it should be `http://localhost:8000/api`.

### Setup

Ensure you're using the library manager of your preference and will be the one you'll use, unless you want to rebuild again everything :P.

miCoach Path is compatible with the following managers:
- npm
- pnpm
- yarn
- bun

Dependency installation:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

### Development Server

Once you have installed the project, start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
# pnpm
pnpm dev
# yarn
yarn dev
# bun
bun run dev
```

## Deploying to Production

You may do the deployment to production directly in a dedicated server, hosting, using Netlify, Vercel or any cloud computing platform.

Production build for hosting and for build at dedicated server:

```bash
# npm
npm run build
# pnpm
pnpm build
# yarn
yarn build
# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview
# pnpm
pnpm preview
# yarn
yarn preview
# bun
bun run preview
```

## Docs

Here you have interesting docs about used technology in the miCoach Path frontend.

- [Nuxt Content documentation](https://content.nuxt.com)
- [Nuxt deployment documentation](https://nuxt.com/docs/getting-started/deployment)
- [DaisyUI documentation](https://daisyui.com/docs/install/)
- [FontAwesome documentation](https://docs.fontawesome.com/)

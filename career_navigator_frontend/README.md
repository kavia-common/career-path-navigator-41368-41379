# Lightweight React Template for KAVIA

This project provides a minimal React template with a clean, modern UI and minimal dependencies.

## Features

- **Lightweight**: No heavy UI frameworks - uses only vanilla CSS and React
- **Modern UI**: Clean, responsive design with KAVIA brand styling
- **Fast**: Minimal dependencies for quick loading times
- **Simple**: Easy to understand and modify

## Getting Started

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Backend Integration (FastAPI on SQLite)

The frontend talks to the backend using a configurable base URL.

- Environment variable: `REACT_APP_API_BASE`
- Default behavior: if not set, the app uses a relative base path (`''`) which only works when backend is reverse-proxied on the same origin as the frontend.

For the current environment, set:

```
REACT_APP_API_BASE=https://vscode-internal-30268-beta.beta01.cloud.kavia.ai:3010
```

Create a `.env.local` in this folder or export this variable in your shell before `npm start`. An `.env.example` is provided.

### CORS Expectations

The backend should allow the frontend origin:
- `https://vscode-internal-30268-beta.beta01.cloud.kavia.ai:3000`

If backend enforces credentials in CORS, enable:
- `allow_credentials=True`
- `allow_methods=["*"]`
- `allow_headers=["*"]`

The frontend sends `Authorization: Bearer <token>` and sets `credentials: 'include'` on fetch requests (cookies are not required by default; this is safe to leave as-is).

## Manual Verification Checklist

1. Auth
   - Register a user at `/register` (password >= 8 chars), then login at `/login`.
   - You should be redirected to `/` and see your email/full name in the top bar.
   - Logout button should clear the session and redirect to `/login`.

2. Public data pages
   - Dashboard: shows counts for roles and recommendations.
   - Roles: list of role names/abbreviations.
   - Competencies: glossary loads; matrix details section can load JSON.
   - Resources: list of resources with optional tags/links.
   - Recommendations: loads with default min_overlap=55; "Apply" reloads.

3. Auth-required pages
   - Jobs: list (empty for new users). Add a job and verify it appears.
   - Progress: add progress items and verify they render in the list.

4. Network/Console
   - No CORS errors.
   - No 4xx/5xx errors on API calls in devtools Network.
   - Requests go to the backend base URL set in `REACT_APP_API_BASE`.

## Customization

### Colors

The main brand colors are defined as CSS variables in `src/App.css`:

```css
:root {
  --kavia-orange: #E87A41;
  --kavia-dark: #1A1A1A;
  --text-color: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --border-color: rgba(255, 255, 255, 0.1);
}
```

### Components

This template uses pure HTML/CSS components instead of a UI framework. You can find component styles in `src/App.css`. 

Common components include:
- Buttons (`.btn`, `.btn-large`)
- Container (`.container`)
- Navigation (`.navbar`)
- Typography (`.title`, `.subtitle`, `.description`)

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

YouTube-Clone — React + Tailwind UI
=================================

Elevator pitch
--------------
This project is a polished, responsive YouTube-like frontend built with React and Tailwind CSS. It demonstrates routing, dynamic data fetching from the YouTube Data API, component design, and UX-focused features (search, watch page, Shorts, sidebar navigation, profile modal, and action buttons). It's intentionally modular so each area can be extended to a production-ready app.

Why this project matters (for recruiters)
----------------------------------------
- Shows practical experience building a modern single-page application using React and React Router.
- Demonstrates integration with third-party APIs (YouTube Data API), network error handling, and pagination.
- Implements production-oriented patterns: environment variables for secrets, optimistic UI updates, and client-side caching considerations.
- UI/UX skills: responsive design with Tailwind, accessible components, keyboard-friendly navigation, and shimmer loading states.
- Engineering practices: modular components, small focused pages, and a clear path to back-end integration.

Live features implemented
-------------------------
- Responsive Header with search, mic, notifications and profile dropdown
- Slidebar with navigation for Home, Shorts, Trending, Subscriptions, Library, History, Your Videos, Watch Later, Liked Videos, Settings
- Feed: 4-cards-per-row responsive grid with shimmer placeholders while loading
- VideoCard: lightweight presentational component that passes state to the Watch page for instant navigation
- Watch page: embedded player, metadata, like/share/save/subscribe UI (optimistic toggles), related videos list, and description toggle
- Shorts: full-bleed vertical viewer with overlay controls
- Profile page: modal/dropdown UI, editable options
- Developer experience: React Router routing, React Icons integration, Tailwind CSS styling

Key technologies and concepts
---------------------------
- React (hooks: useState, useEffect, useRef, useLocation, useParams)
- React Router (v6+): nested routes, Link state, param-driven pages
- Tailwind CSS for responsive, utility-first styling
- YouTube Data API v3: `videos` and `search` endpoints (note: API key is required)
- Progressive enhancement patterns: router-state fallback, async fetch fallback, shimmer loaders
- UX patterns: optimistic UI, copy-to-clipboard feedback, modal routing
- Accessibility: aria attributes, keyboard handling, focus management (where applicable)
- Icons: react-icons (Material icons set used)
- Dev tooling: Create React App (or Vite — depending on starter), npm, and browser DevTools

Security & deployment notes
-------------------------
- API keys must NOT be committed. This project uses `REACT_APP_YT_API_KEY` from `.env.local` during development.
- For production, prefer a small server-side proxy (Express) that injects the API key so it is never exposed in client bundles.
- Example: run a proxy at `/api/youtube/...` that forwards requests to `https://youtube.googleapis.com/...&key=${process.env.YT_API_KEY}`

How to run (development)
------------------------
1. Install dependencies:

```powershell
npm install
```

2. Add your YouTube API key locally (do NOT commit):

Create a `.env.local` at the project root with:

```
REACT_APP_YT_API_KEY=your_api_key_here
```

3. Start the dev server:

```powershell
npm start
```

4. Open `http://localhost:3000` and click around. Use the Developer Tools Network tab to inspect YouTube API requests.

Notes for reviewers / recruiters
--------------------------------
- The project is intentionally modular; each presentational page and component is easy to extend and unit-test.
- To showcase backend work, I can add an Express proxy with server-side caching (Redis) and simple auth (JWT) on request.
- Test coverage: adding Jest + React Testing Library for core components (VideoCard, WatchPage, Header) is planned.

Ideas to extend (high-impact items)
----------------------------------
1. Server proxy and caching for the YouTube API (hide API key and reduce quota usage).
2. Persist likes, subscriptions, and saved videos using a small backend (Express + SQLite/Postgres) or Firebase.
3. Add offline caching and service worker for better UX.
4. Add E2E tests (Cypress) and a CI pipeline (GitHub Actions) to run tests and deploy previews.
5. Add LLM-based video summarization and caption generation (server-side) to demonstrate applied ML integration.

Contact and code ownership
--------------------------
If you'd like a walkthrough, code clean-up for production, or help adding backend persistence, I can implement the server proxy, CI, and tests quickly.

Enjoy exploring the code — this project is built to be extended and production-hardened when needed.
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

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

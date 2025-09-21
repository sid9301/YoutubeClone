import Header from './components/header';
import './App.css';
import FeedContent from './components/feedContent';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import WatchPage from './components/watchpage';
import Slidebar from './components/slidebar';
import ShortsPage from './components/shortPage';
import Ytprofile from './components/ytProfile';
import Trending from './pages/Trending';
import Subscriptions from './pages/Subscriptions';
import Library from './pages/Library';
import History from './pages/History';
import YourVideos from './pages/YourVideos';
import WatchLater from './pages/WatchLater';
import LikedVideos from './pages/LikedVideos';
import Settings from './pages/Settings';
// Use top-level routes to avoid invalid absolute child paths
const routerapi = createBrowserRouter([
  { path: '/', element: <FeedContent /> },
  { path: '/watch/:videoId', element: <WatchPage /> },
  { path: '/shorts', element: <ShortsPage /> },
  { path: '/profile/:userId', element: <Ytprofile  /> },
  { path: '/trending', element: <Trending /> },
  { path: '/subscriptions', element: <Subscriptions /> },
  { path: '/library', element: <Library /> },
  { path: '/history', element: <History /> },
  { path: '/your-videos', element: <YourVideos /> },
  { path: '/watch-later', element: <WatchLater /> },
  { path: '/liked-videos', element: <LikedVideos /> },
  { path: '/settings', element: <Settings /> },
]);

function App() {
  
  return (
    <div className="App fixed-x w-full bg-white-10 m-0 ">
      <RouterProvider router={routerapi} />
    </div>
  );
}

export default App;

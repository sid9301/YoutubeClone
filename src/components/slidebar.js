

import { Link } from "react-router-dom";
import {
  MdHome,
  MdOutlineSlowMotionVideo,
  MdWhatshot,
  MdSubscriptions,
  MdVideoLibrary,
  MdHistory,
  MdOutlineOndemandVideo,
  MdWatchLater,
  MdThumbUp,
  MdSettings,
} from "react-icons/md";

const Slidebar = ({ isOpen }) => {

  // 2. If the sidebar is not open, render nothing (or null).
  if (!isOpen) {
    return null;
  }

    return (
        <aside className="w-56 bg-white h-screen border-r border-gray-200 p-4 flex flex-col gap-2">
            <Link to="/" className="w-full">
              <button className="w-full text-left flex items-center gap-3 rounded-md border border-gray-300 bg-gray-100 px-4 py-2 hover:bg-gray-200">
                <MdHome className="text-2xl" />
                <span>Home</span>
              </button>
            </Link>

            <Link to="/shorts" className="w-full">
              <button className="w-full text-left flex items-center gap-3 rounded-md border border-gray-300 bg-gray-100 px-4 py-2 hover:bg-gray-200">
                <MdOutlineSlowMotionVideo className="text-2xl" />
                <span>Shorts</span>
              </button>
            </Link>

            <Link to="/trending" className="w-full">
              <button className="w-full text-left flex items-center gap-3 rounded-md border border-gray-300 bg-gray-100 px-4 py-2 hover:bg-gray-200">
                <MdWhatshot className="text-2xl" />
                <span>Trending</span>
              </button>
            </Link>

            <Link to="/subscriptions" className="w-full">
              <button className="w-full text-left flex items-center gap-3 rounded-md border border-gray-300 bg-gray-100 px-4 py-2 hover:bg-gray-200">
                <MdSubscriptions className="text-2xl" />
                <span>Subscriptions</span>
              </button>
            </Link>

            <Link to="/library" className="w-full">
              <button className="w-full text-left flex items-center gap-3 rounded-md border border-gray-300 bg-gray-100 px-4 py-2 hover:bg-gray-200">
                <MdVideoLibrary className="text-2xl" />
                <span>Library</span>
              </button>
            </Link>

            <Link to="/history" className="w-full">
              <button className="w-full text-left flex items-center gap-3 rounded-md border border-gray-300 bg-gray-100 px-4 py-2 hover:bg-gray-200">
                <MdHistory className="text-2xl" />
                <span>History</span>
              </button>
            </Link>

            <Link to="/your-videos" className="w-full">
              <button className="w-full text-left flex items-center gap-3 rounded-md border border-gray-300 bg-gray-100 px-4 py-2 hover:bg-gray-200">
                <MdOutlineOndemandVideo className="text-2xl" />
                <span>Your videos</span>
              </button>
            </Link>

            <Link to="/watch-later" className="w-full">
              <button className="w-full text-left flex items-center gap-3 rounded-md border border-gray-300 bg-gray-100 px-4 py-2 hover:bg-gray-200">
                <MdWatchLater className="text-2xl" />
                <span>Watch later</span>
              </button>
            </Link>

            <Link to="/liked-videos" className="w-full">
              <button className="w-full text-left flex items-center gap-3 rounded-md border border-gray-300 bg-gray-100 px-4 py-2 hover:bg-gray-200">
                <MdThumbUp className="text-2xl" />
                <span>Liked videos</span>
              </button>
            </Link>

            <Link to="/settings" className="w-full">
              <button className="w-full text-left flex items-center gap-3 rounded-md border border-gray-300 bg-gray-100 px-4 py-2 hover:bg-gray-200">
                <MdSettings className="text-2xl" />
                <span>Settings</span>
              </button>
            </Link>
        </aside>
    );
}

export default Slidebar;

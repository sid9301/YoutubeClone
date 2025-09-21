import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { FiBell } from "react-icons/fi";
import { AiOutlineAudio } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";
const Header = ({ search, setSearch, onToggle }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Dark mode state (init from localStorage or system preference)
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
    } catch (e) {}
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setProfileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  // Apply/remove .dark on <html> and persist selection
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      try { localStorage.setItem("theme", "dark"); } catch (e) {}
    } else {
      root.classList.remove("dark");
      try { localStorage.setItem("theme", "light"); } catch (e) {}
    }
  }, [darkMode]);

  const handleSearchSubmit = (e) => {
    // prevent full page reload when pressing Enter; search state is controlled by parent
    e.preventDefault();
  };

  return (
    <header className="bg-gray-200 dark:bg-gray-900 dark:text-white flex items-center justify-between p-4">
      <div className="flex items-center gap-0 ">
         <button
          onClick={onToggle}
          className="focus:outline-none"
        >
          <img
            src="https://www.svgrepo.com/show/524617/hamburger-menu.svg"
            alt="hamburger menu"
            className="w-12 h-12"
          />
        </button>
      
      <img src="https://www.pngplay.com/wp-content/uploads/9/Youtube-Logo-Transparent-PNG.png" alt="YouTube Logo" className="h-20 w-20" />
      </div>
      {/* Search form - makes button flush with input like YouTube */}
      <form onSubmit={handleSearchSubmit} className="flex w-1/2">
          <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-400 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-l-full px-4 h-10 w-full focus:outline-none"
        />

        {/* Search button - red and flush with the input */}
        <button
          type="submit"
          aria-label="Search"
          title="Search"
          className="bg-red-600 hover:bg-red-700 text-white px-4 h-10 rounded-r-full flex items-center justify-center"
        >
          <FaSearch className="w-5 h-5" />
        </button>
      </form>
        {/* Microphone icon */}
        <button aria-label="Voice Search" title="Voice Search" className="relative p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700">
          <AiOutlineAudio className="w-6 h-6 text-gray-700 dark:text-gray-200" />
        </button>
     

      {/* Notification bell (react-icons) */}
      <button aria-label="Notifications" title="Notifications" className="relative p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700">
        <FiBell className="w-6 h-6 text-gray-700 dark:text-gray-200" />
        {/* example unread badge */}
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">3</span>
      </button>
    {/* Profile dropdown */}
    <div className="relative" ref={profileRef}>
      <button
        onClick={() => setProfileOpen((s) => !s)}
        aria-haspopup="true"
        aria-expanded={profileOpen}
        className="w-10 h-10 rounded-full overflow-hidden"
        title="Account"
      >
        <img src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg" alt="user profile" className="w-10 h-10 rounded-full" />
      </button>

      {profileOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded shadow-lg z-50">
          <Link to="/profile/me" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Your channel</Link>
          <button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Manage your account</button>
          <button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Sign out</button>
        </div>  
      )}

    </div>
      <button
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        title={darkMode ? "Light mode" : "Dark mode"}
        onClick={() => setDarkMode((d) => !d)}
        className="relative p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700"
      >
        {darkMode ? <MdLightMode className="w-6 h-6 text-gray-800 dark:text-gray-200"/> : <MdDarkMode className="w-6 h-6 text-gray-700 dark:text-gray-200"/>}
      </button>
    </header>
  );
};

export default Header;

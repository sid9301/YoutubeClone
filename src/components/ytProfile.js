import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

const YTProfile = ({ modal = false }) => {
    const { userId } = useParams();
    const [tab, setTab] = useState("home");

    // Dummy data — replace with real API-driven data later
    const displayName = userId === "me" ? "Your Channel" : `Channel ${userId}`;
    const subscribers = "1.2M";

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") setMenuOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    useEffect(() => {
        const onClick = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        window.addEventListener("click", onClick);
        return () => window.removeEventListener("click", onClick);
    }, []);

    const content = (
        <div className="w-full max-w-4xl bg-white rounded shadow">
            {/* cover image */}
            <div className="h-40 bg-gradient-to-r from-red-500 to-pink-500 flex items-end p-4">
                <div className="flex items-end gap-4">
                    <img src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg" alt="avatar" className="w-28 h-28 rounded-full border-4 border-white -mt-8" />
                    <div className="text-white">
                        <h2 className="text-2xl font-semibold">{displayName}</h2>
                        <p className="text-sm">{subscribers} subscribers</p>
                    </div>
                </div>
                <div className="ml-auto self-center flex items-center gap-3">
                    <button className="bg-red-600 text-white px-4 py-2 rounded-md">Subscribe</button>

                    {/* Profile action dropdown button */}
                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={() => setMenuOpen((s) => !s)}
                            aria-haspopup="true"
                            aria-expanded={menuOpen}
                            className="p-2 rounded-full bg-white border hover:bg-gray-100"
                            title="Profile actions"
                        >
                            ⋮
                        </button>

                        {menuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Send message</button>
                                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Manage videos</button>
                                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Report</button>
                                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Block user</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* tabs */}
            <div className="border-b">
                <nav className="flex gap-4 px-4">
                    <button className={`py-3 ${tab === "home" ? "border-b-2 border-red-600" : "text-gray-600"}`} onClick={() => setTab("home")}>Home</button>
                    <button className={`py-3 ${tab === "videos" ? "border-b-2 border-red-600" : "text-gray-600"}`} onClick={() => setTab("videos")}>Videos</button>
                    <button className={`py-3 ${tab === "playlists" ? "border-b-2 border-red-600" : "text-gray-600"}`} onClick={() => setTab("playlists")}>Playlists</button>
                    <button className={`py-3 ${tab === "about" ? "border-b-2 border-red-600" : "text-gray-600"}`} onClick={() => setTab("about")}>About</button>
                </nav>
            </div>

            {/* content area */}
            <div className="p-6">
                {tab === "home" && (
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Featured</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {/* placeholders for featured videos */}
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="bg-gray-100 rounded overflow-hidden">
                                    <div className="h-40 bg-gray-300" />
                                    <div className="p-3">
                                        <div className="h-4 bg-gray-200 w-3/4 mb-2" />
                                        <div className="h-3 bg-gray-200 w-1/2" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {tab === "videos" && (
                    <div>
                        <h3 className="text-lg font-semibold mb-3">All videos</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <div key={i} className="bg-white rounded shadow overflow-hidden">
                                    <div className="h-36 bg-gray-200" />
                                    <div className="p-3">
                                        <h4 className="font-medium">Video title {i + 1}</h4>
                                        <p className="text-sm text-gray-500">{Math.floor(Math.random() * 1000)} views</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {tab === "playlists" && (
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Playlists</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="bg-white rounded shadow p-4">
                                    <h4 className="font-medium">Playlist {i + 1}</h4>
                                    <p className="text-sm text-gray-500">{Math.floor(Math.random() * 50)} videos</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {tab === "about" && (
                    <div>
                        <h3 className="text-lg font-semibold mb-3">About</h3>
                        <p className="text-sm text-gray-700">This is a sample channel description. Replace with real data fetched from your backend or YouTube API.</p>
                    </div>
                )}
            </div>
        </div>
    );

    if (modal) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
                    {content}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
            {content}
        </div>
    );
};

export default YTProfile;
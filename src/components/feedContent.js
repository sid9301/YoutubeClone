 import React, { useState, useEffect } from "react";
 import VideoCard from "./videoCard";
 import FilterBar from "./filterButton";
 import { api_key, youtube_api } from "../utils/constant";
 import Header from "./header";
 import ShimmerChar from "./shimmerChar";
 import Slidebar from "./slidebar";
 //import ShortPage from "./shortPage";
// Map filter names to YouTube category IDs
const categoryMap = {
  Music: 10,
  Sports: 17,
  News: 25,
  Gaming: 20,
  Fashion: 26,
  Comedy: 23,
  Education: 27,
  Science: 28,
  Documentary: 36,
  Movie: 1,
  Travel: 19,
  Food: 26,
  Kids: 37,
  Technology: 28,
  Live: 20,
  Trending: 0,
  Learning: 27,
  Automobiles: 2,
  All: 0,
  Top: 0,
  Cricket: 17,
  Health: 26,
};

const FeedContent = () => {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [error, setError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  console.log(youtube_api);

  const toggleSidebar = () => setIsSidebarOpen((s) => !s);

  const fetchVideos = async (filter) => {
    setLoading(true);
    setError("");
    const categoryId = categoryMap[filter];
    const base = youtube_api;
    const url = categoryId && categoryId !== 0 ? `${base}&videoCategoryId=${categoryId}` : base;

    try {
      const res = await fetch(url);
      const json = await res.json();
      if (!json || !json.items) {
        setVideos([]);
        setError("No videos found or API error.");
      } else {
        setVideos(json.items);
      }
    } catch (e) {
      setError("Failed to fetch videos. Check network/API key/quota.");
      setVideos([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchVideos(selectedFilter);
  }, [selectedFilter]);

  const filteredVideos = videos.filter((vid) => vid?.snippet?.title?.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
    <Header search={search} setSearch={setSearch} onToggle={toggleSidebar} />
     <div className="flex min-w-0">
  {/* Sidebar */}
  {isSidebarOpen && (
    <div className="w-56 flex-shrink-0">
      <div className="sticky top-16">
        <Slidebar isOpen={isSidebarOpen} />
      </div>
    </div>
  )}

  {/* Main Content */}
  <main className="flex-1 px-4 overflow-x-hidden">
    <FilterBar selected={selectedFilter} onSelect={setSelectedFilter} />

    {loading ? (
      <div className="flex flex-wrap gap-4 w-full">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="w-1/4">
            <ShimmerChar />
          </div>
        ))}
      </div>
    ) : error ? (
      <div className="text-center text-red-500 w-full py-8">{error}</div>
    ) : filteredVideos.length === 0 ? (
      <div className="text-center text-gray-500 w-full py-8">No videos found.</div>
    ) : (
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredVideos.map((video) => (
          <div key={video.id?.videoId || video.id} className="">
            <VideoCard info={video} />
          </div>
        ))}
      </div>
    )}
  </main>
</div>
    
    </>
  );
};
// import ShimmerChar from "./shimmerChar";
// import Slidebar from "./slidebar";
 //import ShortPage from "./shortPage";
// // Map filter names to YouTube category IDs
// const categoryMap = {
//   Music: 10,
//   Sports: 17,
//   News: 25,
//   Gaming: 20,
//   Fashion: 26,
//   Comedy: 23,
//   Education: 27,
//   Science: 28,
//   Documentary: 36,
//   Movie: 1,
//   Travel: 19,
//   Food: 26,
//   Kids: 37,
//   Technology: 28,
//   Live: 20,
//   Trending: 0,
//   Learning: 27,
//   Automobiles: 2,
//   All: 0,
//   Top: 0,
//   Cricket: 17,
//   Health: 26,
// };



// const FeedContent = () => {
//   const [loading, setLoading] = useState(true);
//   const [videos, setVideos] = useState([]);
//   const [search, setSearch] = useState("");
//   const [selectedFilter, setSelectedFilter] = useState("All");
//   const [error, setError] = useState("");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => setIsSidebarOpen((s) => !s);

//   // Fetch videos based on selected filter
//   const fetchVideos = async (filter) => {
//     setLoading(true);
//     setError("");
//     const categoryId = categoryMap[filter];
//     const base = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=20&regionCode=US&key=${api_key}`;
//     const url = categoryId && categoryId !== 0 ? `${base}&videoCategoryId=${categoryId}` : base;

//     try {
//       const res = await fetch(url);
//       const json = await res.json();
//       if (!json || !json.items) {
//         setVideos([]);
//         setError("No videos found or API error.");
//       } else {
//         setVideos(json.items);
//       }
//     } catch (e) {
//       setError("Failed to fetch videos. Check network/API key/quota.");
//       setVideos([]);
//     }

//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchVideos(selectedFilter);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [selectedFilter]);

//   const filteredVideos = videos.filter((vid) => vid?.snippet?.title?.toLowerCase().includes(search.toLowerCase()));

//   return (
//     <>
//       <Header search={search} setSearch={setSearch} onToggle={toggleSidebar} />

//       <div className="flex w-full">
//         {/* Sidebar - hidden on small screens, sticky on large screens */}
//         <div className="w-56 flex-shrink-0 hidden lg:block">
//           <div className="sticky top-16">
//             <Slidebar isOpen={isSidebarOpen} />
//           </div>
//         </div>

//         {/* Main content */}
//         <main className="flex-1 px-4">
//           <FilterBar selected={selectedFilter} onSelect={setSelectedFilter} />

//           {loading ? (
//             <div className="flex flex-wrap gap-4 w-full">
//               {Array.from({ length: 12 }).map((_, i) => (
//                 <div key={i} className="w-1/4">
//                   <ShimmerChar />
//                 </div>
//               ))}
//             </div>
//           ) : error ? (
//             <div className="text-center text-red-500 w-full py-8">{error}</div>
//           ) : filteredVideos.length === 0 ? (
//             <div className="text-center text-gray-500 w-full py-8">No videos found.</div>
//           ) : (
//             <div className="flex flex-wrap gap-4">
//               {filteredVideos.map((video) => (
//                 <div key={video.id?.videoId || video.id} className="w-1/4">
//                   <VideoCard info={video} />
//                 </div>
//               ))}
//             </div>
//           )}
//         </main>
//       </div>
//       <ShortPage />
//     </>
//   );
// };

// const FeedContent = () => {
//   return (
//     <div className="">
       
//     </div>
//   );
// };

export default FeedContent;
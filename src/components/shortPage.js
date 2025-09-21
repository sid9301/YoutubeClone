// import Button from './button';

// const ShortPage = () => {
  
//   return (
//   <div className="flex justify-center items-center h-screen bg-black">
//   {/* Video Container */}
//   <div className="relative w-[300px] h-[520px] bg-white rounded-lg shadow-lg overflow-hidden">
//     {/* Video */}
//     <video
//       src="https://videocdn.cdnpk.net/videos/d37dc403-9bae-4cf6-ac06-b6fbeab6ad73/horizontal/previews/clear/large.mp4?token=exp=1757820932~hmac=64a3f789c0ef210c23aec0aba526f56c210a8157eb65aeb2382f129bf360dccc"
//       className="w-full h-full object-cover"
//       autoPlay
//       loop
//       controls
//     ></video>

//     {/* Buttons - Floating Right Side */}
//     <div className="absolute right-3 bottom-11 flex flex-col items-center gap-4 mb-6">
//       <button className="bg-gray-800 text-white rounded-full p-3 shadow-md hover:bg-gray-600">👍 4</button>
//       <button className="bg-gray-800 text-white rounded-full p-3 shadow-md hover:bg-gray-600">👎4</button>
//       <button className="bg-gray-800 text-white rounded-full p-3 shadow-md hover:bg-gray-600">💬4</button>
//       <button className="bg-gray-800 text-white rounded-full p-3 shadow-md hover:bg-gray-600">🔗 </button>
//     </div>
//   </div>
// </div>


//   );
// };

// export default ShortPage;

 import React, { useState, useRef, useEffect } from "react";
 import { useSwipeable } from "react-swipeable";
 import { FiHeart, FiMessageCircle, FiShare2, FiPlay, FiPause, FiMoreVertical } from "react-icons/fi";

const videos = [
   "https://videocdn.cdnpk.net/videos/f373d7dd-c5bc-42e9-b02b-73345900bbc3/horizontal/previews/clear/large.mp4?token=exp=1757836272~hmac=f701526b62a052b5ae3ae168470007a498dcc3843b9619513b59fe43b852a160",
   "https://videocdn.cdnpk.net/videos/2dba5751-a6fd-40c8-b3f2-fe2205df27f1/horizontal/previews/clear/large.mp4?token=exp=1757835763~hmac=13c50cdfd285ceafc72ada6b27a38233e6f42e2fba5f9f82414e48ea7f6b74fd",
    "https://videocdn.cdnpk.net/videos/b396b49f-7b00-4e7b-a1d5-6e7f417db965/horizontal/previews/clear/large.mp4?token=exp=1757835881~hmac=111c8e81a77832e828a495929215217f38c07eaa315839483df69d97eac76403"
 ];

export default function ShortsPage() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [likes, setLikes] = useState(420);
  const [comments, setComments] = useState(12);
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const handlers = useSwipeable({
    onSwipedUp: () => setIndex((i) => Math.min(i + 1, videos.length - 1)),
    onSwipedDown: () => setIndex((i) => Math.max(i - 1, 0)),
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
    trackMouse: false,
  });

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.load();
    v.muted = true; // mimic Shorts autoplay muted
    const playPromise = v.play();
    if (playPromise && playPromise.catch) playPromise.catch(() => {});
    setPlaying(true);

    const onTime = () => {
      const pct = v.duration ? (v.currentTime / v.duration) * 100 : 0;
      setProgress(Number.isFinite(pct) ? pct : 0);
    };
    v.addEventListener("timeupdate", onTime);
    return () => v.removeEventListener("timeupdate", onTime);
  }, [index]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(videos[index]);
      // optionally show a toast
    } catch {
      // ignore
    }
  };

  return (
    <div {...handlers} className="min-h-screen bg-black flex items-center justify-center">
      <div className="relative w-full max-w-md h-[85vh] md:h-[92vh] bg-black rounded-xl shadow-2xl overflow-hidden">
        {/* Video */}
        <video
          ref={videoRef}
          src={videos[index]}
          className="w-full h-full object-cover"
          autoPlay
          loop
          playsInline
          muted
        />

        {/* Top overlay: channel + more */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between text-white">
          <div className="flex items-center gap-3">
            <img src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg" alt="avatar" className="w-12 h-12 rounded-full border-2 border-white" />
            <div>
              <div className="font-semibold">Creator Name</div>
              <div className="text-xs text-white/80">@channel • 1.2M views</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="bg-red-600 text-white px-3 py-1 rounded-md">Subscribe</button>
            <button className="p-2 bg-white/10 rounded-full"><FiMoreVertical className="text-white" /></button>
          </div>
        </div>

        {/* Bottom left: caption */}
        <div className="absolute left-4 bottom-20 max-w-[65%] text-white">
          <div className="bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 rounded-md">
            <p className="text-sm">This is a sample short caption — it can be multiple lines and supports hashtags #react #tailwind</p>
          </div>
        </div>

        {/* Right action column */}
        <div className="absolute right-4 bottom-28 flex flex-col items-center gap-5 text-white">
          <button onClick={() => setLikes((l) => l + 1)} className="flex flex-col items-center">
            <div className="bg-black/60 p-3 rounded-full shadow-lg"><FiHeart className="text-2xl text-red-500" /></div>
            <div className="text-xs mt-1">{likes}</div>
          </button>

          <button onClick={() => setComments((c) => c + 1)} className="flex flex-col items-center">
            <div className="bg-black/60 p-3 rounded-full shadow-lg"><FiMessageCircle className="text-2xl" /></div>
            <div className="text-xs mt-1">{comments}</div>
          </button>

          <button onClick={copyLink} className="flex flex-col items-center">
            <div className="bg-black/60 p-3 rounded-full shadow-lg"><FiShare2 className="text-2xl" /></div>
            <div className="text-xs mt-1">Share</div>
          </button>

          <button onClick={togglePlay} className="mt-2 bg-white/10 p-2 rounded-full">
            {playing ? <FiPause className="text-white text-xl" /> : <FiPlay className="text-white text-xl" />}
          </button>
        </div>

        {/* Progress bar */}
        <div className="absolute left-0 right-0 bottom-0 h-1 bg-white/20">
          <div className="h-1 bg-red-500 transition-all" style={{ width: `${progress}%` }} />
        </div>

        {/* Small pager dots */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-4 flex items-center gap-2">
          {videos.map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full ${i === index ? 'bg-white' : 'bg-white/40'}`} />
          ))}
        </div>
      </div>
    </div>
  );
}


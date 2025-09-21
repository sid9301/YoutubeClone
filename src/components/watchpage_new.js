import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { api_key } from "../utils/constant";
import { MdThumbUp, MdThumbUpOffAlt, MdOutlineShare, MdOutlinePlaylistAdd, MdMoreHoriz } from "react-icons/md";

const RelatedCard = ({ item }) => {
  const id = item.id?.videoId || item.id;
  const title = item.snippet?.title || "Untitled";
  const channel = item.snippet?.channelTitle || "Channel";

  return (
    <Link to={`/watch/${id}`} state={{ info: item }} className="flex gap-3 items-start p-2 hover:bg-white/50 rounded">
      <img src={item.snippet?.thumbnails?.default?.url} className="w-28 h-16 rounded-md object-cover" alt={title} />
      <div className="flex-1">
        <div className="text-sm font-medium leading-tight">{title}</div>
        <div className="text-xs text-gray-500">{channel}</div>
      </div>
    </Link>
  );
};

const WatchPage = () => {
  const { videoId } = useParams();
  const location = useLocation();
  const initialInfo = location.state?.info || null;

  const [info, setInfo] = useState(initialInfo);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(!initialInfo);
  const [error, setError] = useState("");

  // UI state for action buttons
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [descOpen, setDescOpen] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!videoId) return;

    let cancelled = false;
    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const detailsUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${api_key}`;
        const dRes = await fetch(detailsUrl);
        if (!dRes.ok) throw new Error(`Video details fetch failed (${dRes.status})`);
        const dJson = await dRes.json();
        const vid = dJson.items && dJson.items[0] ? dJson.items[0] : null;
        if (!cancelled) setInfo(vid);

        const relUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${videoId}&type=video&maxResults=8&key=${api_key}`;
        const rRes = await fetch(relUrl);
        if (rRes.ok) {
          const rJson = await rRes.json();
          if (!cancelled) setRelated(rJson.items || []);
        } else {
          if (!cancelled) setRelated([]);
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) setError(err.message || "Failed to load video");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => {
      cancelled = true;
    };
  }, [videoId]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2000);
    return () => clearTimeout(t);
  }, [toast]);

  const handleCopyLink = async () => {
    const link = `${window.location.origin}/watch/${videoId}`;
    try {
      await navigator.clipboard.writeText(link);
      setToast("Link copied to clipboard");
    } catch (err) {
      // fallback
      const el = document.createElement("textarea");
      el.value = link;
      document.body.appendChild(el);
      el.select();
      try {
        document.execCommand("copy");
        setToast("Link copied to clipboard");
      } catch (e) {
        setToast("Could not copy link");
      }
      document.body.removeChild(el);
    }
  };

  if (loading) return <div className="p-6">Loading video…</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;
  if (!info) return <div className="p-6">No video data available</div>;

  const vidId = videoId || info.id?.videoId || info.id;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-black rounded-lg overflow-hidden shadow">
            <div className="relative" style={{ paddingTop: "56.25%" }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${vidId}`}
                title={info.snippet?.title || "Video"}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-semibold">{info.snippet?.title}</h2>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">{info.statistics?.viewCount ? Number(info.statistics.viewCount).toLocaleString() : "-"} views • {new Date(info.snippet?.publishedAt).toLocaleDateString()}</div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLiked((s) => !s)}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-200 rounded-md"
                  aria-pressed={liked}
                >
                  {liked ? <MdThumbUp className="text-blue-600" /> : <MdThumbUpOffAlt />}
                  <span className="text-sm">{liked ? "Liked" : "Like"}</span>
                </button>

                <button onClick={handleCopyLink} className="flex items-center gap-2 px-3 py-2 bg-gray-200 rounded-md">
                  <MdOutlineShare />
                  <span className="text-sm">Share</span>
                </button>

                <button onClick={() => setSaved((s) => !s)} className="flex items-center gap-2 px-3 py-2 bg-gray-200 rounded-md">
                  <MdOutlinePlaylistAdd />
                  <span className="text-sm">{saved ? "Saved" : "Save"}</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 border-t pt-4">
              <div className="flex items-center gap-4">
                <img src={info.snippet?.thumbnails?.default?.url} className="w-12 h-12 rounded-full bg-gray-200" alt={info.snippet?.channelTitle} />
                <div>
                  <div className="font-medium">{info.snippet?.channelTitle}</div>
                  <div className="text-sm text-gray-500">{info.statistics?.subscriberCount ?? ""}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSubscribed((s) => !s)}
                  className={`px-4 py-2 rounded-md ${subscribed ? "bg-gray-200" : "bg-red-600 text-white"}`}
                >
                  {subscribed ? "Subscribed" : "Subscribe"}
                </button>
                <button className="px-3 py-2 bg-gray-100 rounded-md">
                  <MdMoreHoriz />
                </button>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-700">
              <div className={`${descOpen ? "" : "line-clamp-3"}`}>
                {info.snippet?.description || "No description provided."}
              </div>
              <button onClick={() => setDescOpen((s) => !s)} className="mt-2 text-sm text-blue-600">
                {descOpen ? "Show less" : "Show more"}
              </button>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold">Comments</h3>
              <div className="mt-3 space-y-3">
                <div className="p-3 bg-white rounded shadow-sm">Comments are not loaded (placeholder)</div>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-3">
          {related.map((r) => (
            <RelatedCard key={r.id?.videoId || r.id} item={r} />
          ))}
        </aside>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed left-1/2 -translate-x-1/2 bottom-6 bg-black text-white px-4 py-2 rounded-md shadow">
          {toast}
        </div>
      )}
    </div>
  );
};

export default WatchPage;
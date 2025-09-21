

const VideoPlayer = ({ info }) => {
    if (!info || !info.snippet) {
        return <div>Loading...</div>;
    }

    const { snippet, statistics } = info;
    const { channelTitle, thumbnails, title } = snippet;

    return (
        <div className="rounded-lg shadow hover:bg-gray-100 transform transition duration-200 overflow-hidden">
            {/* Thumbnail: let the image fill the card width, parent controls column width */}
            <img src={thumbnails?.high?.url} alt={title} className="w-full h-44 object-cover" />
            <div className="p-3">
                <h2 className="text-sm font-semibold text-gray-900 truncate">{title}</h2>
                <p className="text-xs text-gray-600 mt-1">{channelTitle}</p>
                <div className="text-xs text-gray-500 flex gap-2 mt-2">
                    <span>{statistics?.viewCount ?? "-"} views</span>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;
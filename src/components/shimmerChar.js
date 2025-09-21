// YouTube-style shimmer card using Tailwind CSS

const ShimmerChar = () => {
  return (
    <div className="w-1/4 h-90 p-2 "> 
      <div className="animate-pulse flex flex-col h-full bg-white rounded-lg shadow">
        {/* Thumbnail shimmer */}
        <div className="h-44 bg-gray-300 rounded-t-lg"></div>
        <div className="flex p-4">
          {/* Avatar shimmer */}
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <div className="ml-3 flex-1 space-y-3">
            {/* Title shimmer */}
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            {/* Channel shimmer */}
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            {/* Stats shimmer */}
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ShimmerChar;
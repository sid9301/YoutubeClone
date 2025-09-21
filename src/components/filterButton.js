

const filters = ["All","Top","Cricket","Movie","Sports","Music","News","Gaming","Live","Fashion","Learning","Trending", "Technology","Comedy","Travel","Food","Health","Science","Documentary","Kids","Education","Automobiles"
];

const FilterBar = ({ selected, onSelect }) => (
  <div className="flex gap-3 px-6 py-3 bg-white border-b border-gray-200 sticky top-0 z-10 overflow-scroll"
      style={{
      scrollbarWidth: "none",      // Firefox
      msOverflowStyle: "none"      // IE 10+
    }}
  >
    {/* Hide scrollbar for Chrome, Safari and Opera */}
    <style>
      {`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}
    </style>
    {filters.map((filter) => (
      <button
        key={filter}
        className={`px-4 py-2 rounded-full text-sm font-medium transition 
          ${selected === filter ? "bg-black text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
        onClick={() => onSelect(filter)}
      >
        {filter}
      </button>
    ))}
  </div>
);

export default FilterBar;
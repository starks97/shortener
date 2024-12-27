export default function NoData() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      {/* Icon / Illustration */}
      <div className="w-16 h-16 mb-4 flex items-center justify-center text-gray-400">
        <svg
          className="w-16 h-16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 10h18M3 6h18M3 14h18M3 18h18"
          />
        </svg>
      </div>

      {/* Headline */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        No More Data
      </h2>

      {/* Subtext */}
      <p className="text-gray-500 text-center max-w-md">
        You have reached the end! There are no more items to load at this time.
      </p>
    </div>
  );
}

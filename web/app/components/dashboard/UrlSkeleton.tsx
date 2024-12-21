import Skeleton from "react-loading-skeleton";

export default function SkeletonUrlCard() {
  return (
    <div className="max-w-sm p-6 border-y border-gray-400 rounded-2xl flex items-center space-x-4 flex-col w-full h-auto">
      <div className="inline-flex font-medium items-center gap-2">
        <button
          className={`w-full text-white py-2 px-5 rounded-xl transition flex items-center justify-center bg-transparent border-2 border-gray-400 `}
          aria-label="Shorten URL"
        >
          <Skeleton circle={true} height={24} width={24} />
          <Skeleton
            width={`60%`}
            height={20}
            style={{ marginLeft: "0.5rem" }}
          />
        </button>
      </div>
      <div className="mt-5 w-full flex items-center justify-between">
        <div className="btn-grad flex items-center justify-center w-10 h-10">
          <Skeleton circle={true} height={24} width={24} />
        </div>

        <div className="btn-grad flex items-center justify-center w-10 h-10">
          <Skeleton circle={true} height={24} width={24} />
        </div>
      </div>
    </div>
  );
}

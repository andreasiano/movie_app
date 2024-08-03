export default function ScrollSkel() {
    return (
      <div className="relative max-w-[280px] min-w-[280px] bg-gray-800 bg-opacity-20 rounded-xl animate-pulse">
        <div className="h-[400px] bg-gray-700 rounded-t-xl"></div>
        <div className="absolute bottom-0 w-full bg-gray-700 bg-opacity-30 p-2 rounded-b-xl">
          <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-600 rounded w-1/2"></div>
        </div>
      </div>
    );
  }
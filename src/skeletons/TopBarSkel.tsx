const TopBarSkeleton = () => {
    return (
      <div className="flex mb-8 items-center justify-between p-4 animate-pulse">
        <div className="w-6 h-6 bg-gray-400 rounded mr-10"></div>
        <div className="flex-1 relative">
          <div className="w-full lg:w-[300px] h-10 bg-gray-400 rounded"></div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 bg-gray-400 rounded-full"></div>
            <div className="w-24 h-6 bg-gray-400 rounded"></div>
          </div>
        </div>
      </div>
    );
  };

export default TopBarSkeleton
  
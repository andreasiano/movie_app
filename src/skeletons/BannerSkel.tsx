export default function BannerSkeleton() {
    return (
      <section className="relative rounded-lg w-full h-[80vh] overflow-hidden bg-gray-700 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent z-10"></div>
        <div className="absolute inset-0 flex flex-col items-center lg:items-start justify-center lg:mx-10 lg:px-8 z-20">
          <div className="lg:w-[500px] xs:w-[250px] mx-auto lg:mx-0 lg:text-left text-center">
            <div className="h-8 bg-gray-600 rounded mb-4"></div>
            <div className="h-4 bg-gray-600 rounded mb-2"></div>
            <div className="h-4 bg-gray-600 rounded mb-2"></div>
            <div className="h-4 bg-gray-600 rounded mb-2"></div>
          </div>
          <div className="flex items-center mt-4 space-x-4 justify-center text-xs sm:text-sm md:text-base lg:text-lg">
            <div className="h-6 w-20 bg-gray-600 rounded"></div>
            <div className="h-6 w-20 bg-gray-600 rounded"></div>
            <div className="h-6 w-20 bg-gray-600 rounded"></div>
          </div>
          <div className="w-24 h-10 bg-red-500 rounded-xl mt-5"></div>
        </div>
      </section>
    );
  };
  
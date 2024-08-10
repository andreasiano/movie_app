import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from '../redux/store/store';
import { FaArrowLeft, FaArrowRight, FaStar, FaEye, FaFilm, FaTv } from 'react-icons/fa';
import BannerSkel from "../skeletons/BannerSkel";

export interface BannerItem {
  release_date: string;
  id: number;
  backdrop_path: string;
  poster_path: string;
  title?: string;
  name?: string;
  overview: string;
  vote_average?: number; // Rating
  vote_count?: number; // Views
  media_type?: 'movie' | 'tv'; // Media type
}

export default function BannerBrowse() {
  const bannerData = useSelector((state: RootState) => state.movieData.bannerData as BannerItem[]);
  const imageUrl = useSelector((state: RootState) => state.movieData.imageUrl);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextIndex, setNextIndex] = useState(0); // To preload the next image
  const [isMobile, setIsMobile] = useState(false); // To detect mobile devices

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIfMobile(); // Initial check
    window.addEventListener('resize', checkIfMobile); // Update on window resize

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      const interval = setInterval(() => {
        handleNextImage();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [bannerData, isMobile]);

  const handleNextImage = () => {
    if (bannerData && bannerData.length > 0 && !isTransitioning) {
      setNextIndex((currentIndex + 1) % bannerData.length); // Preload the next image
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerData.length);
        setIsTransitioning(false);
      }, 500); // Wait for fade-out before changing the content
    }
  };

  const handlePrevImage = () => {
    if (bannerData && bannerData.length > 0 && !isTransitioning) {
      setNextIndex((currentIndex - 1 + bannerData.length) % bannerData.length); // Preload the previous image
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + bannerData.length) % bannerData.length);
        setIsTransitioning(false);
      }, 500); // Wait for fade-out before changing the content
    }
  };

  if (!bannerData || bannerData.length === 0) {
    return <BannerSkel />;
  }

  const currentBanner = bannerData[currentIndex];
  const nextBanner = bannerData[nextIndex]; // Preload the next image

  if (!currentBanner) return null;

  const bannerTitle = currentBanner.title || currentBanner.name; // Get the title or name
  const mediaTypeIcon = currentBanner.media_type === 'movie' ? <FaFilm /> : <FaTv />; // Determine the media type icon

  // Truncate description text with an ellipsis
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <section className="relative mb-10 w-full h-[80vh] overflow-hidden rounded-xl">
      {/* Preload the next image */}
      <div style={{ display: 'none' }}>
        <img src={imageUrl + nextBanner.backdrop_path} alt="Preload" />
      </div>

      <div className="absolute inset-0 transition-opacity duration-500" style={{ opacity: isTransitioning ? 0 : 1 }}>
        <img
          src={imageUrl + currentBanner.backdrop_path}
          className="w-full h-full rounded-xl object-cover"
          alt="Banner"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent rounded-xl z-10"></div>
      <div className={`absolute inset-0 flex flex-col items-center lg:items-start justify-center lg:mx-10 lg:px-8 z-20 transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <div className="lg:w-[500px] xs:w-[250px] mx-auto lg:mx-0 lg:text-left text-center">
          <h1 className="text-white lg:text-5xl text-3xl md:text-3xl font-bold mb-4">{bannerTitle}</h1>
          <h2 className="text-gray-300 xs:text-lg sm:text-sm md:text-base lg:text-xl font-custom-light">
            {truncateText(currentBanner.overview, 150)}
          </h2>
        </div>
        <div className="flex items-center mt-4 space-x-4 justify-center text-xs sm:text-sm md:text-base lg:text-lg">
          <div className="flex items-center text-white">
            <FaStar className="mr-2" />
            <span>{currentBanner.vote_average ? currentBanner.vote_average.toFixed(1) : 'N/A'}</span>
          </div>
          <div className="flex items-center text-white">
            <FaEye className="mr-2" />
            <span>{currentBanner.vote_count || 'N/A'}</span>
          </div>
          <div className="flex items-center text-white">
            {mediaTypeIcon}
            <span className="ml-2">{currentBanner.media_type === 'movie' ? 'Movie' : 'TV Show'}</span>
          </div>
        </div>
        <button className="bg-red-500 shadow-lg shadow-red-900 rounded-xl px-10 py-3 mt-5">Watch</button>
      </div>
      <button
        onClick={handlePrevImage}
        className="absolute left-3 md:left-5 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-20"
      >
        <FaArrowLeft />
      </button>
      <button
        onClick={handleNextImage}
        className="absolute right-3 md:right-5 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-20"
      >
        <FaArrowRight />
      </button>
    </section>
  );
}
































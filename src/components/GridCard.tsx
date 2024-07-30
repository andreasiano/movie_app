import { useState } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import { BannerItem } from "../components/BannerBrowse";
import moment from 'moment';
import { AiOutlineCalendar } from 'react-icons/ai';
import { FaStar, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface CardProps {
  data: BannerItem;
  trending: boolean;
  index: number;
}

export default function Card({ data, trending, index }: CardProps) {
  const imageUrl = useSelector((state: RootState) => state.movieData.imageUrl);
  const fullImageUrl = `${imageUrl}${data.poster_path}`;

  const formattedDate = moment(data.release_date).format('MMMM Do, YYYY');
  const [isLiked, setIsLiked] = useState(false);

  const handleHeartClick = () => {
    setIsLiked(!isLiked);
  };
  return (
    <Link to={`/${data.media_type}/${data.id}`} className="relative bg-gray-800 bg-opacity-20 rounded-xl">
      <img src={fullImageUrl} alt={data.title || data.name} className="rounded-xl opacity-80" />
      <div className="absolute top-5 left-0">
        {trending && (
          <div className="bg-slate-700 bg-opacity-30 backdrop-blur-md text-white p-2 rounded-r-full">
            #{index} Trending
          </div>
        )}
      </div>
      <div className="absolute top-5 right-5">
        <div
          className={`p-2 border-white border-2 rounded-full ${isLiked ? 'bg-red-600' : 'bg-gray-700'} bg-opacity-30 backdrop-blur-md text-white cursor-pointer`}
          onClick={handleHeartClick}
        >
          <FaHeart className={`${isLiked ? 'text-red-500' : 'text-white'}`} />
        </div>
      </div>
      <div className="absolute bottom-0 w-full bg-slate-700 bg-opacity-30 backdrop-blur-md p-2 rounded-b-xl">
        <h2 className="text-xl text-ellipsis line-clamp-1 text-white">{data.title || data.name}</h2>
        <div className="flex justify-between items-center mt-2">
          <div className="bg-gray-900 flex items-center bg-opacity-50 text-white py-1 px-2 rounded-md mr-4">
            <AiOutlineCalendar className="text-white mr-2" />
            {formattedDate}
          </div>
          <div className="flex items-center text-white">
            <FaStar className="mr-2" />
            <span>{data.vote_average ? data.vote_average.toFixed(1) : 'N/A'}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
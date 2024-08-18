// GridCard.tsx
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import moment from 'moment';
import { AiOutlineCalendar } from 'react-icons/ai';
import { FaStar, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MediaItem } from './BannerBrowse';

interface CardProps {
  data: MediaItem;
  trending: boolean;
  index: number;
  media_type: string;
  isWatchlist?: boolean;
  onRemove?: () => void;
}

export default function GridCard({ data, trending, index, media_type, isWatchlist, onRemove }: CardProps){
  const imageUrl = useSelector((state: RootState) => state.movieData.imageUrl);
  const fullImageUrl = `${imageUrl}${data.poster_path}`;
  const formattedDate = moment(data.release_date).format('MMMM Do, YYYY');

  return (
    <div className="relative bg-gray-800 bg-opacity-20 rounded-xl">
      <Link to={`/${media_type}/${data.id}`} className="block">
        <img src={fullImageUrl} alt={data.title || data.name} className="w-full h-auto rounded-xl opacity-80" />
      </Link>
      {isWatchlist && onRemove && (
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 text-white bg-red-600 rounded-full p-2 hover:bg-red-700 transition"
        >
          <FaTrash />
        </button>
      )}
      {trending && (
        <div className="absolute top-5 left-0 bg-slate-700 bg-opacity-30 backdrop-blur-md text-white p-2 rounded-r-full">
          #{index} Trending
        </div>
      )}
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
    </div>
  );
};












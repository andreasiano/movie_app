import { useParams } from "react-router-dom";
import useFetchDetails from "../hooks/UseFetchDetails";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import { BannerItem } from "../components/BannerBrowse";

// Import React Icons
import { FaClock, FaStar, FaThumbsUp } from "react-icons/fa";

export default function Details() {
  const params = useParams();
  const imageUrl = useSelector((state: RootState) => state.movieData.imageUrl);

  const { data } = useFetchDetails<BannerItem>(
    `/${params?.explore}/${params?.id}`
  );
  const { data: castData } = useFetchDetails<any>(
    `/${params?.explore}/${params?.id}/credits`
  );
  console.log(castData, 'cast');
  console.log(data, 'data');

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Backdrop Image Container */}
      <div className="w-full h-[480px] relative">
        <div className="w-full h-full">
          <img
            className="rounded-xl w-full h-full object-cover"
            src={imageUrl + data.backdrop_path}
            alt="Movie backdrop"
          />
        </div>
        <div className="absolute rounded-xl w-full h-full top-0 bg-gradient-to-t from-neutral-900 to-transparent"></div>
      </div>

      {/* Poster Image and Text Container */}
      <div className="container px-10 flex-grow">
        <div className="relative mx-auto lg:ml-0 w-fit -mt-[450px] mb-10">
          <img
            className="w-80 h-100 rounded-xl object-cover"
            src={imageUrl + data.poster_path}
            alt="Movie poster"
          />
        </div>
      </div>

      {/* Title, Tagline, and Genres */}
      <div className="container mb-10">
        <h2 className="text-3xl font-bold">{data.title || data.name}</h2>
        {data.tagline && <p className="text-lg italic text-gray-400 mt-2">{data.tagline}</p>}
        <div className="mt-4 flex flex-wrap gap-2">
          {data.genres.map((genre: any) => (
            <span key={genre.id} className="px-3 py-1 bg-red-600 text-white rounded-full text-sm font-semibold">
              {genre.name}
            </span>
          ))}
        </div>

        {/* Ratings, Runtime, Vote Average, Vote Count */}

        <p className="mt-4 lg:w-[800px] text-gray-500 font-custom-light text-lg">{data.overview}</p>
      </div>
        <div className="flex items-center mb-[50px] gap-6 text-gray-500">
          <div className="flex items-center">
            <FaClock className="mr-2" />
            <span>{data.runtime} min</span>
          </div>
          <div className="flex items-center">
            <FaStar className="mr-2 text-yellow-500" />
            <span>{data.vote_average.toFixed(1)} / 10</span>
          </div>
          <div className="flex items-center">
            <FaThumbsUp className="mr-2" />
            <span>{data.vote_count}</span>
          </div>
        </div>
    </div>
  );
}





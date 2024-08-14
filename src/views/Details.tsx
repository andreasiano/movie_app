import { useParams } from "react-router-dom";
import useFetchDetails from "../hooks/UseFetchDetails";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import { BannerItem } from "../components/BannerBrowse";
import { FaClock, FaStar, FaThumbsUp, FaTv } from "react-icons/fa";
import { DiHtml5Multimedia } from "react-icons/di";

export default function Details() {
  const params = useParams();
  const imageUrl = useSelector((state: RootState) => state.movieData.imageUrl);

  const { data } = useFetchDetails<BannerItem>(
    `/${params?.explore}/${params?.id}`
  );
  const { data: castData } = useFetchDetails<any>(
    `/${params?.explore}/${params?.id}/credits`
  );

  if (!data) {
    return <div>Loading...</div>;
  }

  console.log(castData, 'cast')
  console.log(data, 'data')

  const isMovie = 'runtime' in data;
  const isTVSeries = 'number_of_episodes' in data && 'number_of_seasons' in data;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full h-[480px] relative">
        <div className="w-full h-full">
          <img
            className="rounded-xl w-full h-full object-cover"
            src={imageUrl + data.backdrop_path}
            alt={data.title || data.name}
          />
        </div>
        <div className="absolute rounded-xl w-full h-full top-0 bg-gradient-to-t from-neutral-900 to-transparent"></div>
      </div>

      <div className="container px-10 flex-grow">
        <div className="relative mx-auto lg:ml-0 w-fit -mt-[450px] mb-10">
          <img
            className="w-80 h-100 rounded-xl object-cover"
            src={imageUrl + data.poster_path}
            alt={data.title || data.name}
          />
        </div>
      </div>

      <div className="container mb-10">
        <h2 className="lg:text-5xl text-3xl font-bold">{data.title || data.name}</h2>
        {data.tagline && <p className="text-lg italic text-gray-400 mt-2">{data.tagline}</p>}
        <div className="mt-4 flex flex-wrap gap-2">
          {data.genres.map((genre: any) => (
            <span key={genre.id} className="px-3 py-1 bg-red-600 text-white rounded-full text-sm font-semibold">
              {genre.name}
            </span>
          ))}
        </div>

        <p className="mt-4 lg:w-[800px] text-gray-500 font-custom-light text-xl lg:text-2xl">{data.overview}</p>
      </div>

      <div className="flex items-center mb-[50px] gap-6 text-gray-500">
        {isMovie && (
          <div className="flex items-center">
            <FaClock className="mr-2" />
            <span>{data.runtime} min</span>
          </div>
        )}
        {isTVSeries && (
          <>
            <div className="flex items-center">
              <DiHtml5Multimedia className="mr-2"/>
              <span>{data.number_of_episodes} episodes</span>
            </div>
            <div className="flex items-center">
              <FaTv className="mr-2" />
              <span>{data.number_of_seasons} seasons</span>
            </div>
          </>
        )}
        <div className="flex items-center">
          <FaStar className="mr-2 text-yellow-500" />
          <span>{data.vote_average ? data.vote_average.toFixed(1) : 'N/A'} / 10</span>
        </div>
        <div className="flex items-center">
          <FaThumbsUp className="mr-2" />
          <span>{data.vote_count ?? 'N/A'}</span>
        </div>
      </div>
    </div>
  );
}






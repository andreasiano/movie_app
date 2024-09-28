import { useState } from "react";
import { useParams } from "react-router-dom";
import useFetchDetails from "../hooks/UseFetchDetails";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store/store";
import { MediaItem } from "../components/BannerBrowse";
import { FaClock, FaStar, FaThumbsUp, FaTv, FaPlus, FaPlay } from "react-icons/fa";
import { DiHtml5Multimedia } from "react-icons/di";
import moment from "moment";
import { AiOutlineCalendar } from "react-icons/ai";
import { addToWatchlist } from "../redux/slice/movieAppSlice";
import placeholder from "../assets/placeholder.webp";
import VideoPlay from "../components/VideoPlay";
const placeholderImage = placeholder;
import { auth } from "../firebase/firebase"; // Import Firebase auth

export default function Details() {
  const { explore, id } = useParams<{ explore: string; id: string }>();
  const dispatch = useDispatch();
  const imageUrl = useSelector((state: RootState) => state.movieData.imageUrl);
  
  // Access watchlists keyed by user ID
  const user = auth.currentUser; // Get the current user
  const userId = user ? user.uid : null; // Get user ID
  const watchlist = userId ? useSelector((state: RootState) => state.movieData.watchlists[userId]) : [];

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [playVideo, setPlayVideo] = useState(false);
  const [playVideoId, setPlayVideoId] = useState("");

  const mediaType = explore === 'tv' ? 'tv' : 'movie';
  const { data } = useFetchDetails<MediaItem>(`/${mediaType}/${id}`);
  const { data: castData } = useFetchDetails<any>(`/${mediaType}/${id}/credits`);

  if (!data) {
    return <div>Loading...</div>;
  }

  const formattedDate = moment(data.release_date).format("MMMM Do, YYYY");

  const isMovie = "runtime" in data;
  const isTVSeries = "number_of_episodes" in data && "number_of_seasons" in data;

  const director = castData?.crew.find((person: any) => person.known_for_department === "Directing");
  const cast = castData?.cast.slice(0, 10) || [];

  const handleAddToWatchlist = () => {
    const item: MediaItem = {
      id: data.id,
      title: data.title || data.name,
      poster_path: data.poster_path,
      media_type: mediaType,
      vote_average: data.vote_average,
      release_date: data.release_date,
      tagline: "",
      number_of_episodes: 0,
      number_of_seasons: 0,
      genres: [],
      runtime: 0,
      backdrop_path: "",
      overview: "",
      origin_country: ""
    };

    const alreadyInWatchlist = watchlist?.some(watchlistItem => watchlistItem.id === item.id);

    if (alreadyInWatchlist) {
      setModalMessage("This item is already in your watchlist!");
    } else if (userId) {
      dispatch(addToWatchlist({ userId, mediaItem: item })); // Dispatch with userId and mediaItem
      setModalMessage("Added to Watchlist!");
    } else {
      setModalMessage("You need to log in to add items to your watchlist!");
    }
    setShowModal(true);
    setTimeout(() => setShowModal(false), 1000);
  };

  const handlePlayVideo = () => {
    setPlayVideoId(data.id.toString());
    setPlayVideo(true);
  };

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

      <div className="container px-10">
        <div className="relative mx-auto lg:ml-0 w-fit -mt-[450px] mb-10">
          <img
            className="w-80 h-100 rounded-xl object-cover"
            src={imageUrl + data.poster_path}
            alt={data.title || data.name}
          />
        </div>
      </div>

      <div className="container lg:mt-0 mt-5 mb-10">
        <h2 className="lg:text-5xl text-3xl font-bold">{data.title || data.name}</h2>
        {data.tagline && (
          <p className="text-lg italic text-gray-400 mt-2">{data.tagline}</p>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          {data.genres.map((genre: any) => (
            <span
              key={genre.id}
              className="px-3 py-1 bg-red-500 text-white rounded-full text-sm font-semibold"
            >
              {genre.name}
            </span>
          ))}
        </div>
        <div className="bg-zinc-700 mt-4 flex items-center bg-opacity-50 text-white w-fit py-1 px-2 rounded-md mr-4">
          <AiOutlineCalendar className="text-white mr-2" />
          {formattedDate}
        </div>

        <p className="mt-4 lg:w-[800px] text-gray-500 font-custom-light text-xl lg:text-2xl">
          {data.overview}
        </p>
      </div>

      <div className="flex flex-wrap sm:flex-nowrap items-center mb-6 gap-6 text-gray-500">
        {isMovie && (
          <div className="flex items-center w-full sm:w-auto">
            <FaClock className="mr-2" />
            <span>{data.runtime} min</span>
          </div>
        )}
        {isTVSeries && (
          <>
            <div className="flex items-center w-full sm:w-auto">
              <DiHtml5Multimedia className="mr-2" />
              <span>{data.number_of_episodes} episodes</span>
            </div>
            <div className="flex items-center w-full sm:w-auto">
              <FaTv className="mr-2" />
              <span>{data.number_of_seasons} seasons</span>
            </div>
          </>
        )}
        <div className="flex items-center w-full sm:w-auto">
          <FaStar className="mr-2 text-yellow-500" />
          <span>{data.vote_average ? data.vote_average.toFixed(1) : "N/A"} / 10</span>
        </div>
        <div className="flex items-center w-full sm:w-auto">
          <FaThumbsUp className="mr-2" />
          <span>{data.vote_count ?? "N/A"}</span>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:gap-4 gap-2 items-center mb-10">
        <button
          onClick={handleAddToWatchlist}
          className="flex transition duration-300 items-center text-zinc-400 hover:text-zinc-300 hover:bg-zinc-500 justify-center gap-2 border-2 border-zinc-500 px-4 py-4 rounded-xl w-full sm:w-auto"
        >
          <FaPlus />
          Add to Watchlist
        </button>
        <button onClick={handlePlayVideo} className="flex items-center transition duration-300 hover:bg-red-700 justify-center gap-2 bg-red-500 shadow-lg shadow-red-900 text-white px-4 py-4 rounded-xl w-full sm:w-auto">
          <FaPlay />
          Play Now
        </button>
      </div>

      {director && (
        <div className="container lg:mt-0 mt-5 mb-10">
          <h2 className="lg:text-4xl text-2xl text-center font-bold mb-4">Director</h2>
          <div className="flex flex-col items-center">
            <img
              className="w-32 h-32 rounded-full object-cover"
              src={director.profile_path ? imageUrl + director.profile_path : placeholderImage}
              alt={director.name}
            />
            <p className="mt-2 text-zinc-500 text-lg text-center">{director.name}</p>
          </div>
        </div>
      )}

      {cast.length > 0 && (
        <div className="container lg:mt-0 mt-5 mb-10">
          <h2 className="lg:text-4xl text-center text-2xl font-bold">Cast</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6">
            {cast.map((actor: any) => (
              <div key={actor.id} className="flex flex-col items-center">
                <img
                  className="w-32 h-32 rounded-full object-cover"
                  src={actor.profile_path ? imageUrl + actor.profile_path : placeholderImage}
                  alt={actor.name}
                />
                <p className="mt-2 text-center text-zinc-500">{actor.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-red-600 text-white p-4 rounded-lg shadow-lg transform translate-y-16">
            <p>{modalMessage}</p>
          </div>
        </div>
      )}

      {playVideo && (
        <VideoPlay data={{ id: playVideoId }} close={() => setPlayVideo(false)} media_type={mediaType} />
      )}
    </div>
  );
}








import { useSelector } from "react-redux";
import GridCard from "../components/GridCard";
import { RootState } from "../redux/store/store";
import { useParams } from "react-router-dom";

export default function Watchlist() {
  const { explore } = useParams<{ explore: string }>(); // Get explore parameter from URL
  const watchlist = useSelector((state: RootState) => state.movieData.watchlist);

  return (
    <div className="container mb-10 mx-auto">
      <h1 className="text-3xl font-bold mb-8">My Watchlist</h1>

      {watchlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {watchlist.map((item) => (
            <GridCard
              key={item.id}
              data={item}
              index={item.id} // Use item.id as a unique key
              trending={false}
              media_type={explore ?? (item.media_type ?? 'movie')} // Correctly handles media_type
              isWatchlist={true}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Your watchlist is empty.</p>
      )}
    </div>
  );
}


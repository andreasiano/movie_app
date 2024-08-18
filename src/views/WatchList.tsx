// Watchlist.tsx
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store/store";
import GridCard from "../components/Grid";
import { removeFromWatchlist } from "../redux/slice/movieAppSlice"; 

export default function Watchlist(){
  const dispatch = useDispatch();
  const watchlist = useSelector(
    (state: RootState) => state.movieData.watchlist
  );

  const handleRemoveFromWatchlist = (id: number) => {
    dispatch(removeFromWatchlist(id));
  };

  return (
    <div className="container mb-10 mx-auto">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {watchlist.length === 0 ? (
          <div className="text-gray-500">Your watchlist is empty.</div>
        ) : (
          watchlist.map((item) => (
            <GridCard
              key={item.id}
              data={item}
              index={item.id}
              trending={false}
              media_type={item.media_type ?? "default"}
              isWatchlist={true}
              onRemove={() => handleRemoveFromWatchlist(item.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};


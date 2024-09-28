// Watchlist.tsx
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store/store";
import GridCard from "../components/Grid";
import { removeFromWatchlist } from "../redux/slice/movieAppSlice"; 
import { auth } from "../firebase/firebase"; // Import Firebase authentication

export default function Watchlist() {
  const dispatch = useDispatch();
  
  // Get the currently logged-in user
  const user = auth.currentUser; 
  const userId = user ? user.uid : null; // Get user ID or null if not logged in

  // Get the user's watchlist from the Redux store
  const watchlist = useSelector((state: RootState) => 
    userId ? state.movieData.watchlists[userId] || [] : []
  );

  const handleRemoveFromWatchlist = (id: number) => {
    if (userId) {
      dispatch(removeFromWatchlist({ userId, itemId: id })); // Dispatch with userId and itemId
    }
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
              onRemove={() => handleRemoveFromWatchlist(item.id)} // Handle item removal
            />
          ))
        )}
      </div>
    </div>
  );
}



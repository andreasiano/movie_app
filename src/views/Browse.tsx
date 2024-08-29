import { useSelector } from "react-redux";
import BannerBrowse, { MediaItem } from "../components/BannerBrowse";
import { RootState } from "../redux/store/store";
import HorizontalScroll from "../components/HorizontalScroll";
import useFetch from "../hooks/UseFetch";
import { useCallback } from "react"; // Import useCallback
import { nowPlayingService, popularMoviesService, topRatedMoviesService, tvAiringTodayService, popularTvService } from "../services/movieService";

export default function Browse() {
  const trendingData = useSelector((state: RootState) => state.movieData.bannerData as MediaItem[]);

  const fetchNowPlaying = useCallback(() => nowPlayingService.getAll(), []);
  const fetchPopularMovies = useCallback(() => popularMoviesService.getAll(), []);
  const fetchTopRatedMovies = useCallback(() => topRatedMoviesService.getAll(), []);
  const fetchTvAiringToday = useCallback(() => tvAiringTodayService.getAll(), []);
  const fetchPopularTv = useCallback(() => popularTvService.getAll(), []);

  const { data: nowPlayingData } = useFetch(fetchNowPlaying);
  const { data: popularData } = useFetch(fetchPopularMovies);
  const { data: topRatedData } = useFetch(fetchTopRatedMovies);
  const { data: tvAiringTodayData } = useFetch(fetchTvAiringToday);
  const { data: popularTvData } = useFetch(fetchPopularTv);

  return (
    <div className="flex scrollbar-hide mb-10 flex-col">
      <BannerBrowse />
      <HorizontalScroll title="Trending" data={trendingData} media_type="" />
      <HorizontalScroll title="Top Rated" data={topRatedData} media_type="movie" />
      <HorizontalScroll title="Now Playing" data={[...(nowPlayingData || [])].reverse()} media_type="movie" />
      <HorizontalScroll title="Popular" data={[...(popularData || [])].reverse()} media_type="movie" />
      <HorizontalScroll title="Trending Series" data={tvAiringTodayData} media_type="tv" />
      <HorizontalScroll title="Popular Series" data={popularTvData} media_type="tv" />
    </div>
  );
}
















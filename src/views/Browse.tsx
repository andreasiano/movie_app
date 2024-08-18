// src/pages/Browse.tsx
import { useSelector } from "react-redux";
import BannerBrowse, { MediaItem } from "../components/BannerBrowse";
import { RootState } from "../redux/store/store";
import HorizontalScroll from "../components/HorizontalScroll";
import useFetch from "../hooks/UseFetch";
import { nowPlayingService, popularMoviesService, topRatedMoviesService, tvAiringTodayService, popularTvService } from "../services/movieService";

export default function Browse() {
  const trendingData = useSelector((state: RootState) => state.movieData.bannerData as MediaItem[]);
  const { data: nowPlayingData } = useFetch(() => nowPlayingService.getAll());
  const { data: popularData } = useFetch(() => popularMoviesService.getAll());
  const { data: topRatedData } = useFetch(() => topRatedMoviesService.getAll());
  const { data: tvAiringTodayData } = useFetch(() => tvAiringTodayService.getAll());
  const { data: popularTvData } = useFetch(() => popularTvService.getAll());

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















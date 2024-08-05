import { useSelector } from "react-redux";
import BannerBrowse, { BannerItem } from "../components/BannerBrowse";
import { RootState } from "../redux/store/store";
import HorizontalScroll from "../components/HorizontalScroll";
import useFetch from "../hooks/UseFetch";

export default function Browse() {
  const trendingData = useSelector((state: RootState) => state.movieData.bannerData as BannerItem[]);
  const {data: nowPlayingData} = useFetch('/movie/now_playing')
  const {data: popularData} = useFetch('/movie/popular')
  const {data: topRatedData} = useFetch('/movie/top_rated')
  const {data: tvAiringTodayData} = useFetch('/tv/airing_today')
  const {data: popularTvData} = useFetch('/tv/popular')

  return (
    <div className="flex scrollbar-hide mb-10 flex-col">
      <BannerBrowse />
      <HorizontalScroll title="Trending" data={trendingData} media_type=""/>
      <HorizontalScroll title="Top Rated" data={topRatedData} media_type="movie"/>
      <HorizontalScroll title="Now Playing" data={[...nowPlayingData].reverse()} media_type="movie"/>
      <HorizontalScroll title="Popular" data={[...popularData].reverse()} media_type="tv" />
      <HorizontalScroll title="Trending Series" data={tvAiringTodayData} media_type="tv" />
      <HorizontalScroll title="Popular Series" data={popularTvData}media_type="tv" />
    </div>
  );
}













// src/services/movieService.ts
import createHttpService from "./httpService";

// Existing services
export const nowPlayingService = createHttpService('/movie/now_playing');
export const popularMoviesService = createHttpService('/movie/popular');
export const topRatedMoviesService = createHttpService('/movie/top_rated');
export const tvAiringTodayService = createHttpService('/tv/airing_today');
export const popularTvService = createHttpService('/tv/popular');




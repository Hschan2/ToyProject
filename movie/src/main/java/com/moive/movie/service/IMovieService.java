package com.moive.movie.service;

import com.moive.movie.model.MovieDto;

public interface IMovieService {
    MovieDto searchMovies(String title);
    MovieDto getPopularMovies();
    MovieDto getHighRatedMovies();
    MovieDto getNowPlayingMovies();
    MovieDto getUpcomingMovies();
    MovieDto getMovieDetail(int id);
}

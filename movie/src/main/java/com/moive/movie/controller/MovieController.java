package com.moive.movie.controller;

import com.moive.movie.model.MovieApiResponse;
import com.moive.movie.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MovieController {
    private final MovieService movieService;

    @Autowired
    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping("/api/popular")
    public MovieApiResponse popular() {
        return movieService.getPopularMovies();
    }

    @GetMapping("/api/highRated")
    public MovieApiResponse highRated() {
        return movieService.getHighRatedMovies();
    }

    @GetMapping("/api/now_playing")
    public MovieApiResponse nowPlaying() {
        return movieService.getNowPlayingMovies();
    }

    @GetMapping("/api/upcoming")
    public MovieApiResponse upcoming() {
        return movieService.getUpcomingMovies();
    }

    @GetMapping("/api/detail/{id}")
    public MovieApiResponse detail(@PathVariable("id") String id) {
        return movieService.getMovieDetail(id);
    }

    @GetMapping("/api/search")
    public MovieApiResponse search(@RequestParam String searchText) {
        return movieService.searchMovies(searchText);
    }
}

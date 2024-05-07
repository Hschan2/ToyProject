package com.moive.movie.controller;

import com.moive.movie.model.MovieDto;
import com.moive.movie.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @GetMapping("/popular")
    public MovieDto getPopularMovies() {
        return movieService.getPopularMovies();
    }

    @GetMapping("/highRated")
    public MovieDto getHighRatedMovies() {
        return movieService.getHighRatedMovies();
    }

    @GetMapping("/now_playing")
    public MovieDto getNowPlayingMovies() {
        return movieService.getNowPlayingMovies();
    }

    @GetMapping("/upcoming")
    public MovieDto getUpcomingMovies() {
        return movieService.getUpcomingMovies();
    }

    @GetMapping("/detail/{id}")
    public MovieDto getMovieDetail(@PathVariable int id) {
        return movieService.getMovieDetail(id);
    }

    @GetMapping("/search")
    public MovieDto search(@RequestParam String searchText) {
        return movieService.searchMovies(searchText);
    }
}

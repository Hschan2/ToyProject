package com.moive.movie.service;

import com.moive.movie.model.MovieDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class MovieService implements IMovieService {

    private static final String API_URL = "https://api.themoviedb.org/3";

    @Autowired
    private RestTemplate restTemplate;

    @Value("${tmdb.api.key}")
    private String apiKey;

    @Override
    public MovieDto getPopularMovies() {
        final String url = API_URL + "/movie/popular?api_key=" + apiKey + "&language=ko-KR";;
        MovieDto movieDto = restTemplate.getForObject(url, MovieDto.class);

        return movieDto;
    }

    @Override
    public MovieDto getHighRatedMovies() {
        final String url = API_URL + "/movie/top_rated?api_key=" + apiKey + "&language=ko-KR";;
        MovieDto movieDto = restTemplate.getForObject(url, MovieDto.class);

        return movieDto;
    }

    @Override
    public MovieDto getNowPlayingMovies() {
        final String url = API_URL + "/movie/now_playing?api_key=" + apiKey + "&language=ko-KR";;
        MovieDto movieDto = restTemplate.getForObject(url, MovieDto.class);

        return movieDto;
    }

    @Override
    public MovieDto getUpcomingMovies() {
        final String url = API_URL + "/movie/upcoming?api_key=" + apiKey;
        MovieDto movieDto = restTemplate.getForObject(url, MovieDto.class);

        return movieDto;
    }

    @Override
    public MovieDto getMovieDetail(int id) {
        final String url = API_URL + "/movie/" + id + "?api_key=" + apiKey;
        MovieDto movieDto = restTemplate.getForObject(url, MovieDto.class);

        return movieDto;
    }

    @Override
    public MovieDto searchMovies(String searchText) {
        final String url = API_URL + "/search/movie?api_key=" + apiKey + "&query=" + searchText + "&language=ko-KR";;
        MovieDto movieDto = restTemplate.getForObject(url, MovieDto.class);

        return movieDto;
    }
}

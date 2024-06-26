package com.moive.movie.service;

import com.moive.movie.model.MovieDetailDto;
import com.moive.movie.model.MovieDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Random;

@Service
public class MovieService implements IMovieService {

    private Random random = new Random();
    private int movie_id = random.nextInt((11986 - 2) + 1) + 2;
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
        final String url = API_URL + "/movie/now_playing?api_key=" + apiKey + "&language=ko-KR";
        MovieDto movieDto = restTemplate.getForObject(url, MovieDto.class);

        return movieDto;
    }

    @Override
    public MovieDto getUpcomingMovies() {
        final String url = API_URL + "/movie/upcoming?api_key=" + apiKey + "&language=ko-KR";;
        MovieDto movieDto = restTemplate.getForObject(url, MovieDto.class);

        return movieDto;
    }

    @Override
    public MovieDetailDto getMovieDetail(int id) {
        final String url = API_URL + "/movie/" + id + "?api_key=" + apiKey + "&language=ko-KR";
        MovieDetailDto movieDto = restTemplate.getForObject(url, MovieDetailDto.class);

        return movieDto;
    }

    @Override
    public MovieDto searchMovies(String searchText) {
        final String url = API_URL + "/search/movie?api_key=" + apiKey + "&query=" + searchText + "&language=ko-KR";;
        MovieDto movieDto = restTemplate.getForObject(url, MovieDto.class);

        return movieDto;
    }

    @Override
    public MovieDto getMovieRecommendation() {
        final String url = API_URL + "/movie/" + movie_id+ "/recommendations?api_key=" + apiKey + "&language=ko-KR&page=1";;
        MovieDto movieDto = restTemplate.getForObject(url, MovieDto.class);

        return movieDto;
    }
}

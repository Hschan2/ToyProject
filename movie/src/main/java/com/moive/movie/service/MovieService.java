package com.moive.movie.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.moive.movie.model.MovieApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.concurrent.CompletableFuture;

@Service
@PropertySource(value = "application-API-KEY.properties")
public class MovieService {
    //    API-KEY.properties의 API key 가져오기
    @Value("${tmdb-api-key}")
    private String tmdbApiKey;

    private final RestTemplate restTemplate;

    public MovieService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public MovieApiResponse getPopularMovies() {
        String url = "https://api.themoviedb.org/3/movie/popular?api_key=" + tmdbApiKey + "&language=ko-KR";
        return callApi(url, false);
    }

    public MovieApiResponse getHighRatedMovies() {
        String url = "https://api.themoviedb.org/3/movie/top_rated?api_key=" + tmdbApiKey + "&language=ko-KR";
        return callApi(url, false);
    }

    public MovieApiResponse getNowPlayingMovies() {
        String url = "https://api.themoviedb.org/3/movie/now_playing?api_key=" + tmdbApiKey + "&language=ko-KR";
        return callApi(url, false);
    }

    public MovieApiResponse getUpcomingMovies() {
        String url = "https://api.themoviedb.org/3/movie/upcoming?api_key=" + tmdbApiKey + "&language=ko-KR";
        return callApi(url, false);
    }

    public MovieApiResponse getMovieDetail(String id) {
        String url = "https://api.themoviedb.org/3/movie/" + id + "?api_key=" + tmdbApiKey + "&language=ko-KR";
        return callApi(url, true);
    }

    public MovieApiResponse searchMovies(String searchText) {
        String url = "https://api.themoviedb.org/3/search/movie?api_key=" + tmdbApiKey + "&query=" + searchText + "&language=ko-KR";
        return callApi(url, false);
    }

    private MovieApiResponse callApi(String url, boolean includeAllFields) {
        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("accept", "application/json")
                    .header("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNGUyNjllMWExYmUyNmYwZTg3OWMyNzY2MjkyNjdlMSIsInN1YiI6IjYzYmViNTFiZjg1OTU4MDA3ZDM3OTQ3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PiUXCgzcA8Dgh2CFEE-mRn3hFfsfs6tN4ESIzlgW2jI")
                    .method("GET", HttpRequest.BodyPublishers.noBody())
                    .build();

            HttpResponse<String> httpResponse = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

            String responseBody = httpResponse.body();

            ObjectMapper objectMapper = new ObjectMapper();
            MovieApiResponse response = objectMapper.readValue(responseBody, MovieApiResponse.class);

            if (!includeAllFields) {
                return new MovieApiResponse(response.getTitle(), response.getPosterPath());
            }

            return response;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}

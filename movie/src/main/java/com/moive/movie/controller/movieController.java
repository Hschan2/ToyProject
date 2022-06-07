package com.moive.movie.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.Date;

@RestController
public class movieController {

    @Value("${api-key}")
    private String API_KEY;

    @GetMapping("/api/popular")
    public String popular() throws IOException {
        String urlStr = "https://api.themoviedb.org/3/movie/popular?" +
                "api_key=" +
                API_KEY +
                "&language=ko-KR";

        System.out.println(apiParse(urlStr));

        return apiParse(urlStr);
    }

    @GetMapping("/api/highRated")
    public String highRated() throws IOException {
        String urlStr = "https://api.themoviedb.org/3/movie/top_rated?" +
                "api_key=" +
                API_KEY +
                "&language=ko-KR";

        System.out.println(apiParse(urlStr));

        return apiParse(urlStr);
    }

    @GetMapping("/api/detail/{id}")
    public String detail(@PathVariable("id") int id) throws IOException {
        String urlStr = "https://api.themoviedb.org/3/movie/" +
                id +
                "?api_key=" +
                API_KEY +
                "&language=ko-KR";

        return apiParse(urlStr);
    }

    public String apiParse(String apiUrl) throws IOException {
        StringBuilder result = new StringBuilder();

        String urlStr = apiUrl;

        URL url = new URL(urlStr);

        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
        urlConnection.setRequestMethod("GET");

        BufferedReader br;

        br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(), "UTF-8"));

        String returnLine;

        while((returnLine = br.readLine()) != null) {
            result.append(returnLine + "\n\r");
        }

        urlConnection.disconnect();

        return  result.toString();
    }
}

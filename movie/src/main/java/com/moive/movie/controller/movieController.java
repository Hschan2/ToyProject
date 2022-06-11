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

@RestController
public class movieController {

    @Value("${api-key}")
    private String API_KEY;

    @GetMapping("/api/popular")
    public String popular() throws IOException {
        String category = "popular";

        return apiParse(category);
    }

    @GetMapping("/api/highRated")
    public String highRated() throws IOException {
        String category = "top_rated";

        return apiParse(category);
    }

    @GetMapping("/api/upcoming")
    public String upcoming() throws IOException {
        String category = "upcoming";

        return apiParse(category);
    }

    @GetMapping("/api/detail/{id}")
    public String detail(@PathVariable("id") String id) throws IOException {
        String category = id;

        return apiParse(category);
    }

    public String apiParse(String Category) throws IOException {
        StringBuilder result = new StringBuilder();

        String urlStr = "https://api.themoviedb.org/3/movie/" + Category + "?api_key=" + API_KEY + "&language=ko-KR";

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

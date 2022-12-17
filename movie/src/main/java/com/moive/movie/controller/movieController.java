package com.moive.movie.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * 영화 목록 API 데이터 받는 Controller 설명
 *
 * @author Hong Seong Chan
 * 작성일 2022-09-25
 * */

@RestController
public class movieController {
    
//    API-KEY.properties의 API key 가져오기
    @Value("${api-key}")
    private String API_KEY;

//    인기 영화 목록 가져오기
    @GetMapping("/api/popular")
    public String popular() throws IOException {
//        인기 영화 카테고리 변수 선언
        String category = "popular";

//        인기 영화 카테고리 변수를 API를 파싱하는 함수에 전달
        return apiParse(category);
    }

//    평점순 영화 목록 가져오기
    @GetMapping("/api/highRated")
    public String highRated() throws IOException {
//        평점순 카테고리 변수 선언
        String category = "top_rated";

//        평점순 카테고리 변수를 API 파싱하는 함수에 전달
        return apiParse(category);
    }

//  현재개봉 영화 목록 가져오기
    @GetMapping("/api/now_playing")
    public String nowPlaying() throws IOException {
//        현재개봉 카테고리 변수 선언
        String category = "now_playing";

//        현재개봉 카테고리 변수를 API 파싱하는 함수에 전달
        return apiParse(category);
    }

//    개봉예정 영화 목록 가져오기
    @GetMapping("/api/upcoming")
    public String upcoming() throws IOException {
//        개봉예정 카테고리 변수 선언
        String category = "upcoming";

//        개봉예정 카테고리 변수를 API 파싱하는 함수에 전달
        return apiParse(category);
    }

//    영화 ID값을 받아 상세페이지 이동
    @GetMapping("/api/detail/{id}")
    public String detail(@PathVariable("id") String id) throws IOException {
//        Path로 받은 ID 값을 변수에 담기
        String movieId = id;
        
//        특정 영화 ID를 API 파싱하는 함수에 전달
        return apiParse(movieId);
    }

//  영화 검색 파싱
    @GetMapping("/api/search")
    public String search(@RequestParam String searchText) throws IOException {
//        Path로 받은 영화 검색 Text 값을 변수에 담기
        String searchTitle = searchText;
        System.out.println(searchText);

//        검색 Text 값을 검색 파싱 함수에 전달
        return searchParse(searchTitle);
    }

//    전달받은 파라미터로 API 데이터 호출하기
    public String apiParse(String Category) throws IOException {
        StringBuilder result = new StringBuilder();
        String urlStr = "https://api.themoviedb.org/3/movie/" + Category + "?api_key=" + API_KEY +"&language=ko-KR";
        URL url = null;
        HttpURLConnection urlConnection = null;
        try {
            url = new URL(urlStr);
            urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setRequestMethod("GET");
            BufferedReader br;
            br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(), "UTF-8"));
            String returnLine;
            while((returnLine = br.readLine()) != null) {
                result.append(returnLine + "\n\r");
            }
        } catch (Exception e) {
            System.out.println("에러 : " + e);
        } finally {
            urlConnection.disconnect();
        }

        return  result.toString();
    }

    public String searchParse(String searchText) throws IOException {
        StringBuilder result = new StringBuilder();
        String urlStr = "https://api.themoviedb.org/3/search/movie?api_key=" + API_KEY +"&query=" + searchText + "&language=ko-KR";
        URL url = null;
        HttpURLConnection urlConnection = null;
        try {
            url = new URL(urlStr);
            urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setRequestMethod("GET");
            BufferedReader br;
            br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(), "UTF-8"));
            String returnLine;
            while((returnLine = br.readLine()) != null) {
                result.append(returnLine + "\n\r");
            }
        } catch (Exception e) {
            System.out.println("에러 : " + e);
        } finally {
            urlConnection.disconnect();
        }

        return  result.toString();
    }
}

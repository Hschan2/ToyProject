package com.moive.movie.model;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class MovieResultDto {
    private Long id;
    private String overview;
    private LocalDate release_date;
    private String title;
    private float vote_average;

    private String popularity;
    private String poster_path;
    private int vote_count;
    private String original_language;
}

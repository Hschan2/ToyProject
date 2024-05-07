package com.moive.movie.model;

import lombok.Getter;

import java.util.List;

@Getter
public class MovieDto {
    private int page;
    private int total_pages;
    private int total_results;
    private List<MovieResultDto> results;
}

package com.moive.movie.model;

import com.moive.movie.model.detail.*;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
public class MovieDetailDto {
    private boolean adult;
    private String backdrop_path;
    private CollectionDto belongs_to_collection;
    private int budget;
    private List<GenreDto> genres;
    private String homepage;
    private Long id;
    private String imdb_id;
    private List<String> origin_country;
    private String original_language;
    private String original_title;
    private String overview;
    private double popularity;
    private String poster_path;
    private List<ProductionCompanyDto> production_companies;
    private List<ProductionCountryDto> production_countries;
    private LocalDate release_date;
    private int revenue;
    private int runtime;
    private List<LanguageDto> spoken_languages;
    private String status;
    private String tagline;
    private String title;
    private boolean video;
    private double vote_average;
    private int vote_count;
}

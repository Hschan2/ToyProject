export type WeatherResponse = {
    weather: {
        main: string;
        description: string;
    };
    main: {
        temp: number;
    };
    sys: {
        country: string;
    }
}

export type Article = {
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
  };
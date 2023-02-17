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
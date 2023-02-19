export interface locationType {
    latitude: number | null;
    longitude: number | null;
}

export interface WeatherData {
    name: string;
    description: string;
    temp: number;
}
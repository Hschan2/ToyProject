export interface locationType {
    latitude: number | null;
    longitude: number | null;
}

export interface WeatherData {
    name: string;
    description: string;
    icon: string;
    temp: number;
    humidity: number;
    wind: number;
}
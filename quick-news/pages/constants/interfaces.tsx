export interface locationType {
    latitude: number | null;
    longitude: number | null;
}

export interface WeatherData {
    name: string;
    description: string;
    temp: number;
}

export interface NewsItem {
    title: string;
    image: string;
    originallink: string;
    link: string;
    description: string;
    pubData: string;
}

export interface NewsData {
    news: NewsItem[];
}
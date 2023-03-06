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
    link: string;
    image: string;
    description: string;
    pubDate: number;
}

export interface NewsData {
    items: NewsItem[];
}

export interface NewsApiItems {
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
}

export interface NewsApiData {
    articles: NewsApiItems[];
}
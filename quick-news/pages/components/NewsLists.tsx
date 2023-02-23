import axios from "axios";
import { useEffect, useState } from "react";
import { NewsData, NewsItem } from '../constants/interfaces';

export default function NewsLists() {
    const [news, setNews] = useState<NewsItem[]>([]);

    useEffect(() => {
        async function fetchNews() {
            try {
                const response = await axios.get('/api/naver-news-proxy?q=애완동물');
                const items = response.data.items;
                setNews(items);
            } catch (error) {
                console.error(error);
            }
        }

        fetchNews();
    }, []);

    console.log(news);

    return (
        <div>
            {news && news.map((item, i) => (
                <div key={i}>
                    <h2>{item.title}</h2>
                    <img src={item.image} alt={item.title} />
                    <p>{item.description}</p>
                </div>
            ))}
        </div>
    )
}

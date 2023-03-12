import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function OpenAINews() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('/api/openai-news-proxy');
                const data = response.data.data.slice(0, 10);
                setNews(data);
            } catch (e) {
                console.error(e);
            }
        };

        fetchNews();
    }, []);

    console.log(news);
    
    return (
        <div>
            <h1>사회 뉴스 10개</h1>
        </div>
    )
}
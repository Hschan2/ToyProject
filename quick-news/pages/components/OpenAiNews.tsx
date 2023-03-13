import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { OpenAiNews } from '../constants/interfaces';

export default function OpenAINews() {
    const [articles, setArticles] = useState<OpenAiNews[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/openai-news-proxy');
                const data = response.data;
                const articles = data.map((article: any) => {
                    return {
                        title: article.title,
                        author: article.author,
                        content: article.content,
                        link: article.link,
                    };
                });
                
                setArticles(articles);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [])

    console.log(articles);
    
    return (
        <div>
            <h1>사회 뉴스 10개</h1>
        </div>
    )
}
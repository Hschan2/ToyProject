import axios from "axios";
import moment from "moment";
import 'moment/locale/ko';
import { useEffect, useState } from "react";
import { NewsApiData, NewsApiItems } from "../constants/interfaces";

export default function NewsApiList() {
    const [articles, setArticles] = useState<NewsApiItems[]>([]);

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();

        async function fetchNews() {
            try {
                const response = await axios.get<NewsApiData>(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`, {cancelToken:cancelToken.token});
                setArticles(response.data.articles);
            } catch (error) {
                console.error(error);
                if (axios.isCancel(error)) {
                    console.log("요청 취소");
                }
            }
        }

        fetchNews();

        return () => {
            cancelToken.cancel();
        }
    }, []);

    console.log(articles);

    return (
        <div className="container">
            {articles.map((article, i) => (
                <div key={i} className='news-card'>
                    <h3><a href={article.url} rel="noreferrer" target="_blank">{(article.title).split(' - ')[0]}</a></h3>
                    <p className="author">{moment(article.publishedAt).format('YYYY-MM-DD HH:mm')} {article.author}</p>
                </div>
            ))}
            <style jsx>{`
                .news-card {
                    margin: 5px 0;
                    background-color: #fff;
                    padding: 0 10px;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                    border-radius: 20px;
                }
                .author {
                    font-size: 12px;
                    color: rgba(0, 0, 0, 0.6);
                }
            `}</style>
        </div>
    )
}
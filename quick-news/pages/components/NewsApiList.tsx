import { Author, NewsCard } from "../constants/styledComponents";
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

    return (
        <div>
            {articles.map((article, i) => (
                <NewsCard key={i}>
                    <h3><a href={article.url} rel="noreferrer" target="_blank">{(article.title).split(' - ')[0]}</a></h3>
                    <Author>{moment(article.publishedAt).format('YYYY-MM-DD HH:mm')} {article.author}</Author>
                </NewsCard>
            ))}
        </div>
    )
}
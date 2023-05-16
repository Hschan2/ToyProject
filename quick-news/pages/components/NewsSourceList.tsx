import { Author, NewsCard } from "../constants/styledComponents";
import axios from "axios";
import moment from "moment";
import 'moment/locale/ko';
import { useEffect, useState } from "react";
import { NewsApiData, NewsApiItems, NewsSourceListProps } from "../constants/interfaces";
import Link from "next/link";

export default function NewsSourceList(props: NewsSourceListProps) {
    const [articles, setArticles] = useState<NewsApiItems[]>([]);
    const { category } = props;
    const fromToday = new Date().toISOString().split("T")[0];

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();

        async function fetchNews() {
            try {
                let url = `https://newsapi.org/v2/top-headlines?country=kr&from=${fromToday}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`;
                if (category) {
                    url += `&category=${category}`;
                }

                const response = await axios.get<NewsApiData>(url, {cancelToken:cancelToken.token});
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
    }, [category]);

    return (
        <div>
            {articles.map((article, i) => (
                <Link href={article.url} target="_blank" key={i}>
                    <NewsCard>
                        <h3>{(article.title).split(' - ')[0]}</h3>
                        <Author>{moment(article.publishedAt).format('YYYY-MM-DD HH:mm')} {article.author}</Author>
                        <p>{article.description}</p>
                    </NewsCard>
                </Link>
            ))}
        </div>
    )
}
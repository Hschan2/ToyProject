import { Author, DateOfNews, NewsCard } from "../../constants/styledComponents";
import axios from "axios";
import moment from "moment";
import 'moment/locale/ko';
import { Suspense, useEffect, useState } from "react";
import { NewsApiData, NewsApiItems, NewsSourceListProps } from "../../constants/interfaces";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { pageSizeAtom } from "../../constants/pageSizeAtom";
import Loading from "../page/loading";

export default function NewsSourceList(props: NewsSourceListProps) {
    const [articles, setArticles] = useState<NewsApiItems[]>([]);
    const { category } = props;
    const fromToday = new Date().toISOString().split("T")[0];
    const pageSize = useRecoilValue(pageSizeAtom);

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();

        async function fetchNews() {
            try {
                let url = `https://newsapi.org/v2/top-headlines?country=kr&from=${fromToday}&pageSize=${pageSize}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`;
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
    }, [category, pageSize]);

    return (
        <Suspense fallback={<Loading />}>
            <div>
                {articles.map((article, i) => (
                    <Link href={article.url} target="_blank" key={i}>
                        <NewsCard>
                            <h3>{(article.title).split(' - ')[0]}</h3>
                            <DateOfNews>{moment(article.publishedAt).format('YYYY-MM-DD HH:mm')}</DateOfNews>
                            <Author>{article.author}</Author>
                            <p>{article.description}</p>
                        </NewsCard>
                    </Link>
                ))}
            </div>
        </Suspense>
    )
}
import { DateTime, NewsCard } from "../constants/styledComponents";
import axios from "axios";
import moment from "moment";
import 'moment/locale/ko';
import { useEffect, useState } from "react";
import { NewsData, NewsItem } from '../constants/interfaces';

export default function NewsLists() {
    const [news, setNews] = useState<NewsItem[]>([]);

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();

        async function fetchNews() {
            try {
                const {data} = await axios.get<NewsData>('/api/naver-news-proxy?q=반려동물', {cancelToken:cancelToken.token});
                setNews(data.items);
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
            {news.map((item, i) => (
                <NewsCard key={i}>
                    <h3 dangerouslySetInnerHTML={{ __html: item.title }} />
                    <DateTime>{moment(item.pubDate).format('YYYY-MM-DD HH:mm')}</DateTime>
                    <p dangerouslySetInnerHTML={{__html: item.description}} />
                </NewsCard>
            ))}
        </div>
    )
}

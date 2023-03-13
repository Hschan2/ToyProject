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
        <div className="container">
            {news.map((item, i) => (
                <div key={i} className='news-card'>
                    <h3 dangerouslySetInnerHTML={{ __html: item.title }} />
                    <p className="dateTime">{moment(item.pubDate).format('YYYY-MM-DD HH:mm')}</p>
                    <p dangerouslySetInnerHTML={{__html: item.description}} />
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
                .dateTime {
                    font-size: 12px;
                    color: rgba(0, 0, 0, 0.6);
                }
            `}</style>
        </div>
    )
}

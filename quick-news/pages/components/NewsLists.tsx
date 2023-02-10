import { getNewsListResult } from "../api/getNewsList";

export default function NewsLists({ data }: { data?: getNewsListResult }) {
    return (
        <>
            {data?.items.map((news, i) => {
                { news.title }
            })}
        </>
    )
}
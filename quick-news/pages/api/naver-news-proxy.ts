import {NextApiRequest, NextApiResponse} from 'next';
import axios from "axios";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {query} = req;
    const apiResponse = await axios.get(
        `https://openapi.naver.com/v1/search/news.json`,
        {
            headers: {
                'X-Naver-Client-Id': process.env.NEXT_PUBLIC_CLIENT_ID,
                'X-Naver-Client-Secret': process.env.NEXT_PUBLIC_CLIENT_SECRET,
            },
            params: {
                query: query.q,
                display: 10,
                start: 1,
                sort: 'sim',
            },
        }
    );
    res.status(200).json(apiResponse.data);
}
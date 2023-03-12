import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { data } = await axios.get('https://api.openai.com/v1/search', {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPEN_AI_KEY}`,
        },
        params: {
            query: '한국 사회 뉴스',
            model: 'davinci',
            documents: 10,
        },
    });

    const result = data.data.map((item: any) => {
        const { document } = item;
        return {
            title: document.title,
            author: document.authors[0],
            content: document.text,
        };
    });

    res.status(200).json(result);
}
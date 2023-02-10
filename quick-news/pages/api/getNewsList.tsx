import axios from 'axios'

const CLIENT_ID = process.env.ClientID;
const CLIENT_SECRET = process.env.ClientSecret;
const BASE_PATH = "/v1/search/news.json?";

interface News {
    title: string;
    originallink: string;
    link: string;
    description: string;
    pubData: string;
}

export interface getNewsListResult {
    items: News[];
}

export async function NewsList() {
    return axios.get(`${BASE_PATH}`, {
        params: {
            query: "사회",
            sort: "sim",
            display: 10,
        },
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "X-Naver-Client-Id": CLIENT_ID,
            "X-Naver-Client-Secret": CLIENT_SECRET,
        },
    })
        .then(res => res.data)
        .catch(err => {
            console.log(`에러발생: ${err.status}`);
            if (err.status === 403) {
                console.log(`404 에러 페이지로 이동`);
            }
        })
}
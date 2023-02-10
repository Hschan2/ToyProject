import Head from "next/head";

export default function Seo({title}: {title: string}) {
    return (
        <Head>
            <title>퀵 뉴스 | {title}</title>
        </Head>
    );
}
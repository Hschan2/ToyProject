import { Helmet, HelmetProvider } from 'react-helmet-async';

type SEO_Props = {
    title: string | null;
}

/**
 * 
 * @Title 페이지 제목 값 파라미터
 * @returns 넘어온 페이지 제목 값 파라미터로 페이지 제목 출력
 */
function Seo({ title }: SEO_Props) {
    return (
        <HelmetProvider>
            <Helmet>
                <title>{title === "Home" ? "Find Your Movie" : `${title} | Movie`}</title>
            </Helmet>
        </HelmetProvider>
    )
}

export default Seo
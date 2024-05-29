import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

/**
 * 
 * @Title 페이지 제목 값 파라미터
 * @returns 넘어온 페이지 제목 값 파라미터로 페이지 제목 출력
 */
function Seo({ title }) {
    return (
        <HelmetProvider>
            <Helmet>
                <title>{title === "Home" ? "Find Your Movie" : `${title} | Movie`}</title>
            </Helmet>
        </HelmetProvider>
    )
}

export default Seo
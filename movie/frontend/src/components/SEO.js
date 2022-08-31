import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

/**
 * 
 * @Title 페이지 제목 값 파라미터
 * @returns 넘어온 페이지 제목 값 파라미터로 페이지 제목 출력
 */
function Seo({ title }) {

    return (
        <div>
            <HelmetProvider>
                <Helmet>
                    <title>{title} | Movie</title>
                </Helmet>
            </HelmetProvider>
        </div>
    )
}

export default Seo
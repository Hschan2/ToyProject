import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

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
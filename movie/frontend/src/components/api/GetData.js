import React, { useEffect, useState } from 'react'
import GetMovieList from './GetMovieList';

function GetData() {
    const [popularData, setPopularData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const getPopularLists = await GetMovieList('http://localhost:8080/api/movies/popular');
            setPopularData(getPopularLists);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return "Getting Data...";
    }

    if (error) {
        return `Error: ${error.message}`;
    }

    return popularData;
}

export default GetData
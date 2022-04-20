import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Popular() {
  const [popularData, setPopularData] = useState();

  useEffect(() => {
    axios.get('/api/popular')
      .then(response => setPopularData(response.data.results))
      .catch(error => console.log(`Error: ${error}`))
  }, []);

  const arr = popularData?.map((movie, key) => {
    return <div key={key}>{movie.id}</div>
  })

  return (
    <div className="App">
      <header className="App-header">
        {arr}
      </header>
    </div>
  );
}

export default Popular;
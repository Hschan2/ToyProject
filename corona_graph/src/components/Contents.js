import React from 'react'
import { GridLoader } from 'react-spinners'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Graph from './Graph'
import Select from './Select'
import RefreshButton from './RefreshButton'
import { GraphData } from './GraphData'

const Contents = () => {
    const [confirmedData, setConfirmedData] = useState({})
    const [quarantinedData, setQuarantinedData] = useState({})
    const [comparedData, setComparedData] = useState({})
    const [country, setCountry] = useState("kr");
    const [contentLoading, setContentLoading] = useState(true);

    useEffect(() => {
        console.log(country);

        const fetchEvents = async () => {
            const res = await axios.get(`https://api.covid19api.com/total/dayone/country/${country}`)
            GraphData(res.data, setConfirmedData, setQuarantinedData, setComparedData);
        }

        setContentLoading(false);
        fetchEvents();
    }, [])

    return (
        <section>
            <div className="Menu">
                <h2>국내 코로나 현황</h2>
                <Select setCountry={setCountry}></Select>
                <RefreshButton></RefreshButton>
            </div>

            {contentLoading
            ? <div className="Loading"><GridLoader size={20} color='#3b5998' loading /></div>
            : <Graph confirmedData={confirmedData} quarantinedData={quarantinedData} comparedData={comparedData}  />
            }
        </section>
    )
}

export default Contents
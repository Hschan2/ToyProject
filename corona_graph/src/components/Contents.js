import React from 'react'
import { GridLoader } from 'react-spinners'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Graph from './Graph'
import Select from './Select'
import { Totals } from './Totals'
import RefreshButton from './RefreshButton'
import { GraphData } from './GraphData'

const Contents = () => {
    const [confirmedData, setConfirmedData] = useState({})
    const [quarantinedData, setQuarantinedData] = useState({})
    const [comparedData, setComparedData] = useState({})
    const [country, setCountry] = useState({
        country: window.sessionStorage.getItem('country') || "kr",
        title: window.sessionStorage.getItem('title') || "국내"
    });
    const [totalCorona, setTotalCorona] = useState({
        totalConfirmed: 0,
        totalDeaths: 0,
        totalRecovered: 0
    })
    const [contentLoading, setContentLoading] = useState(true);

    useEffect(() => {

        const fetchEvents = async () => {
            try {
                const res = await axios.get(`https://api.covid19api.com/total/dayone/country/${country.country}`)
                GraphData(res?.data, setConfirmedData, setQuarantinedData, setComparedData);
            } catch (err) {
                console.log(err);
            }
        }

        const fetchTotalEvents = async () => {
            try {
                const res = await axios.get(`https://api.covid19api.com/world/total`)
                Totals(res?.data, setTotalCorona);
            } catch (err) {
                console.log(err);
            }
        }

        setContentLoading(false);
        fetchEvents();
        fetchTotalEvents();

        window.sessionStorage.setItem("title", country.title);
    }, [country])

    return (
        <section>
            <div className="Menu">
                <h2>{country.title} 코로나 현황</h2>
                <Select country={country.country} setCountry={setCountry}></Select>
                <RefreshButton></RefreshButton>
                <div className="totalCorona">
                    세계 총 감염자: {totalCorona.totalConfirmed}명 &nbsp;|&nbsp; 세계 총 사망자: {totalCorona.totalDeaths}명 &nbsp;|&nbsp; 세계 완전 회복: {totalCorona.totalRecovered}명(데이터 없음)
                </div>
            </div>

            {contentLoading && contentLoading ?
                (<div className="Loading"><GridLoader size={20} color='#3b5998' loading /></div>)
            :
                (confirmedData ? <Graph confirmedData={confirmedData} quarantinedData={quarantinedData} comparedData={comparedData}/> : <Graph confirmedData={0} quarantinedData={0} comparedData={0} />)
            }
        </section>
    )
}

export default Contents
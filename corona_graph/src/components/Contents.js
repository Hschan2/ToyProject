import React from 'react'
import { GridLoader } from 'react-spinners'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Graph from './Graph'
import Select from './Select'
import RefreshButton from './RefreshButton'

const Contents = () => {
    const [confirmedData, setConfirmedData] = useState({})
    const [quarantinedData, setQuarantinedData] = useState({})
    const [comparedData, setComparedData] = useState({})
    const [country, setCountry] = useState("kr");
    const [contentLoading, setContentLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            const res = await axios.get(`https://api.covid19api.com/total/dayone/country/${country}`)
            makeData(res.data);
        }

        const makeData = (items) => {
            const arr = items.reduce((acc, cur) => {
                const currentDate = new Date(cur.Date);
                const year = currentDate.getFullYear();
                const month = currentDate.getMonth();
                const date = currentDate.getDate();

                const confirmed = cur.Confirmed;
                const active = cur.Active;
                const death = cur.Deaths;
                const recovered = cur.Recovered;

                const findItem = acc.find(a => a.year === year && a.month === month);

                if (!findItem) {
                    acc.push({ year, month, date, confirmed, active, death, recovered })
                }

                if (findItem && findItem.date < date) {
                    findItem.active = active;
                    findItem.death = death;
                    findItem.date = date;
                    findItem.year = year;
                    findItem.month = month;
                    findItem.recovered = recovered;
                    findItem.confirmed = confirmed;
                }

                return acc;
            }, [])

            const labels = arr.map(a => `${a.month + 1}월`);

            setConfirmedData({
                labels,
                datasets: [
                    {
                        label: "국내 누적 확진자",
                        backgroundColor: "salmon",
                        fill: true,
                        data: arr.map(a => a.confirmed)
                    },
                ]
            });

            setQuarantinedData({
                labels,
                datasets: [
                    {
                        label: "월별 격리자 현황",
                        backgroundColor: "orange",
                        fill: false,
                        data: arr.map(a => a.active)
                    },
                ]
            });

            const last = arr[arr.length - 1];

            setComparedData({
                labels: ["확진자", "격리 해제", "사망"],
                datasets: [
                    {
                        label: "누적 확진, 해제, 사망 비율",
                        backgroundColor: ["#ff3d67", "#059bff", "#ffc233"],
                        borderColor: ["#ff3d67", "#059bff", "#ffc233"],
                        fill: false,
                        // API에서 recovered가 0으로 기록되어 있기 때문에 화면에도 0으로 출력
                        data: [last.confirmed, last.recovered, last.death]
                    },
                ]
            });
        }

        setContentLoading(false);
        fetchEvents();
    }, [country])

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

export default React.memo(Contents)
import React from 'react'
import { Bar, Doughnut, Line } from 'react-chartjs-2';

const Graph = ({ confirmedData, quarantinedData, comparedData }) => {

    return (
        <div className="contents">
            <div>
                <Bar data={confirmedData} options={
                    { title: { display: true, text: "누적 확진자 추이", fontSize: 16 } },
                    { legend: { display: true, position: "bottom" } }
                } />
            </div>
            <div>
                <Line data={quarantinedData} options={
                    { title: { display: true, text: "월별 격리자 현황", fontSize: 16 } },
                    { legend: { display: true, position: "bottom" } }
                } />
            </div>
            <div>
                <Doughnut data={comparedData} options={
                    { title: { display: true, text: `누적 확진, 해제, 사망 (${new Date().getMonth() + 1}월)`, fontSize: 16 } },
                    { legend: { display: true, position: "bottom" } }
                } />
            </div>
        </div>
    )
}

export default Graph

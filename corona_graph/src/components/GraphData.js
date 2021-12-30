export const GraphData = (items, setConfirmedData, setQuarantinedData, setComparedData) => {
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
        labels: ["확진자", "격리 해제(일시 제외)", "사망"],
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
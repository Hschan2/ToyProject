export const Totals = (totalData, setTotalCorona) => {
    const confirmed = totalData.TotalConfirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const deaths = totalData.TotalDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const recovered = totalData.TotalRecovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    setTotalCorona({
        totalConfirmed: confirmed,
        totalDeaths: deaths,
        totalRecovered: recovered
    });
}
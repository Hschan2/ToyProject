const currentTime = () => {
    const currentTime = new Date();
    const options = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    };
    const formatter = new Intl.DateTimeFormat('ko-KR', options);
    const formattedTime = formatter.format(currentTime);

    return formattedTime;
}

export default currentTime
const currentTime = () => {
    const currentTime = new Date();
    const year = String(currentTime.getFullYear()).slice(-2);
    const month = String(currentTime.getMonth() + 1).padStart(2, '0');
    const day = String(currentTime.getDate()).padStart(2, '0');
    const hours = String(currentTime.getHours()).padStart(2, '0');
    const minutes = String(currentTime.getMinutes()).padStart(2, '0');
    const formattedTime = `${year}.${month}.${day} ${hours}:${minutes}`;

    return formattedTime;
}

export default currentTime
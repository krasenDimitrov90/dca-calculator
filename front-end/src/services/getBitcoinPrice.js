export async function getBitcoinPrices(startDate, endDate) {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const url = BASE_URL + `/bitcoin-history?start=${startDate}&end=${endDate}`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        })
}
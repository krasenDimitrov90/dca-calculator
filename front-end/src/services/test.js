export async function fetchBTCPrices(start_date, end_date) {
    const url = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start_date}&end=${end_date}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.bpi;
    } catch (error) {
        console.error("Error fetching Bitcoin prices:", error);
        return null;
    }
}
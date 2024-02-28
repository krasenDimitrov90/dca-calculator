const BASE_URL = 'http://localhost:8080';

export const getBTCHistory = async (start, end, reapeatPurchase) => {
    const endPoint = `/bitcoin-history?start=${start}&end=${end}&repetition-period=${reapeatPurchase}`;

    const response = await fetch(BASE_URL + endPoint);
    const data = await response.json();
    
    if (!response.ok) {
        throw new Error('Failed to fetch BTC history prices');
    }
     
    return data;
};
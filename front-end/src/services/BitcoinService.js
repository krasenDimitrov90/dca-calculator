import store from "../store";
import { appLoadingActions } from "../store/loading";

const BASE_URL = 'http://192.168.100.6:8080';
// const BASE_URL = 'http://localhost:8080';
// const BASE_URL = 'https://us-central1-dca-calculator-7d77e.cloudfunctions.net/api/';


// Interseptor
const MyFetch = async (...args) => {
    let [resource, config] = args;
    store.dispatch(appLoadingActions.setAppIsLoading(true))
    try {
        const response = await fetch(resource, config);
        const result = await response.json();
        console.log({ result })
        if (!response.ok) {
            throw new Error('Response not so OK!')
        }
        return result;
    } catch (e) {
        return Promise.reject(e)
    } finally {
        store.dispatch(appLoadingActions.setAppIsLoading(false))
    }

};

class Request {
    static get(url) {
        if (url?.startsWith('http')) {
            return MyFetch(url)
        }
        return MyFetch(`${BASE_URL}${url}`)
    }
}

class BitcoinService {
    static async getHistory(start, end, reapeatPurchase) {
        return await Request.get(`/bitcoin-history?start=${start}&end=${end}&repetition-period=${reapeatPurchase}`);
    }

    static async getBTCPrice(currency) {
        return Request.get(`https://api.binance.com/api/v3/ticker/price?symbol=BTC${currency}`)
    }
}

export { BitcoinService }
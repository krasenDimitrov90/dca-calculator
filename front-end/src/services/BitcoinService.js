import store from "../store";
import { appLoadingActions } from "../store/loading";

// const BASE_URL = 'https://us-central1-dca-calculator-7d77e.cloudfunctions.net/app';
const BASE_URL = 'http://192.168.100.6:8080';
// const BASE_URL = 'http://localhost:8080';
// const BASE_URL = 'https://us-central1-dca-calculator-7d77e.cloudfunctions.net/api/';


// Interseptor
const MyFetch = async (...args) => {
    let [resource, config, preventLoadingStop] = args;
    store.dispatch(appLoadingActions.setAppIsLoading(true));
    try {
        const response = await fetch(resource, config);
        const result = await response.json();
        if (!response.ok) {
            throw new Error('Response not so OK!');
        }
        return result;
    } catch (e) {
        return Promise.reject(e);
    } finally {
        if (!preventLoadingStop) {
            store.dispatch(appLoadingActions.setAppIsLoading(false));
        }
    }

};

class Request {
    static get(url, preventLoadingStop) {
        if (url?.startsWith('http')) {
            return MyFetch(url);
        }
        return MyFetch(`${BASE_URL}${url}`, {}, preventLoadingStop);
    }
}

class BitcoinService {
    static async getHistory(start, end, reapeatPurchase, preventLoadingStop = false) {
        return await Request.get(`/bitcoin-history?start=${start}&end=${end}&repetition-period=${reapeatPurchase}`, preventLoadingStop);
    }

    static async getBTCPrice(currency, preventLoadingStop = false) {
        return Request.get(`https://api.binance.com/api/v3/ticker/price?symbol=BTC${currency}`, preventLoadingStop);
    }
}

export { BitcoinService }
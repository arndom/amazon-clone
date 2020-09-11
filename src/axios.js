// axios; nice fetching library allows interact with api
import axios from  'axios';

const instance = axios.create({
    baseURL: 'https://us-central1-clone-b48b7.cloudfunctions.net/api',
    withCredentials: false,
    headers:{
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, PUT, POST,DELETE, PATCH,OPTIONS',
    }
    // 'http://localhost:5001/clone-b48b7/us-central1/api' // The API (cloud function) URL
})

export default instance;

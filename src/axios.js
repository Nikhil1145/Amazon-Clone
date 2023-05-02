import axios from "axios";
const instance = axios.create({
    baseURL: 'http://127.0.0.1:5001/challenge-6a092/us-central1/api'  //the API(Cloud function) URL
})
export default instance
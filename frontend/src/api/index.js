import axios from 'axios';
import {hostname, port} from "./config";


class API {
    constructor() {
        this.axios = axios.create({
            baseURL: `http://${hostname}:${port}`,
            timeout: 2000
        });
    }

    setToken(value) {
        this.token = value;
    }

    async getJobs() {
        return this.axios.get('/jobs', {
            headers: {
                'Authorization': this.token
            },
        }).then((res) => {
            return res;
        }).catch(console.log);
    }

    async postJob(designName, repoURL) {
        return this.axios.post('/jobs', {
            job: {
                designName: designName,
                repoURL: repoURL,
            }
        }, {
            headers: {
                'Authorization': this.token
            }
        },).then((res) => {
            return res;
        }).catch(console.log);
    }

}

const api = new API();
export default api;
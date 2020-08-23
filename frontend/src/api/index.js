import axios from 'axios';
import {hostname, port} from "./config";


class API {
    constructor() {
        this.axios = axios.create({
            baseURL: `http://${hostname}:${port}`,
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

    async getJob(jobId) {
        return this.axios.get('/jobs', {
            params: {
                jobId: jobId
            },
            headers: {
                'Authorization': this.token
            },
        }).then((res) => {
            return res;
        }).catch(console.log);
    }

    async postJob(designName, repoURL, type, regressionScript) {
        return this.axios.post('/jobs', {
            job: {
                designName: designName,
                repoURL: repoURL,
                type: type,
                regressionScript: {
                    ...regressionScript
                }
            }
        }, {
            headers: {
                'Authorization': this.token
            }
        },).then((res) => {
            return res;
        }).catch(console.log);
    }

    async quitJob(jobId) {
        return this.axios.post('/jobs/quit', {
            job: {
                jobId: jobId
            }
        }, {
            headers: {
                'Authorization': this.token
            }
        },).then((res) => {
            return res;
        }).catch(console.log);
    }

    async deleteJob(jobId) {
        return this.axios.post('/jobs/delete', {
            job: {
                jobId: jobId
            }
        }, {
            headers: {
                'Authorization': this.token
            }
        },).then((res) => {
            return res;
        }).catch(console.log);
    }

    async downloadJobResult(jobId) {
        return this.axios.get('/download', {
            headers: {
                'Authorization': this.token
            },
            params: {
                jobId: jobId
            },
            responseType: 'blob', // important
        }).then((response) => {
            console.log(response);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'result.zip'); //or any other extension
            document.body.appendChild(link);
            link.click();
        }).catch(console.log);
    }

}

const api = new API();
export default api;
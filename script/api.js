export default class api {
    constructor() {

    }

    getData(url) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: url
            })
            .then((ref) => {
                resolve(ref)	
            })
            .catch((err) => {	
                reject(err)		
            })
        })
    }

    payTheBill(url, data) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: url,
                data: data
            })
            .then((ref) => {
                resolve(ref)	
            })
            .catch((err) => {	
                reject(err)		
            })
        })
    }
}
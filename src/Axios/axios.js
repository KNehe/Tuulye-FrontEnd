import axios from 'axios';

const baseOnlineUrl = 'https://tuulye.herokuapp.com/';
const baseLocalUrl = 'http://127.0.0.1:3000/api/v1/';

const instance = axios.create({
    baseURL: baseLocalUrl
});

instance.defaults.headers['authorization'] = 'Bearer ' + localStorage.getItem('token');

instance.interceptors.request.use( request=>{
    console.log("REQUEST",request.headers.authorization);
    return request;
},
error=>{
    // console.log("error",error);
    return Promise.reject(error);
});

instance.interceptors.response.use( response=>{
    // console.log("RESPONSE ..",response);
    return response;
},
error=>{
    // console.log("error config",error);

    if(error.message === 'Network Error'){
     alert('No connection to server !!!');
    }
    
    return Promise.reject(error);
});

export default instance;


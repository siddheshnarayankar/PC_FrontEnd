import {
    authHeader,history
} from '../_helpers';
import config from "../config";
import axios from 'axios';
export const professionalService = {
    getAllMaster,
    getCity,
    getDistrict,
    getDharm,
    getKayda,
    getKalam,
    getCrimeType,
    getCrimeTitle,
    getStatus,
    createCriminal,
    getCriminalsById,
    updateCriminals,
    getCriminalsTableInfoById,
    uploadImage,
    createNews,
    getNews,
    updateNews,
    getGPSInformation,
    getReport3,
    getReport1
}
  // const baseUrl = 'http://localhost:8080/api';
  const baseUrl = 'https://www.criminalmis.in/api';

function getAllMaster() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${baseUrl}/professional/getmaster`, requestOptions).then(handleResponse);
}

// GET CITY
function getCity() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${baseUrl}/professional/city`, requestOptions).then(handleResponse);
}

function getDistrict(cityId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${baseUrl}/professional/districts/${cityId}`, requestOptions).then(handleResponse);
}

function getDharm() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${baseUrl}/professional/dharm`, requestOptions).then(handleResponse);
}

function getKayda() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${baseUrl}/professional/kayda`, requestOptions).then(handleResponse);
}

function getKalam(actId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${baseUrl}/professional/kalam/${actId}`, requestOptions).then(handleResponse);
}

function getCrimeType() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${baseUrl}/professional/crimetypes`, requestOptions).then(handleResponse);
}

function getCrimeTitle() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${baseUrl}/professional/crimetitles`, requestOptions).then(handleResponse);
}

function getStatus() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }
    return fetch(`${baseUrl}/professional/status`, requestOptions).then(handleResponse);
}

function createCriminal(data) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    return fetch(`${baseUrl}/criminal/create`, requestOptions).then(handleResponse);
}

function createNews(data) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    return fetch(`${baseUrl}/criminal/createnews`, requestOptions).then(handleResponse);
}
function getNews(itemType) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }
    return fetch(`${baseUrl}/criminal/getNews/${itemType}`, requestOptions).then(handleResponse);
}
function getGPSInformation(cityId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    }
    return fetch(`${baseUrl}/criminal/getGPSInformation/${cityId}`, requestOptions);
}




function updateNews(id, data) {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    return fetch(`${baseUrl}/criminal/updateNews/${id}`, requestOptions).then(handleResponse);
}

function getCriminalsById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${baseUrl}/criminal/getcriminalbyid/${id}`, requestOptions).then(handleResponse);
}

function getCriminalsTableInfoById(falg,id,control) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }
    if(falg === 'cityId'){
        return fetch(`${baseUrl}/criminal/getCriminalsTableInfoByCityId/${id}`,{signal:control}, requestOptions).then(handleResponse);
    }else{
        return fetch(`${baseUrl}/criminal/getCriminalsTableInfoById/${id}`, requestOptions).then(handleResponse);
    }
}

function updateCriminals(id, data) {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    return fetch(`${baseUrl}/criminal/update/${id}`, requestOptions).then(handleResponse);
}

function getReport3(data) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...authHeader()
        } ,
        body: JSON.stringify(data)
    }
    return fetch(`${baseUrl}/criminal/getReports3`, requestOptions);
}
function getReport1(data) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...authHeader()
        } ,
        body: JSON.stringify(data)
    }
    return fetch(`${baseUrl}/criminal/getReports1`, requestOptions);
}


function uploadImage(data) {
    const formData = new FormData();
    data && data.map((res) =>{
        formData.append('profile_pic', res.originFileOb);
    });
    
    const requestOptions = {
        headers: {
            "content-type": "multipart/form-data" ,
            ...authHeader()
        }
    }

    // return fetch(`${baseUrl}/criminal/uploadImages`, requestOptions).then(handleResponse);
  return  axios.post(`${baseUrl}/criminal/uploadImages`, formData, requestOptions)
  .then(res => {
  })
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
     history.push('login');
}

function handleResponse(response) {
    if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        // location.reload(true);
    }

    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });

}



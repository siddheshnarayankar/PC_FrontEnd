import {
    professionalConstants
} from '../_constants';
import {
    professionalService
} from '../_services';
import {
    alertActions
} from './';
import {
    history
} from '../_helpers';

export const professionalAction = {
    getAllMaster,
    getCity,
    getDistrict,
    getDharm,
    getKayda,
    getKalam,
    getStatus,
    getCrimeTitle,
    getCrimeType,
    createCriminal,
    getCriminalsById,
    updateCriminals,
    getCriminalsTableInfoById,
    getCriminalsViewsById,
    uploadImage,
    createNews,
    getNews,
    updateNews,
    getGPSInformation,
    getGPSInformationSuccess,
    getReport3,
    getReport1,
    getReport4,
    getActiveAndNonActiveGpsInforByMasterId
}





function getAllMaster() {
    return dispatch => {
        professionalService.getAllMaster()
            .then((professionals) => {
                    dispatch(success(professionals));
                },
                error => {
                    dispatch(failure(error));
                })
    };

    function success(professionals) {
        return {
            type: professionalConstants.GET_MASTER_SUCCESS,
            professionals
        }
    }

    function failure(error) {
        return {
            type: professionalConstants.GET_MASTER_FAILURE,
            error
        }
    }

}

function getCity() {
    return dispatch => {
        professionalService.getCity()
            .then((response) => {
                dispatch(success(response));
            }, error => {
                dispatch(failure(error));
            })
    }

    function success(cities) {
        return {
            type: professionalConstants.GET_CITY_SUCCESS,
            cities
        }
    }

    function failure(error) {
        return {
            type: professionalConstants.GET_CITY_FAILURE,
            error
        }
    }
}

function getDistrict(cityId, form) {
    return dispatch => {
        professionalService.getDistrict(cityId)
            .then((response) => {
                if (form === 1) {
                    dispatch(success_BasicForm(response));
                } else if (form === 2) {
                    dispatch(success_GunhaFrom(response));
                }
            }, error => {
                if (form === '1') {
                    dispatch(failure_BasicForm(error));
                } else if (form === '2') {
                    dispatch(failure_GunhaFrom(error));
                }

            })
    }

    function success_BasicForm(districts) {
        return {
            type: professionalConstants.GET_DISTRICT_BASICINFO_SUCCESS,
            districts
        }
    }

    function failure_BasicForm(error) {
        return {
            type: professionalConstants.GET_DISTRICT_BASICINFO_FAILURE,
            error
        }
    }

    function success_GunhaFrom(districts) {
        return {
            type: professionalConstants.GET_DISTRICT_GUNHA_SUCCESS,
            districts
        }
    }

    function failure_GunhaFrom(error) {
        return {
            type: professionalConstants.GET_DISTRICT_GUNHA_FAILURE,
            error
        }
    }

}

function getDharm() {

    return dispatch => {
        dispatch(request());
        professionalService.getDharm()
            .then((response) => {
                dispatch(success(response));
            }, error => {
                dispatch(failure(error));
            })
    }

    function request(dharm) {
        return {
            type: professionalConstants.GET_DHARM_REQUEST,
            dharm
        }
    }

    function success(dharm) {
        return {
            type: professionalConstants.GET_DHARM_SUCCESS,
            dharm
        }
    }

    function failure(error) {
        return {
            type: professionalConstants.GET_DHARM_FAILURE,
            error
        }
    }
}

function getKayda() {

    return dispatch => {
        dispatch(request());
        professionalService.getKayda()
            .then((response) => {
                dispatch(success(response));
            }, error => {
                dispatch(failure(error));
            })
    }

    function request(kayda) {
        return {
            type: professionalConstants.GET_KAYDA_REQUEST,
            kayda
        }
    }

    function success(kayda) {
        return {
            type: professionalConstants.GET_KAYDA_SUCCESS,
            kayda
        }
    }

    function failure(error) {
        return {
            type: professionalConstants.GET_KAYDA_FAILURE,
            error
        }
    }
}

function getKalam(actId) {

    return dispatch => {
        dispatch(request());
        professionalService.getKalam(actId)
            .then((response) => {
                dispatch(success(response));
            }, error => {
                dispatch(failure(error));
            })
    }

    function request(kalam) {
        return {
            type: professionalConstants.GET_KALAM_REQUEST,
            kalam
        }
    }

    function success(kalam) {
        return {
            type: professionalConstants.GET_KALAM_SUCCESS,
            kalam
        }
    }

    function failure(error) {
        return {
            type: professionalConstants.GET_KALAM_FAILURE,
            error
        }
    }
}


function getCrimeType() {

    return dispatch => {
        dispatch(request());
        professionalService.getCrimeType()
            .then((response) => {
                dispatch(success(response));
            }, error => {
                dispatch(failure(error));
            })
    }

    function request(crimeTypes) {
        return {
            type: professionalConstants.GET_CRIMETYPE_REQUEST,
            crimeTypes
        }
    }

    function success(crimeTypes) {
        return {
            type: professionalConstants.GET_CRIMETYPE_SUCCESS,
            crimeTypes
        }
    }

    function failure(error) {
        return {
            type: professionalConstants.GET_CRIMETYPE_FAILURE,
            error
        }
    }
}

function getCrimeTitle() {

    return dispatch => {
        dispatch(request());
        professionalService.getCrimeTitle()
            .then((response) => {
                dispatch(success(response));
            }, error => {
                dispatch(failure(error));
            })
    }

    function request(crimeTitle) {
        return {
            type: professionalConstants.GET_CRIMETITLE_REQUEST,
            crimeTitle
        }
    }

    function success(crimeTitle) {
        return {
            type: professionalConstants.GET_CRIMETITLE_SUCCESS,
            crimeTitle
        }
    }

    function failure(error) {
        return {
            type: professionalConstants.GET_CRIMETITLE_FAILURE,
            error
        }
    }
}

function getStatus() {

    return dispatch => {
        dispatch(request());
        professionalService.getStatus()
            .then((response) => {
                dispatch(success(response));
            }, error => {
                dispatch(failure(error));
            })
    }

    function request(status) {
        return {
            type: professionalConstants.GET_STATUS_REQUEST,
            status
        }
    }

    function success(status) {
        return {
            type: professionalConstants.GET_STATUS_SUCCESS,
            status
        }
    }

    function failure(error) {
        return {
            type: professionalConstants.GET_STATUS_FAILURE,
            error
        }
    }
}

function createCriminal(data) {
    return dispatch => {
        dispatch(request());
        professionalService.createCriminal(data)
            .then((response) => {
                dispatch(success(response));
            }, error => {
                dispatch(failure(error));
            })
    }

    function request(criminals) {
        return {
            type: professionalConstants.GET_CREATE_CRIMINAL_REQUEST,
            criminals
        }
    }

    function success(criminals) {
        return {
            type: professionalConstants.GET_CREATE_CRIMINAL_SUCCESS,
            criminals
        }
    }

    function failure(error) {
        return {
            type: professionalConstants.GET_CREATE_CRIMINAL_FAILURE,
            error
        }
    }
}


function createNews(data) {
    return dispatch => {
        dispatch(request());
        professionalService.createNews(data)
            .then((response) => {
                dispatch(success(response));
            }, error => {
                dispatch(failure(error));
            })
    }

    function request(news) {
        return {
            type: professionalConstants.SAVE_NEWS_REQUEST,
            news
        }
    }

    function success(news) {
        return {
            type: professionalConstants.SAVE_NEWS_SUCCESS,
            news
        }
    }

    function failure(error) {
        return {
            type: professionalConstants.SAVE_NEWS_FAILURE,
            error
        }
    }
}


function getGPSInformation(cityId) {
  
        // dispatch(request());
        return  professionalService.getGPSInformation(cityId)     
     

    // function request(gpsInformation) {
    //     return {
    //         type: professionalConstants.GET_GPS_INFORMATION_REQUEST,
    //         gpsInformation
    //     }
    // }

    // function success(gpsInformation) {
    //     return {
    //         type: professionalConstants.GET_GPS_INFORMATION_SUCCESS,
    //         gpsInformation
    //     }
    // }

    // function failure(error) {
    //     return {
    //         type: professionalConstants.GET_GPS_INFORMATION_FAILURE,
    //         error
    //     }
    // }
}

    function getGPSInformationSuccess(gpsInformation) {
        return dispatch => {
            dispatch(success(gpsInformation));
        }
        function success(gpsInformation) {
            return {
                type: professionalConstants.GET_GPS_INFORMATION_SUCCESS,
                gpsInformation
            }
        }
    }

function getNews(itemType) {
    return dispatch => {
        dispatch(request());
        professionalService.getNews(itemType)
            .then((response) => {
                dispatch(success(response));
            }, error => {
                dispatch(failure(error));
            })
    }

    function request(news) {
        return {
            type: professionalConstants.GET_NEWS_REQUEST,
            news
        }
    }

    function success(news) {
        return {
            type: professionalConstants.GET_NEWS_SUCCESS,
            news
        }
    }

    function failure(error) {
        return {
            type: professionalConstants.GET_NEWS_FAILURE,
            error
        }
    }
}

function updateNews(id, data) {
    let reqObj = {
        ...data,
        id
    }
  
    return dispatch => {
        dispatch(request());
        professionalService.updateNews(id, data)
            .then((response) => {
                dispatch(success(reqObj));
            }, error => {
                dispatch(failure(error));
            })
    }

    function request(news) {
        return {
            type: professionalConstants.UPDATE_NEWS_REQUEST,
            news
        }
    }

    function success(news) {
        return {
            type: professionalConstants.UPDATE_NEWS_SUCCESS,
            news
        }
    }

    function failure(error) {
        return {
            type: professionalConstants.UPDATE_NEWS_FAILURE,
            error
        }
    }
}

function getCriminalsById(id) {
    return dispatch => {
        // dispatch(request());
        return professionalService.getCriminalsById(id)
        // .then((response) => {
        //     dispatch(success(response));
        // }, error => {
        //     dispatch(failure(error));
        // })
        // }

        // function request(criminalsList) {
        //     return {
        //         type: professionalConstants.GET_CRIMINALS_BY_ID_REQUEST,
        //         criminalsList
        //     }
        // }

        // function success(criminalsList) {
        //     return {
        //         type: professionalConstants.GET_CRIMINALS_BY_ID_SUCCESS,
        //         criminalsList
        //     }
        // }

        // function failure(error) {
        //     return {
        //         type: professionalConstants.GET_CRIMINALS_BY_ID_FAILURE,
        //         error
        //     }
        // }
    }

}

function getCriminalsViewsById(id) {
    return dispatch => {
          dispatch(request());
        professionalService.getCriminalsById(id)
        .then((response) => {
            dispatch(success(response));
        }, error => {
            dispatch(failure(error));
        })
       

        function request(criminalViewList) {
            return {
                type: professionalConstants.GET_CRIMINALS_BY_ID_REQUEST,
                criminalViewList
            }
        }

        function success(criminalViewList) {
            return {
                type: professionalConstants.GET_CRIMINALS_BY_ID_SUCCESS,
                criminalViewList
            }
        }

        function failure(error) {
            return {
                type: professionalConstants.GET_CRIMINALS_BY_ID_FAILURE,
                error
            }
        }
    }

}



function getCriminalsTableInfoById(falg,id,control) {
    return dispatch => {
        dispatch(request());
        professionalService.getCriminalsTableInfoById(falg,id,control)
            .then((response) => {
                dispatch(success(response));
            }, error => {
                dispatch(failure(error));
            })
    }

    function request(criminalsTableList) {
        return {
            type: professionalConstants.GET_CRIMINALS_TABLE_BY_ID_REQUEST,
            criminalsTableList
        }
    }

    function success(criminalsTableList) {
        return {
            type: professionalConstants.GET_CRIMINALS_TABLE_BY_ID_SUCCESS,
            criminalsTableList
        }
    }

    function failure(error) {
        return {
            type: professionalConstants.GET_CRIMINALS_TABLE_BY_ID_FAILURE,
            error
        }
    }

}

function updateCriminals(id, data) {
    return dispatch => {
        dispatch(request());
        professionalService.updateCriminals(id, data)
            .then((response) => {
                dispatch(success(response));
            }, error => {
                dispatch(failure(error));
            })
    }

    function request(criminalsUpdatedList) {
        return {
            type: professionalConstants.GET_CRIMINALS_BY_ID_REQUEST,
            criminalsUpdatedList
        }
    }

    function success(criminalsUpdatedList) {
        return {
            type: professionalConstants.UPDATE_CRIMINALS_BY_ID_SUCCESS,
            criminalsUpdatedList
        }
    }

    function failure(error) {
        return {
            type: professionalConstants.UPDATE_CRIMINALS_BY_ID_FAILURE,
            error
        }
    }
}


function uploadImage(data) {
    return dispatch => {
        // dispatch(request());
        return professionalService.uploadImage(data)
            // .then((response) => {
            //     dispatch(success(response));
            // }, error => {
            //   ///  dispatch(failure(error));
            // })
    }

    // function request(criminalsUpdatedList) {
    //     return {
    //         type: professionalConstants.GET_CRIMINALS_BY_ID_REQUEST,
    //         criminalsUpdatedList
    //     }
    // }

    // function success(criminalsUpdatedList) {
    //     return {
    //         type: professionalConstants.UPDATE_CRIMINALS_BY_ID_SUCCESS,
    //         criminalsUpdatedList
    //     }
    // }

    // function failure(error) {
    //     return {
    //         type: professionalConstants.UPDATE_CRIMINALS_BY_ID_FAILURE,
    //         error
    //     }
    // }
}


function getReport3(data) {
    return  professionalService.getReport3(data)     
}
function getReport1(data) {
    return  professionalService.getReport1(data)     
}
function getReport4(data) {
    return  professionalService.getReport4(data)     
}

function getActiveAndNonActiveGpsInforByMasterId(masterid) {
    return  professionalService.getActiveAndNonActiveGpsInforByMasterId(masterid)     
}
import {
  professionalConstants
} from '../_constants';
import _ from 'lodash';
export function professionals(state = {
  city: [],
  state: [],
  basicInfo: [],
  isUpdated: false,
  criminalsTableList: [],
  criminalViewList: [],
  gpsInformationList:[],
  newsList:[]
}, action) {
  switch (action.type) {
    case professionalConstants.GET_MASTER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case professionalConstants.GET_MASTER_SUCCESS:
      return {
        ...state,
        ...action.professionals,
        loading: false,
      };
    case professionalConstants.GET_MASTER_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case professionalConstants.GET_CITY_REQUEST:
      return {
        ...state,
        loading: true
      };
    case professionalConstants.GET_CITY_SUCCESS:
      return {
        ...state,
        ...action.cities,
        loading: false,
      };
    case professionalConstants.GET_CITY_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case professionalConstants.GET_DISTRICT_BASICINFO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case professionalConstants.GET_DISTRICT_BASICINFO_SUCCESS:
      return {
        ...state,
        basicDistricts: [...action.districts.pc_districts],
        loading: false,
      };
    case professionalConstants.GET_DISTRICT_BASICINFO_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case professionalConstants.GET_DISTRICT_GUNHA_REQUEST:
      return {
        ...state,
        loading: true
      };
    case professionalConstants.GET_DISTRICT_GUNHA_SUCCESS:
      return {
        ...state,
        gunhaDistricts: [...action.districts.pc_districts],
        loading: false,
      };
    case professionalConstants.GET_DISTRICT_GUNHA_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case professionalConstants.GET_DHARM_REQUEST:
      return {
        loading: true
      };
    case professionalConstants.GET_DHARM_SUCCESS:
      return {
        ...state,
        ...action.dharm,
        loading: false,
      };
    case professionalConstants.GET_DHARM_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };


    case professionalConstants.GET_KALAM_REQUEST:
      return {
        ...state,
        loading: true
      };
    case professionalConstants.GET_KALAM_SUCCESS:
      return {
        ...state,
        ...action.kalam,
        loading: false,
      };
    case professionalConstants.GET_KALAM_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };


    case professionalConstants.GET_KAYDA_REQUEST:
      return {
        loading: true
      };
    case professionalConstants.GET_KAYDA_SUCCESS:
      return {
        ...state,
        ...action.kayda,
        loading: false,
      };
    case professionalConstants.GET_KAYDA_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };


    case professionalConstants.GET_CRIMETYPE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case professionalConstants.GET_CRIMETYPE_SUCCESS:
      return {
        ...state,
        ...action.crimeTypes,
        loading: false,
      };
    case professionalConstants.GET_CRIMETYPE_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };


    case professionalConstants.GET_CRIMETITLE_REQUEST:
      return {
        loading: true
      };
    case professionalConstants.GET_CRIMETITLE_SUCCESS:
      return {
        ...state,
        ...action.crimeTitle,
        loading: false,
      };
    case professionalConstants.GET_CRIMETITLE_FAILURE:
      return {
        error: action.error,
        loading: false,
      };


    case professionalConstants.GET_STATUS_REQUEST:
      return {
        loading: true
      };
    case professionalConstants.GET_STATUS_SUCCESS:
      return {
        ...state,
        ...action.status,
        loading: false,
      };
    case professionalConstants.GET_STATUS_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    case professionalConstants.GET_CREATE_CRIMINAL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case professionalConstants.GET_CREATE_CRIMINAL_SUCCESS:
      return {
        ...state,
        criminalsTableList: [...state.criminalsTableList, ...action.criminals.basicInfo],
        // basicInfo: [...state.basicInfo, ...action.criminals.basicInfo],
        //   gunhaInfor: [...state.gunhaInfor, ...action.criminals.gunhaInfor],
        //   otherInfo: [...state.otherInfo, ...action.criminals.otherInfo]
        loading: false
      };
    case professionalConstants.GET_CREATE_CRIMINAL_FAILURE:
      return {
        ...state,
        error: action.error
      };

    case professionalConstants.GET_CRIMINALS_BY_ID_REQUEST:
      return {
        ...state,
        loading: true
      };
    case professionalConstants.GET_CRIMINALS_BY_ID_SUCCESS:
      return {
        ...state,
        criminalViewList:action.criminalViewList,
        loading: false,

        //     otherInfo:action.criminalsViewsList.otherInfo,
        // gunhaInfor:action.criminalsViewsListgunhaInfor,
        // basicInfo:action.criminalsUpdatedList.basicInfo
        // ...

      };
    case professionalConstants.GET_CRIMINALS_BY_ID_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };


    case professionalConstants.GET_CRIMINALS_TABLE_BY_ID_REQUEST:
      return {
        ...state,
        loading: true
      };
    case professionalConstants.GET_CRIMINALS_TABLE_BY_ID_SUCCESS:
      let newCriminal = [
        ...action.criminalsTableList
      ]
      return {
        ...state,
        criminalsTableList: newCriminal,
        loading: false,
      };
    case professionalConstants.GET_CRIMINALS_TABLE_BY_ID_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };


    case professionalConstants.UPDATE_CRIMINALS_BY_ID_REQUEST:
      return {
        ...state,
        loading: true
      };
    case professionalConstants.UPDATE_CRIMINALS_BY_ID_SUCCESS:
      return {
        ...state,
        // otherInfo:action.criminalsUpdatedList.otherInfo,
        // gunhaInfor:action.criminalsUpdatedList.gunhaInfor,
        // basicInfo:action.criminalsUpdatedList.basicInfo
        isUpdated: true
      };
    case professionalConstants.UPDATE_CRIMINALS_BY_ID_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };


      case professionalConstants.GET_GPS_INFORMATION_REQUEST:
        return {
          ...state,
          loading: true
        };
      case professionalConstants.GET_GPS_INFORMATION_SUCCESS:
        return {
          ...state,
          isUpdated: false,
          gpsInformationList:action.gpsInformation,
          loading: false,
        };
      case professionalConstants.GET_GPS_INFORMATION_FAILURE:
        return {
          ...state,
          error: action.error,
          loading: false,
        };
      

      case professionalConstants.SAVE_NEWS_REQUEST:
        return {
          ...state,
          loading: true
        };
      case professionalConstants.SAVE_NEWS_SUCCESS:
        return {
          ...state,
          isUpdated: true,
          loading: false,
          newsList:[...state.newsList, ...action.news]
        };
      case professionalConstants.SAVE_NEWS_FAILURE:
        return {
          ...state,
          error: action.error
        };


        case professionalConstants.GET_NEWS_REQUEST:
          return {
            ...state,
            loading: true
          };
        case professionalConstants.GET_NEWS_SUCCESS:
          return {
            ...state,
            isUpdated: true,
            loading: false,
            newsList:[],
            newsList:[...action.news]
          };
        case professionalConstants.GET_NEWS_FAILURE:
          return {
            ...state,
            error: action.error
          };


          
        case professionalConstants.UPDATE_NEWS_REQUEST:
          return {
            ...state,
            loading: true
          };
        case professionalConstants.UPDATE_NEWS_SUCCESS:

            let newsListTemp = _.filter(state.newsList && state.newsList,(o)=>{return parseInt(o.id) === parseInt(action.news.id) });
            let newsListTempIndex = _.findIndex(state.newsList, ...newsListTemp);
            state.newsList && state.newsList.splice(newsListTempIndex,1);

            if(newsListTemp && newsListTemp.length) {
              newsListTemp[0].status = action.news.status;
              state.newsList.unshift(...newsListTemp)
            }
             
          return {
            ...state,
            isUpdated: true,
            loading: false,
             newsList:[...state.newsList]
          };
        case professionalConstants.UPDATE_NEWS_FAILURE:
          return {
            ...state,
            error: action.error
          };

    default:
      return state
  }
}
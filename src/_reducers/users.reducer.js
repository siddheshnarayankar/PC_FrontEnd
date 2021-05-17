import {
  userConstants
} from '../_constants';

import _ from 'lodash';

export function users(state = {
  users: [],
  appusers:[],
  isUserExists:false
}, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        ...state,
        users: action.users.user,
        error: null
      };
    case userConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error
      };


      case userConstants.CREATE_USER_REQUEST:
        return {
          loading: true
        };
      case userConstants.CREATE_USER_SUCCESS:
        return {
          ...state,
          users: [...state.users, action.newUser.user],
          error: null
        }
        case userConstants.CREATE_USER_FAILURE:
          return {
            ...state,
            error: action.error,
          };

        case userConstants.GET_ADMIN_USER_REQUEST:
          return {
            loading: true
          };
        case userConstants.GET_ADMIN_USER_SUCCESS:
          return {
            ...state,
            users: action.users.user,
            error: null
          }
          case userConstants.GET_ADMIN_USER_FAILURE:
            return {
              ...state,
              error: action.error
            };


            case userConstants.GET_APP_USER_REQUEST:
              return {
                loading: true,
                ...state,
              };
            case userConstants.GET_APP_USER_SUCCESS:
              return {
                ...state,
                appusers:action.appuser.user,
                error: null
              }
              case userConstants.GET_APP_USER_FAILURE:
                return {
                  ...state,
                  error: action.error
                };

          case userConstants.UPDATE_USER_REQUEST:
            return {
              loading: true,
              ...state,
            };
          case userConstants.UPDATE_USER_SUCCESS:
            let temp = _.filter(state.users,(o)=>{return o.id === action.updatedUser.id });
            let index = _.findIndex(state.users, ...temp);
            state.users && state.users.splice(index,1);
            return {
              ...state,
              users: [...state.users, action.updatedUser],
              error: null
            }
            case userConstants.UPDATE_USER_FAILURE:
              return {
                ...state,
                error: action.error
              };
              
              case userConstants.UPDATE_APP_USER_REQUEST:
                return {
                  loading: true,
                  ...state,
                };
              case userConstants.UPDATE_APP_USER_SUCCESS:
                let AppUserTemp = _.filter(state.appusers && state.appusers,(o)=>{return o.id === action.updatedAppUser.id });
                let AppUserTempIndex = _.findIndex(state.appusers, ...AppUserTemp);
                state.appusers && state.appusers.splice(AppUserTempIndex,1);
                return {
                  ...state,
                  appusers: [...state.appusers, action.updatedAppUser],
                  error: null
                }
                case userConstants.UPDATE_APP_USER_FAILURE:
                  return {
                    ...state,
                    error: action.error
                  };
            default:
              return state
  }
}
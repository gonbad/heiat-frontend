import { USER_REQUEST, USER_ERROR, USER_SUCCESS,AUTH_LOGOUT,PROFILE_SUCCESS,COUPLE_SUCCESS } from '../utils/constants'
import {HTTP} from '@/utils'
import Vue from 'vue'
import _ from 'lodash';
import moment from 'moment-jalaali'

const state = { status: '', user: {profile:{people_type:'other'}} }

const getters = {
  getUser: state => _.merge(state.user,{profile:{jalali__birth_date:(state.user.profile.birth_date?moment(state.user.profile.birth_date,'YYYY-MM-DD').format('jYYYY/jM/jD'):'1370/6/7')}}),
  isProfileLoaded: state => !!state.user.username,
}

const actions = {
  [USER_REQUEST]: ({commit, dispatch}) => {
    commit(USER_REQUEST)
    HTTP.get('auth/users/me')
      .then(resp => {
        commit(USER_SUCCESS, resp.data)
          console.log(resp.data.email);
      })
      .catch(resp => {
        commit(USER_ERROR)
        // if resp is unauthorized, logout, to
        dispatch(AUTH_LOGOUT)
      })
  },
}

const mutations = {
  [USER_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [USER_SUCCESS]: (state, resp) => {
    state.status = 'success'
    Vue.set(state, 'user', resp)
  },
  [PROFILE_SUCCESS]: (state, resp) => {
    state.status = 'success'
    state['user']['profile']=resp;
  },
  [COUPLE_SUCCESS]: (state, resp) => {
    state.status = 'success'
    state['user']['profile']['couple']=resp;
    //   state=_.merge(state,{user:{profile:{couple:resp}}})
  },
  [USER_ERROR]: (state) => {
    state.status = 'error'
  },
  [AUTH_LOGOUT]: (state) => {
    state.profile = {}
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}

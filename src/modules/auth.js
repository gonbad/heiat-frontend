/* eslint-disable promise/param-names */
import {AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT, USER_REQUEST} from '../utils/constants'
import {HTTP} from '@/utils'
import axios from 'axios';

const state = {token: localStorage.getItem('user-token') || '', status: '', hasLoadedOnce: false}

const getters = {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
}

const actions = {
    [AUTH_REQUEST]: ({commit, dispatch}, user) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_REQUEST)
            HTTP.post('auth/token/login/', user)
                .then(resp => {
                    localStorage.setItem('user-token', resp.data.auth_token)
                    // Here set the header of your ajax library to the token value.
                    // example with axios
                    axios.defaults.headers.common['Authorization'] = 'Token ' + resp.data.auth_token;
                    commit(AUTH_SUCCESS, resp)
                    dispatch(USER_REQUEST)
                    resolve(resp)
                })
                .catch(err => {
                    commit(AUTH_ERROR, err)
                    localStorage.removeItem('user-token')
                    reject(err)
                })
        })
    },
    [AUTH_LOGOUT]: ({commit, dispatch}) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_LOGOUT)
            localStorage.removeItem('user-token')
            delete axios.defaults.headers.common["Authorization"];
            resolve()
        })
    }
}

const mutations = {
    [AUTH_REQUEST]: (state) => {
        state.status = 'loading'
    },
    [AUTH_SUCCESS]: (state, resp) => {
        state.status = 'success'
        state.token = resp.data.auth_token
        state.hasLoadedOnce = true
    },
    [AUTH_ERROR]: (state) => {
        state.status = 'error'
        state.hasLoadedOnce = true
    },
    [AUTH_LOGOUT]: (state) => {
        state.token = ''
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}

import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/accounts/Login.vue'
import ResetPassword from './views/accounts/ResetPassword'
import ResetPasswordConfirm from './views/accounts/ResetPasswordConfirm'
import SignUp from './views/accounts/SignUp'
import Activate from './views/accounts/Activate'
import Profile from './views/accounts/Profile.vue'
import ProfileUser from './views/accounts/ProfileUser'
import ProfileCouple from './views/accounts/ProfileCouple'
import ProfileBase from './views/accounts/ProfileBase'
import ProfilePassport from './views/accounts/ProfilePassport'
import ProfileChangePassword from './views/accounts/ProfileChangePassword'
import store from '@/store'

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        next()
        return
    }
    next('/profile')
}

const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next()
        return
    }
    next('/login')
}

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            beforeEnter: ifNotAuthenticated,
        },
        {
            path: '/password/reset/confirm/:uid/:token',
            name: 'ResetPasswordConfirm',
            component: ResetPasswordConfirm,
        },
        {
            path: '/password/reset',
            name: 'ResetPassword',
            component: ResetPassword,
            beforeEnter: ifNotAuthenticated,
        },
        {
            path: '/signup',
            name: 'SignUp',
            component: SignUp,
            beforeEnter: ifNotAuthenticated,
        },
        {
            path: '/activate/:uid/:token',
            name: 'Activate',
            component: Activate
        },
        {
            path: '/profile/',
            component: Profile,
            beforeEnter: ifAuthenticated,
            children: [

                {
                    path: 'passport',
                    name: 'Profile.Passport',
                    component: ProfilePassport
                },
                {
                    path: 'change/password',
                    name: 'Profile.ChangePassword',
                    component: ProfileChangePassword
                },
                {
                    path: 'user',
                    name: 'Profile.User',
                    component: ProfileUser
                },
                {
                    path: 'couple',
                    name: 'Profile.Couple',
                    component: ProfileCouple
                },
                {
                    path: '',
                    name: 'Profile.Base',
                    component: ProfileBase
                }
            ]
        }
        // {
        //   path: '/about',
        //   name: 'about',
        //   // route level code-splitting
        //   // this generates a separate chunk (about.[hash].js) for this route
        //   // which is lazy-loaded when the route is visited.
        //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        // }
    ]
})

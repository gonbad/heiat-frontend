import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Profile from './views/Profile.vue'
import ProfileUser from './views/ProfileUser'
import ProfileBase from './views/ProfileBase'
import ProfilePassport from './views/ProfilePassport'
import ProfileChangePassword from './views/ProfileChangePassword'

Vue.use(Router)

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
            component: Login
        },
        {
            path: '/profile/',
            component: Profile,
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
                },{
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

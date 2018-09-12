<template>
    <div id="app" class="rtl">
        <b-navbar toggleable="md" type="dark" variant="info">

            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

            <b-navbar-brand :to="{ name: 'Home' }" exact>هیات الزهرا دانشگاه صنعتی شریف</b-navbar-brand>

            <b-collapse is-nav id="nav_collapse">


                <!-- Right aligned nav items -->
                <b-navbar-nav class="mr-auto">
                    <b-nav-item v-if="!isAuthenticated && !authLoading" :to="{ name: 'Login' }">ورود</b-nav-item>
                    <b-nav-item v-if="isProfileLoaded" :to="{ name: 'Login' }">{{getProfile.username}}</b-nav-item>
                    <b-nav-item v-if="isAuthenticated" @click="logout">خروج</b-nav-item>
                </b-navbar-nav>

            </b-collapse>
        </b-navbar>
        <router-view></router-view>
    </div>
</template>

<script>
    import {mapGetters, mapState} from 'vuex'
    import {AUTH_LOGOUT,USER_REQUEST} from '@/modules/constants'
    import axios from 'axios';

    export default {
        name: 'app',
        data() {
            return {}
        },
        created() {
            let token = localStorage.getItem('user-token');
            if (!!token) {
                axios.defaults.headers.common['Authorization'] = 'Token ' + localStorage.getItem('user-token');
                this.$store.dispatch(USER_REQUEST).then(() => {
                })
            }
        },
        methods: {
            logout: function () {
                this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push('/login'))
            }
        },
        computed: {
            ...mapGetters(['getProfile', 'isAuthenticated', 'isProfileLoaded']),
            ...mapState({
                authLoading: state => state.auth.status === 'loading',
            })
        }

    }
</script>

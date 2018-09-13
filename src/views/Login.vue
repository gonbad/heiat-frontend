/**
* Created by vouill on 11/13/17.
*/

<template>
    <div>
        <form class="login" @submit.prevent="login">
            <h1>Sign in</h1>
            <label>User name</label>
            <input required v-model="username" type="text" placeholder="Snoopy"/>
            <label>Password</label>
            <input required v-model="password" type="password" placeholder="Password"/>
            <hr/>
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<style>
    .login {
        display: flex;
        flex-direction: column;
        width: 300px;
        padding: 10px;
    }
</style>

<script>
    import {AUTH_REQUEST} from '@/utils/constants'

    export default {
        name: 'Login',
        data () {
            return {
                username: '4900152234',
                password: '2rooohet',
            }
        },
        methods: {
            login: function () {
                const { username, password } = this
                this.$store.dispatch(AUTH_REQUEST, { username, password }).then(() => {
                    console.log('resolved');
                    this.$router.push('/')
                    console.log('after push');
                })
            }
        },
    }
</script>

/**
* Created by vouill on 11/13/17.
*/

<template>
    <div>
        <b-container>
            <b-form @submit="onSubmit" v-if="status!=='success'">
                <b-form-group label="کدملی:">
                    <b-form-input type="text"
                                  v-model="username"
                                  placeholder="کدملی خود را وارد کنید">
                    </b-form-input>
                    <span class="error" v-for="e in error.username">{{e}}</span>
                </b-form-group>
                <b-form-group label="گذرواژه:"
                              description="گذرواژه باید حداقل ۸ حرف باشد و ترکیبی از اعداد و حروف باشد">
                    <b-form-input v-model="password" type="password"
                                  placeholder="گذرواژه را وارد کنید">
                    </b-form-input>
                    <span class="error" v-for="e in error.password">{{e}}</span>
                </b-form-group>

                <b-button type="submit" variant="success" :disabled="status==='sending'">
                    <span v-show="status!=='sending'">ورود</span>
                    <span v-show="status==='sending'">در حال ارسال</span>
                </b-button>
                <p class="error" v-if="status==='error'">
                    ورود با مشکل مواجه شد
                </p>
            </b-form>
            <p>
                حساب کاربری ندارید؟ هم‌اکنون
                <router-link :to="{name:'SignUp'}">ایجاد کنید</router-link>
            </p>
            <p>
                <router-link :to="{name:'ResetPassword'}">
                    گذرواژه خود را فراموش کرده‌اید؟
                </router-link>
            </p>

        </b-container>

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
    import {AUTH_REQUEST,AUTH_LOGOUT} from '@/utils/constants'

    export default {
        name: 'Login',
        data () {
            return {
                status:'default',
                username: '',
                password: '',
                error:{
                    username: [],
                    password: [],
                }
            }
        },
        created(){
            this.$store.dispatch(AUTH_LOGOUT)
        },
        methods: {
            onSubmit: function (e) {
                e.preventDefault()
                this.status='sending'
                const { username, password } = this
                this.$store.dispatch(AUTH_REQUEST, { username, password }).then(() => {
                    this.status='success'
                    this.$router.push('/')
                }).catch(error=>{
                    this.error=error.response.data
                    this.status='error'
                })
            }
        },
    }
</script>

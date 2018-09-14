/**
* Created by vouill on 11/13/17.
*/

<template>
    <div>
        <br>
        <b-container>
            <b-form @submit="onSubmit">
                <b-form-group label="گذرواژه جدید:"
                              description="گذرواژه باید حداقل ۸ حرف باشد و ترکیبی از اعداد و حروف باشد">
                    <b-form-input v-model="new_password" type="password"
                                  placeholder="گذرواژه جدید را وارد کنید">
                    </b-form-input>
                    <span class="error" v-for="e in error.new_password">{{e}}</span>
                </b-form-group>
                <b-form-group label="تکرار گذرواژه جدید:">
                    <b-form-input v-model="re_new_password" type="password"
                                  placeholder="گذرواژه جدید را تکرار کنید">
                    </b-form-input>
                    <span class="error" v-for="e in error.re_new_password">{{e}}</span>
                </b-form-group>
                <b-button type="submit" variant="primary" :disabled="status==='sending'">
                    <span v-show="status==='default'">ذخیره</span>
                    <span v-show="status==='sending'">در حال ارسال</span>
                    <span v-show="status==='saved'">ذخیره شد</span>
                    <span v-show="status==='error'">با خطا مواجه شد</span>
                </b-button>
            </b-form>
<p v-if="status==='saved'">
    اکنون می‌توانید
    <router-link :to="{name:'Login'}">
        وارد شوید
    </router-link>
</p>
        </b-container>
    </div>

</template>

<style>

</style>

<script>
    import {HTTP} from '@/utils'


    export default {
        name: 'ResetPasswordConfirm',
        data() {
            return {
                status: 'default',
                new_password: '',
                re_new_password: '',
                error: {
                    new_password: [],
                    re_new_password: [],
                }
            }
        },
        methods: {
            onSubmit: function (e) {
                e.preventDefault();
                this.status = 'sending';
                HTTP.post('auth/password/reset/confirm/', {
                    're_new_password': this.re_new_password,
                    'new_password': this.new_password,
                    'uid': this.$route.params.uid,
                    'token': this.$route.params.token
                }).then(resp => {
                    console.log(resp.data);
                    this.status = 'saved'
                }).catch(error => {
                    if (error.response) {
                        this.error = error.response.data
                        this.status = 'error'
                    }
                })
            }
        },
    }
</script>

/**
* Created by vouill on 11/13/17.
*/

<template>
    <div>
        <br>
        <b-container>
            <b-form @submit="onSubmit" v-if="status!=='success'">
                <b-form-group label="کد ملی خود را برای بازنشانی رمز عبور وارد کنید:">
                    <b-form-input type="number"
                                  v-model="user.username"
                                  placeholder="کد ملی">
                    </b-form-input>
                </b-form-group>
                <b-alert show variant="warning">
                    <h4 class="alert-heading">اخطار!</h4>
                    <p>
                        درصورتی که دریافت پیامک‌های تبلیغاتی را برای سیم‌کارت خود غیر فعال کرده باشید به دلیل عدم امکان
                        دریافت پیامک رمز عبور جدید برای شما ارسال نخواهد شد.
                    </p>
                </b-alert>

                <b-form-group>
                    <b-button :disabled="status==='sending'" type="submit" variant="success">
                        <span v-show="status!=='sending'">تغییر رمز عبور</span>
                        <span v-show="status==='sending'">درحال تغییر</span>
                    </b-button>
                </b-form-group>
            </b-form>
            <p v-if="status==='success'">
                {{ text }}
            </p>
            <p v-if="status==='error'">
                {{ text }}
            </p>

        </b-container>
    </div>

</template>

<style>

</style>

<script>
    import {validateMelliCode} from "../../utils/validators";
    import {HTTP} from '@/utils'
    import {required} from 'vuelidate/lib/validators'


    export default {
        name: 'ProfileCouple',
        data() {
            return {
                status: 'default',
                text: 'عملیات با مشکل مواجه شد.',
                user: {
                    username: ''
                },
                validations: {
                    user: {
                        username: {
                            required,
                            validateMelliCode
                        },
                    }
                }
            }
        },
        methods: {
            onSubmit: function (e) {
                e.preventDefault();
                this.status = 'sending';
                HTTP.post('accounts/password/reset/', {'username': this.user.username}).then(resp => {
                    this.status = 'success';
                    this.text = resp.data;
                }).catch(error => {
                    if (error.response) {
                        this.status = 'error';
                        this.text = error.response.data;
                    }
                })
            }
        },
    }
</script>

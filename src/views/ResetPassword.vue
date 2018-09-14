/**
* Created by vouill on 11/13/17.
*/

<template>
    <div>
        <br>
        <b-container>
                <b-form @submit="onSubmit" v-if="status!=='success'">
                    <b-form-group label="ایمیل خود را برای ارسال لینک بازنشانی وارد کنید:">
                        <b-form-input type="email"
                                      v-model="email"
                                      placeholder="ایمیل">
                        </b-form-input>
                    </b-form-group>

                    <b-button type="submit" variant="primary" :disabled="status==='sending'">
                        <span v-show="status!=='sending'">ارسال لینک بازنشانی</span>
                        <span v-show="status==='sending'">در حال انجام</span>
                    </b-button>
                </b-form>
            <p v-if="status==='success'">
                لینک بازنشانی به ایمیل شما فرستاده شد
            </p>
            <p v-if="status==='error'">
               عملیات با مشکل مواجه شد
            </p>

        </b-container>
    </div>

</template>

<style>

</style>

<script>
    import {COUPLE_SUCCESS} from '@/utils/constants'
    import {formToJson, HTTP} from '@/utils'
    import {validateMelliCode} from '@/utils/validators'
    import {required} from 'vuelidate/lib/validators'


    export default {
        name: 'ProfileCouple',
        data() {
            return {
                status: 'default',
                email:'',
            }
        },
        methods: {
            onSubmit: function (e) {
                e.preventDefault();
                this.status = 'sending';
                HTTP.post('auth/password/reset', {'email':this.email}).then(resp => {
                    console.log(resp.data);
                    this.status = 'success'
                }).catch(error =>{
                    if(error.response) {
                        this.status = 'error'
                    }
                })
            }
        },
    }
</script>

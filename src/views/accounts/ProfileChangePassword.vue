/**
* Created by vouill on 11/13/17.
*/

<template>
    <div>
        <br>
        <b-container>
            <b-form @submit="onSubmit">
                <b-form-group label="گذرواژه فعلی:">
                    <b-form-input v-model="current_password" type="password"
                                  placeholder="گذرواژه فعلی خود را وارد کنید">
                    </b-form-input>
                    <span class="error" v-for="e in error.current_password">{{e}}</span>
                </b-form-group>
                <b-form-group label="گذرواژه جدید:"
                description="گذرواژه باید حداقل ۸ حرف باشد و ترکیبی از اعداد و حروف باشد">
                    <b-form-input v-model="new_password" type="password"
                                  placeholder="گذرواژه جدید را وارد کنید">
                    </b-form-input>
                    <span class="error" v-for="e in error.new_password">{{e}}</span>
                </b-form-group>
                <b-button type="submit" variant="primary" :disabled="status==='sending'">
                    <span v-show="status==='default'">ذخیره</span>
                    <span v-show="status==='sending'">در حال ارسال</span>
                    <span v-show="status==='saved'">ذخیره شد</span>
                    <span v-show="status==='error'">با خطا مواجه شد</span>
                </b-button>
            </b-form>

        </b-container>
    </div>

</template>

<style>

</style>

<script>
    import {HTTP} from '@/utils'


    export default {
        name: 'ProfileCouple',
        data() {
            return {
                status: 'default',
                current_password: '',
                new_password: '',
                error: {
                    current_password:[],
                    new_password: []
                }
            }
        },
        methods: {
            onSubmit: function (e) {
                e.preventDefault();
                this.status = 'sending';
                HTTP.post('auth/password/', {'current_password': this.current_password,'new_password': this.new_password}).then(resp => {
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

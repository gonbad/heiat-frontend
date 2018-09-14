/**
* Created by vouill on 11/13/17.
*/

<template>
    <div>
        <br>
        <b-container>
            <p v-if="$parent.user.profile.couple">
                همسر شما
                <span v-if="$parent.user.profile.couple.gender">
                    آقای
                </span>
                <span v-else>
                    خانم
                </span>
                {{$parent.user.profile.couple.name}}
                است.
            </p>
            <p v-else>
                در حال حاضر شما مجرد محسوب می‌شوید. در صورت تاهل کد ملی همسر را وارد نمایید:
                <b-form @submit="onSubmit">
                    <b-form-group >
                        <b-form-input id="exampleInput2"
                                      type="text"
                                      v-model="melliCode"
                                      placeholder="کد ملی همسر خود را وارد کنید">
                        </b-form-input>
                        <span class="error" v-if="!$v.melliCode.validateMelliCode">فرمت کد ملی درست نیست</span>
                        <span class="error" v-if="status==='error'">{{error}}</span>
                    </b-form-group>
                    <b-button type="submit" variant="primary" :disabled="status==='sending' || $v.$invalid">
                        <span v-show="status==='default'">ذخیره</span>
                        <span v-show="status==='sending'">در حال ارسال</span>
                        <span v-show="status==='saved'">ذخیره شد</span>
                        <span v-show="status==='error'">با خطا مواجه شد</span>
                    </b-button>
                </b-form>
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
                melliCode:'',
                error:''
            }
        },
        validations: {
               melliCode:{
                   required,
                   validateMelliCode
               }
        },
        methods: {
            onSubmit: function (e) {
                e.preventDefault();
                this.status = 'sending';
                HTTP.post('accounts/couple/', {'melli_code':this.melliCode}).then(resp => {
                    console.log(resp.data);
                    this.status = 'saved'
                    this.$store.commit(COUPLE_SUCCESS, resp.data);
                    this.$parent.user.profile.couple=resp.data;
                }).catch(error =>{
                    if(error.response) {
                        this.error = error.response.data
                        this.status = 'error'
                    }
                })
            }
        },
    }
</script>

/**
* Created by vouill on 11/13/17.
*/

<template>
    <div>
        <br>
        <b-container>
            <b-form @submit="onSubmit">
                <b-form-group id="exampleInputGroup1"
                              label="نام پدر:"
                              label-for="exampleInput1">
                    <b-form-input id="exampleInput1"
                                  type="text"
                                  v-model="$parent.user.profile.father_name"
                                  placeholder="نام پدر خود را وارد کنید">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="exampleInputGroup2"
                              label="شماره موبایل:"
                              label-for="exampleInpu2">
                    <b-form-input id="exampleInput2"
                                  type="text"
                                  v-model="$parent.user.profile.mobile"
                                  placeholder="تلفن همراه خود را وارد کنید">
                    </b-form-input>
                    <span class="error" v-if="!$v.$parent.user.profile.mobile.required">شماره موبایل الزامی است</span>
                    <span class="error" v-if="!$v.$parent.user.profile.mobile.validateMobile">فرمت شماره موبایل درست نیست</span>
                </b-form-group>
                <b-button type="submit" variant="primary" :disabled="status==='sending'">
                    <span v-show="status==='default'">ذخیره</span>
                    <span v-show="status==='sending'">در حال ارسال</span>
                    <span v-show="status==='saved'">ذخیره شد</span>
                </b-button>
            </b-form>
        </b-container>
    </div>

</template>

<style>

</style>

<script>
    import {PROFILE_SUCCESS} from '@/modules/constants'
    import {formToJson, HTTP,validateMobile} from '@/utils'
    import { required } from 'vuelidate/lib/validators'
    export default {
        name: 'ProfileBase',
        data() {
            return {
                status:'default'
            }
        },
        validations:{
          $parent:{
              user:{
                  profile:{
                      mobile:{
                          required,
                          validateMobile
                      }
                  }
              }
          }
        },
        methods: {
            onSubmit: function (e) {
                e.preventDefault();
                this.status='sending';
                HTTP.patch('accounts/profile/', this.$parent.user.profile).then(resp => {
                    console.log(resp.data);
                    this.$store.commit(PROFILE_SUCCESS, resp.data);
                    this.status='saved'
                })
            }
        },
    }
</script>

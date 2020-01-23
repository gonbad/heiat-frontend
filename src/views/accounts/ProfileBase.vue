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
                <b-form-group label="جنسیت:">
                    <b-form-radio-group id="radios2" v-model="$parent.user.profile.gender" name="radioSubComponent"
                                        plain stacked>
                        <b-form-radio :value="true">مرد</b-form-radio>
                        <b-form-radio :value="false">زن</b-form-radio>
                    </b-form-radio-group>
                </b-form-group>
                <b-form-group label="تاریخ تولد:">
                    <pdatepicker v-model="$parent.user.profile.jalali__birth_date"/>
                </b-form-group>
                <b-form-group label="وضعیت تحصیل:">
                    <b-form-select v-model="$parent.user.profile.people_type" :options="PEOPLE_TYPE_CHOICES"/>
                </b-form-group>
                <b-form-group label="شماره دانشجویی:"
                              v-if="$parent.user.profile.people_type==='sharif student'||$parent.user.profile.people_type.startsWith('sharif graduated')">
                    <b-form-input type="number"
                                  v-model="$parent.user.profile.student_number"
                                  placeholder="شماره دانشجویی خود را وارد کنید">
                    </b-form-input>
                    <span class="error" v-if="!$v.$parent.user.profile.student_number.required">شماره دانشجویی الزامی است</span>
                    <span class="error" v-if="!$v.$parent.user.profile.student_number.validateStudentNumber">فرمت شماره دانشجویی درست نیست</span>
                </b-form-group>

                <b-button :disabled="status==='sending' || $v.$invalid" type="submit" variant="success">
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
    import {PROFILE_SUCCESS} from '@/utils/constants'

    import {HTTP} from '@/utils'
    import {validateMobile, validateStudentNumber} from '@/utils/validators'
    import {required} from 'vuelidate/lib/validators'
    import moment from 'moment-jalaali'
    import {PEOPLE_TYPE_CHOICES} from '@/utils/choices'

    function ifStudentNumberIsRequired(people_type) {
        if (people_type === 'sharif student' || people_type.startsWith('sharif graduated')) {
            return {
                required
            }
        } else {
            return {}
        }
    }

    export default {
        name: 'ProfileBase',
        data() {
            return {
                status: 'default',
                PEOPLE_TYPE_CHOICES: PEOPLE_TYPE_CHOICES
            }
        },
        validations() {
            return {
                $parent: {
                    user: {
                        profile: {
                            mobile: {
                                required,
                                validateMobile
                            },
                            student_number: {
                                ...ifStudentNumberIsRequired(this.$parent.user.profile.people_type),
                                validateStudentNumber
                            }
                        }
                    }
                }
            }
        },
        methods: {
            onSubmit: function (e) {
                e.preventDefault();
                this.status = 'sending';
                let obj = this.$parent.user.profile;
                obj.birth_date = moment(obj.jalali__birth_date, 'jYYYY/jM/jD').format('YYYY-MM-DD');
                if (obj.people_type !== 'sharif student' && !obj.people_type.startsWith('sharif graduated')) {
                    delete obj['student_number']
                }
                HTTP.patch('accounts/profile/', obj).then(resp => {
                    this.$store.commit(PROFILE_SUCCESS, resp.data);
                    this.status = 'saved'
                })
            }
        },
    }
</script>

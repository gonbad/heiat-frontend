/**
* Created by vouill on 11/13/17.
*/

<template>
    <div>
        <br>
        <b-container>
            <b-form @submit="onSubmit">
                <b-form-group v-if="$parent.user.profile.gender" label="وضعیت نطام وظیفه:">
                    <b-form-select v-model="$parent.user.profile.conscription" :options="CONSCRIPTION_CHOICES"/>
                </b-form-group>
                <b-form-group label="گذرنامه:">
                    <b-form-radio-group v-model="$parent.user.profile.passport" name="radioSubComponent"
                                        plain stacked>
                        <b-form-radio value="have">دارم</b-form-radio>
                        <b-form-radio value="not have">ندارم</b-form-radio>
                    </b-form-radio-group>
                </b-form-group>
                <b-form-group label="شماره گذرنامه:" v-if="$parent.user.profile.passport==='have'"
                              description="شماره گذرنامه به صورت یک حرف بزرگ انگلیسی و سپس ۸ عدد انگلیسی">
                    <b-form-input type="text"
                                  v-model="$parent.user.profile.passport_number"
                                  placeholder="شماره گذرنامه خود را وارد کنید">

                    </b-form-input>
                </b-form-group>
                <b-form-group label="تاریخ صدور گذرنامه:" v-if="$parent.user.profile.passport==='have'">
                    <datepicker  v-model="$parent.user.profile.passport_date_of_issue"></datepicker>
                </b-form-group>
                <b-form-group label="تاریخ انقضای گذرنامه:" v-if="$parent.user.profile.passport==='have'">
                    <datepicker  v-model="$parent.user.profile.passport_date_of_expiry"></datepicker>
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
    import {PROFILE_SUCCESS} from '@/utils/constants'
    import {formToJson, HTTP} from '@/utils'
    import moment from 'moment-jalaali'
    import {CONSCRIPTION_CHOICES} from '@/utils/choices'
    import Datepicker from 'vuejs-datepicker';


    export default {
        name: 'ProfilePassport',
        components: {
            Datepicker
        },
        data() {
            return {
                status: 'default',
                CONSCRIPTION_CHOICES: CONSCRIPTION_CHOICES
            }
        },
        methods: {
            onSubmit: function (e) {
                e.preventDefault();
                this.status = 'sending';
                let obj=this.$parent.user.profile;
                try {
                    obj.passport_date_of_issue = moment(obj.passport_date_of_issue).format('YYYY-MM-DD')
                    obj.passport_date_of_expiry = moment(obj.passport_date_of_expiry).format('YYYY-MM-DD')
                }catch (e){
                    console.log('date error')
                }
                if(this.$parent.user.profile.passport!=='have'){
                    delete obj.passport_date_of_issue
                    delete obj.passport_date_of_expiry
                }
                HTTP.patch('accounts/profile/', this.$parent.user.profile).then(resp => {
                    this.$store.commit(PROFILE_SUCCESS, resp.data);
                    this.status = 'saved'
                })
            },    customFormatter(date) {
                return moment(date).format('yyyy-MM-dd');
            }
        },
    }
</script>

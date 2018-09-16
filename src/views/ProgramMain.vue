<template>
    <div dir="rtl">
        <b-row>
            <b-col>
                <h1>
                    اطلاعیه‌ها
                </h1>
                <b-card v-for="post in $parent.program.posts"
                        :footer="post.post_date | moment | jalaliWithTime | pNumber">
                    <div v-html="post.text"></div>
                </b-card>
            </b-col>
            <b-col>
                <div v-if="$parent.hasRegistration">
                    <h1>
                        ثبت‌نام من
                    </h1>
                    <div>
                        <label>
                            وضعیت:
                        </label>
                        <span class="answer">
                            {{status_display}}
                        </span>
                    </div>
                    <div v-if="$parent.program.has_coupling">
                        <label>
                            متاهلی:
                        </label>
                        <span class="answer">
                            {{$parent.program.registration.coupling?'بله':'خیر'}}
                        </span>
                    </div>
                    <div v-for="qa in answers">
                        <label>
                            {{qa.title}}:
                        </label>
                        <span class="answer">
                            {{qa.yes?'بله':'خیر'}}
                        </span>
                    </div>
                    <div v-if="!!$parent.program.registration.sum_payed">
                        <label>
                            مجموع پرداختی تاکنون:
                        </label>
                        <span class="answer">
                            {{$parent.program.registration.sum_payed | pNumber}}
                            تومان
                        </span>
                    </div>
                    <div v-if="$parent.program.registration.status==='certain' && !!$parent.program.registration.next_installment">
                        <b-button @click="pay" variant="success" :disabled="status==='sending'">
                            <span v-show="status==='default'">
                            پرداخت مبلغ
                            {{$parent.program.registration.next_installment | pNumber}}
                            تومان
                            </span>
                            <span v-show="status==='sending'">
                           درحال انجام
                            </span>
                            <span v-show="status==='error'">
                           پرداخت با مشکل مواجه شد
                            </span>

                        </b-button>
                    </div>
                    <div v-if="$parent.program.registration.status==='certain' || $parent.program.registration.status==='default' || $parent.program.registration.status==='reserved'">
                        <b-button @click="giveUp" variant="danger">
                            انصراف
                        </b-button>
                    </div>
                </div>
                <div v-else>
                    <h1>
                        ثبت‌نام
                    </h1>
                    <p v-if="!$parent.program.is_open">
                        اکنون زمان ثبت‌نام نیست
                    </p>
                    <p v-else-if="!isAuthenticated">
                        ابتدا باید
                        <router-link :to="{name:'Login'}">
                            وارد شوید
                        </router-link>
                    </p>
                    <p v-else-if="!isProfileCompleted">
                        شما هنوز شماره موبایل و سایر اطلاعات ضروری را در
                        <router-link :to="{name:'Profile.Base'}">
                            صفحه پروفایل
                        </router-link>
                        خود تکمیل نکرده‌اید.
                    </p>
                    <p v-else>
                        در دست احداث
                    </p>
                </div>
            </b-col>
        </b-row>
        <form ref="hiddenForm" action="https://bpm.shaparak.ir/pgwchannel/startpay.mellat" method="POST">
            <input ref="refref" type="hidden" name="RefId" :value="refId">
            <input type="submit" value="go" style="display: none;">
        </form>
    </div>

</template>
<script>
    import {HTTP} from '../utils/index';
    import {mapGetters, mapState} from 'vuex'
    import {STATUS_CHOICES} from '@/utils/choices'


    export default {
        name: 'ProgramMain',

        data() {
            return {
                status: 'default',
                refId: ''
            }
        },
        methods: {
            pay() {
                this.status = 'sending'
                HTTP.post('pay/registration/start/', {'registration_id': this.$parent.program.registration.id}).then(resp => {
                    console.log(resp.data);
                    this.refId = resp.data
                    this.$refs.refref.value = resp.data
                    console.log(formToJson(this.$refs.hiddenForm))
                    this.$refs.hiddenForm.submit();
                }).catch(error => {
                    this.status = 'error'
                })
            },
            giveUp() {
                this.$dialog.confirm('آیا مطمئنید که می‌خواهید انصراف بدهید؟').then(dialog=> {
                        HTTP.post('registration/give_up/', {'registration_id': this.$parent.program.registration.id}).then(resp => {
                            this.$parent.program.registration.status = 'given up'
                        })
                });
            }
        },
        computed: {
            ...mapGetters(['getUser', 'isAuthenticated', 'isProfileLoaded', 'isProfileCompleted']),
            status_display: function () {
                return STATUS_CHOICES[this.$parent.program.registration.status]
            },
            answers: function () {
                return _.map(this.$parent.program.users_questions, item => {
                    let ans = {
                        title: item.title
                    };
                    let found_answer = _.find(this.$parent.program.registration.answers, {'question': item.id})
                    if (found_answer) {
                        ans['yes'] = found_answer.yes
                    } else {
                        ans['yes'] = false
                    }
                    return ans;

                })
            }
        }
    }
</script>
<style>
    .answer {
        font-weight: bold;
    }
</style>
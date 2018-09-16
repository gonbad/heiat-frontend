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
                        <b-button @click="pay" variant="success">
                            پرداخت مبلغ
                            {{$parent.program.registration.next_installment | pNumber}}
                            تومان
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
    </div>
</template>
<script>
    import {HTTP} from '../utils/index';
    import {mapGetters, mapState} from 'vuex'
    import {STATUS_CHOICES} from '@/utils/choices'


    export default {
        name: 'ProgramMain',

        data() {
            return {}
        },
        methods: {
            pay() {
                console.log(this.$parent.program.registration.next_installment)
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
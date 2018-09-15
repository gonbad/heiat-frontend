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
                    <p>
                        در دست احداث
                    </p>
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


    export default {
        name: 'ProgramMain',

        data() {
            return {}
        },
        methods: {},
        computed: {
            ...mapGetters(['getUser', 'isAuthenticated', 'isProfileLoaded','isProfileCompleted'])
        }
    }
</script>
<style>

</style>
<template>
    <div dir="rtl">
        <b-nav fill tabs>
            <b-nav-item :to="{name:'Manage.Registration.Main'}" exact>
                {{registration.profile.user.name}}
            </b-nav-item>
            <b-nav-item :to="{name:'Manage.Registration.Payments'}">
               گزارش مالی
            </b-nav-item>
            <b-nav-item :to="{name:'Manage.Registration.Messages'}">
               پیام‌ها
            </b-nav-item>
        </b-nav>
        <p v-if="isLoading">
            در حال دریافت اطلاعات
        </p>
        <div v-else>
            <br>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    import {HTTP} from '@/utils/index';

    export default {
        name: 'Program',

        data() {
            return {
                isLoading: true,
                registration:{
                    profile:{
                        user:{

                        }
                    }
                }
            }
        },

        created() {
            this.fetchData()
        },

        methods: {
            fetchData() {
                HTTP.get('manage_registration/' + this.$route.params.registration_id + '/?format=json')
                    .then((resp) => {
                        this.registration = resp.data;
                        this.$emit('fetched')
                        this.isLoading = false
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        },
        computed: {
            // hasRegistration: function () {
            //     return !!this.program.registration &&!!this.program.registration.id
            // },
        }
    }
</script>
<style>

</style>
<template>
    <div dir="rtl">
        <b-nav fill tabs>
            <b-nav-item :to="{name:'Manage.Panel'}" exact>پانل</b-nav-item>
            <b-nav-item :to="{name:'Manage.Posts'}">اطلاعیه‌ها</b-nav-item>
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
                program: {
                    is_open: false,
                    state: 'active',
                    posts: [],
                    has_coupling: false,
                    questions: [],
                    registrations: []
                },
            }
        },

        created() {
            this.fetchData()
        },

        methods: {
            fetchData() {
                HTTP.get('manage/program/' + this.$route.params.program_id + '/?format=json')
                    .then((resp) => {
                        this.program = resp.data;
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
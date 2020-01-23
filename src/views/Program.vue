<template>
    <div dir="rtl">
        <b-nav fill tabs v-if="hasRegistration">
            <b-nav-item :to="{name:'Program.Main'}" exact>{{program.title}}</b-nav-item>
            <b-nav-item :to="{name:'Program.Payments'}">گزارش مالی</b-nav-item>
            <b-nav-item :to="{name:'Program.Messages'}">
                پیام‌ها({{program.registration.messages.length | pNumber}})
            </b-nav-item>
        </b-nav>
        <br>
        <router-view/>
        </div>
</template>
<script>
    import {HTTP} from '../utils/index';

    export default {
        name: 'Program',

        data() {
            return {
                program: {
                    is_open:false,
                    state:'active',
                    posts:[],
                    has_coupling:false,
                    users_questions:[],
                    registration:{
                        status:'default',
                        payments:[],
                        messages:[],
                        answers:[]
                    }
                },
            }
        },

        created() {
            this.fetchData()
        },

        methods: {
            fetchData() {
                HTTP.get('programs/' + this.$route.params.program_id + '/?format=json')
                    .then((resp) => {
                        this.program = resp.data;
                        if(this.program.registration){
                        }
                        this.$emit('fetched')
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        },
        computed:{
            hasRegistration: function () {
                return !!this.program.registration &&!!this.program.registration.id
            },
        }
    }
</script>
<style>

</style>
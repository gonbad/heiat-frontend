<template>
    <div dir="rtl">
        <b-nav fill tabs v-if="hasRegistration">
            <b-nav-item :to="{name:'Program.Main'}" exact>اطلاعات اصلی</b-nav-item>
            <b-nav-item :to="{name:'Program.Payments'}">گزارش مالی</b-nav-item>
        </b-nav>
        <br>
            <router-view></router-view>
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
                    posts:[],
                    registration:{
                        payments:[],
                        messages:[]
                    }
                },
                hasRegistration:false
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
                            this.hasRegistration=true
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        }
    }
</script>
<style>

</style>
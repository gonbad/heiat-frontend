<template>
    <div dir="rtl">
 bkew
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
                    posts:[]
                }
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
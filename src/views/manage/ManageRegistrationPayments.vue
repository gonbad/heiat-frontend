<template>
    <div>
        <payments :payments="payments"></payments>
    </div>

</template>
<script>
    import {HTTP} from '@/utils/index';
    import Messages from "../../components/Messages";
    import Payments from "../../components/Payments";


    export default {
        components: {
            Payments
        },
        data() {
            return {
                payments:[],
            }
        },
        created() {
            this.fetchData()
        },
        methods: {

            fetchData(){
                HTTP.get('manage_registration/'+this.$route.params.registration_id+'/payments').then(resp => {
                    this.payments=resp.data
                })
            }
        },
        computed: {
        }
    }
</script>
<style>
</style>
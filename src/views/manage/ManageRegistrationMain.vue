<template>
    <div dir="rtl">
<print-registration :registration="$parent.registration" :questions="$parent.$parent.program.questions"></print-registration>
        <div v-if="$parent.registration.couple_id">
            <h2><router-link :to="{name:'Manage.Registration.Main',params:{program_id:$parent.$parent.program.id,registration_id:$parent.registration.couple_id}}">
                ثبت‌نام همسر
            </router-link>
            </h2>
        </div>
    </div>

</template>
<script>
    import {HTTP} from '@/utils/index';
    import PrintRegistration from "../../components/PrintRegistration";


    export default {
        components: {PrintRegistration},
        data() {
            return {

            }
        },
        created() {
        },
        methods: {
        },
        computed: {
        }
    }
</script>
<style>
</style>
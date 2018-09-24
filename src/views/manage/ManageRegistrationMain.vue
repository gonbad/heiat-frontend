<template>
    <div dir="rtl">
<print-registration :registration="$parent.registration" :questions="$parent.$parent.program.questions"></print-registration>
        <div v-if="$parent.registration.couple">
            <h2>
                ثبت‌نام همسر
            </h2>
            <print-registration :registration="$parent.registration.couple" :questions="$parent.$parent.program.questions"></print-registration>
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
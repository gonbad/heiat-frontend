<template>
    <div dir="rtl">
        <b-row>
            <b-col>
                <print-registration :registration="$parent.registration"
                                    :questions="$parent.$parent.program.questions"></print-registration>
                <div v-if="$parent.registration.couple_id">
                    <h2>
                        <router-link
                                :to="{name:'Manage.Registration.Main',params:{program_id:$parent.$parent.program.id,registration_id:$parent.registration.couple_id}}">
                            ثبت‌نام همسر
                        </router-link>
                    </h2>
                </div>
            </b-col>
            <b-col>
<div>
    <b-form-select v-model="new_status" :options="STATUS_CHOICES" style="width: 50%" />
    <b-button @click="changeStatus" variant="primary" :disabled="status==='sending'">
        <span v-show="status!=='sending'">تغییر وضعیت</span>
        <span v-show="status==='sending'">لطفا کمی صبر کنید</span>
    </b-button>
</div>
            </b-col>
        </b-row>

    </div>

</template>
<script>
    import {HTTP} from '@/utils/index';
    import PrintRegistration from "../../components/PrintRegistration";
    import {STATUS_CHOICES} from '@/utils/choices'


    export default {
        components: {PrintRegistration},
        data() {
            return {
                status: 'default',
                new_status:'default',
                STATUS_CHOICES:STATUS_CHOICES
            }
        },
        created() {
        },
        methods: {
            changeStatus(){
                this.status='sending';
                HTTP.post('manage_registration/'+this.$route.params.registration_id+'/change_status/', {status:this.new_status}).then(resp => {
                    this.$parent.registration=resp.data;
                    this.status='default'
                }).catch(error => {
                    this.status = 'error'
                })
            },
        },
        computed: {}
    }
</script>
<style>
</style>
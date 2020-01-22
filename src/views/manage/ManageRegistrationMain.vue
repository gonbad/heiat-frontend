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
    <b-form-select v-model="$parent.registration.status" :options="STATUS_CHOICES" style="width: 50%" />
    <b-button :disabled="status==='sending'" @click="changeStatus" variant="success">
        <span v-show="status!=='sending'">تغییر وضعیت</span>
        <span v-show="status==='sending'">لطفا کمی صبر کنید</span>
    </b-button>
</div>
<div v-if="$parent.$parent.program.questions.length>0">
    <b-form-select v-model="question_id" :options="questions" style="width: 35%" />
    <b-form-select v-model="yes"  style="width: 35%" >
        <option :value="false">خیر</option>
        <option :value="true">بله</option>
    </b-form-select>
    <b-button :disabled="status==='sending' || question_id===null || yes=== null" @click="changeAnswer"
              variant="success">
        <span v-show="status!=='sending'">تغییر</span>
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
                STATUS_CHOICES:STATUS_CHOICES,
                question_id:null,
                yes:null
            }
        },
        created() {
        },
        methods: {
            changeStatus(){
                this.status='sending';
                HTTP.post('manage_registration/'+this.$route.params.registration_id+'/change_status/', {status:this.$parent.registration.status}).then(resp => {
                    this.$parent.registration=resp.data;
                    this.status='default'
                }).catch(error => {
                    this.status = 'error'
                })
            },
            changeAnswer(){
                this.status='sending';
                HTTP.post('manage_registration/'+this.$route.params.registration_id+'/change_answer/', {question_id:this.question_id,yes:this.yes}).then(resp => {
                    this.$parent.registration=resp.data;
                    this.status='default'
                }).catch(error => {
                    this.status = 'error'
                })
            },
        },
        computed: {
            questions(){
                return _.reduce(this.$parent.$parent.program.questions,(obj,item)=>{
                    obj[item.id]=item.title
                    return obj
                },{})
            }
        }
    }
</script>
<style>
</style>
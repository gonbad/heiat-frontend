<template>
    <div dir="rtl">
        <div class="well">
            <b-container>
                <b-row>
                    <b-col>
                        <b-form-group label="عنوان:">
                            <b-form-input v-model="newQuestion.title"
                                          required
                                          placeholder="عنوان سوال/برچسب را وارد کنید">
                            </b-form-input>
                        </b-form-group>
                        <b-form-group label="توضیحات:">
                            <b-form-input v-model="newQuestion.desc"
                                          placeholder="توضیحات سوال/برچسب را وارد کنید">
                            </b-form-input>
                        </b-form-group>
                        <b-form-group label="کاربر می‌بیند؟">
                            <b-form-radio-group v-model="newQuestion.user_sees" plain stacked>
                                <b-form-radio :value="true">می‌بیند</b-form-radio>
                                <b-form-radio :value="false">نمی‌بیند و جنبه مدیریتی دارد</b-form-radio>
                            </b-form-radio-group>
                        </b-form-group>
                        <b-button @click="save" variant="success" :disabled="status==='sending' || !newQuestion.title">
                            <span v-show="status==='default'">ثبت سوال/برچسب جدید</span>
                            <span v-show="status==='sending'">در حال ارسال</span>
                            <span v-show="status==='saved'">ذخیره شد</span>
                        </b-button>
                    </b-col>
                    <b-col>
                        <div v-for="question in $parent.program.questions">
                            <question :question="question"></question>
                            <hr>
                        </div>
                    </b-col>
                </b-row>


            </b-container>

        </div>
    </div>

</template>
<script>
    import {HTTP} from '@/utils/index';
    import Question from "../../components/Question";


    export default {
        components: {Question},
        name: 'ManageQuestions',

        data() {
            return {
                newQuestion: {
                    program:this.$parent.program.id,
                    title:'',
                    desc:'',
                    user_sees:false
                },
                status: 'default',
            }
        },
        methods: {
            save() {
                this.status='sending'
                HTTP.post('manage/questions/',this.newQuestion).then(resp=>{
                    this.status='saved'
                    this.newQuestion={
                        program:this.$parent.program.id,
                        title:'',
                        desc:'',
                        user_sees:false
                    }
                    this.$parent.program.questions.push(resp.data)
                })
            },
        },
        computed: {}
    }
</script>
<style>
    .answer {
        font-weight: bold;
    }

    .question-item {
        font-weight: bold;
    }
</style>
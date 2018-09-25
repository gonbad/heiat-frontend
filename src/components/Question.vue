<template>
    <div>
        <div v-if="!deleted">
                <b-form-group label="عنوان:">
                    <b-form-input v-model="question.title"
                                  required
                                  placeholder="عنوان سوال/برچسب را وارد کنید">
                    </b-form-input>
                </b-form-group>
            <b-form-group label="توضیحات:">
                    <b-form-input v-model="question.desc"
                                  placeholder="توضیحات سوال/برچسب را وارد کنید">
                    </b-form-input>
                </b-form-group>
            <b-form-group label="میزان تاثیر روی قیمت به تومان:">
                    <b-form-input v-model="question.shift"
                                  type="number"
                                  placeholder="میزان تاثیر به تومان">
                    </b-form-input>
                </b-form-group>
            <b-form-group label="کاربر می‌بیند؟">
                <b-form-radio-group v-model="question.user_sees" plain stacked>
                    <b-form-radio :value="true">می‌بیند</b-form-radio>
                    <b-form-radio :value="false">نمی‌بیند و جنبه مدیریتی دارد</b-form-radio>
                </b-form-radio-group>
            </b-form-group>
                <b-button @click="save()" variant="primary" :disabled="status==='sending' || !question.title">
                    <span v-show="status==='default'">ویرایش</span>
                    <span v-show="status==='sending'">در حال ارسال</span>
                    <span v-show="status==='saved'">ذخیره شد</span>
                </b-button>
                <b-button @click="deleteQuestion" variant="danger">
                    حذف
                </b-button>
        </div>
    </div>
</template>

<script>
    import {HTTP} from '@/utils'

    export default {
        name: 'Question',
        data() {
            return {
                deleted: false,
                status: 'default'
            }
        },
        props: {
            question: {}
        },
        methods: {
            save() {
                this.status = 'sending'
                HTTP.patch('manage/questions/' + this.question.id + '/', this.question).then(resp => {
                    this.status = 'saved'
                })
            },
            deleteQuestion() {
                HTTP.delete('manage/questions/' + this.question.id + '/delete/').then(resp => {
                    this.deleted = true
                })
            }
        }
    }
</script>
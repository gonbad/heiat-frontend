<template>
    <div dir="rtl">
        <div class="well">
            <b-container>
                <b-row>
                    <b-col>
                        <b-form-group label="عنوان برنامه:">
                            <b-form-input v-model="$parent.program.title"
                                          required
                                          placeholder="عنوان برنامه را وارد کنید">
                            </b-form-input>
                        </b-form-group>
                        <b-form-group label="زمان برنامه:">
                            <b-form-input v-model="$parent.program.program_interval"
                                          required
                                          placeholder="زمان برنامه را وارد کنید">
                            </b-form-input>
                        </b-form-group>
                         <b-form-group label="زمان ثبت‌نام:">
                            <b-form-input v-model="$parent.program.register_interval"
                                          required
                                          placeholder="زمان ثبت‌نام را وارد کنید">
                            </b-form-input>
                        </b-form-group>
                        <b-form-group label="نوع برنامه:">
                            <b-form-select v-model="$parent.program.type" :options="PROGRAM_TYPE_CHOICES"/>
                        </b-form-group>
                        <b-form-group label="سال:">
                            <b-form-input v-model="$parent.program.year"
                                          required
                                          type="number"
                                          placeholder="سال تحصیلی برنامه را به صورت دو رقمی وارد کنید">
                            </b-form-input>
                        </b-form-group>
                        <b-form-group label="قیمت پایه(به تومان):">
                            <b-form-input v-model="$parent.program.base_price"
                                          required
                                          type="number"
                                          placeholder="قیمت پایه را وارد کنید">
                            </b-form-input>
                        </b-form-group>
                        <b-form-group label="آستانه قسط اول(به تومان):">
                            <b-form-input v-model="$parent.program.max_first_installment"
                                          required
                                          type="number"
                                          placeholder="حداکثر مبلغ قسط اول را وارد کنید">
                            </b-form-input>
                        </b-form-group>
                        <b-form-group label="آستانه قسط دوم(به تومان):">
                            <b-form-input v-model="$parent.program.max_second_installment"
                                          required
                                          type="number"
                                          placeholder="حداکثر مبلغ قسط دوم را وارد کنید">
                            </b-form-input>
                        </b-form-group>
                        <div>
                            <label>
                                متاهلی دارد:
                            </label>
                            <input type="checkbox" v-model="$parent.program.has_coupling"/>
                        </div>
                        <div>
                            <label>
                                ثبت‌نام باز است:
                            </label>
                            <input type="checkbox" v-model="$parent.program.is_open"/>
                        </div>
                        <b-form-group label="وضعیت برنامه:">
                            <b-form-select v-model="$parent.program.state" :options="PROGRAM_STATE_CHOICES"/>
                        </b-form-group>

                        <b-button @click="save()" variant="primary" :disabled="status==='sending'">
                            <span v-show="status==='default'">ویرایش</span>
                            <span v-show="status==='sending'">در حال ارسال</span>
                            <span v-show="status==='saved'">ذخیره شد</span>
                        </b-button>
                    </b-col>
                    <b-col>
                        <table v-if="loaded">
                            <thead>
                            <th>
                                سری شرکت کننده
                            </th>
                            <th>
                                میزان تاثیر روی قیمت به تومان
                            </th>
                            <th>
                                اعمال
                            </th>
                            </thead>
                            <tbody>
                            <shift v-for="peopleType in keys" :shifts="shifts" :program="$parent.program.id"
                                   :people-type="peopleType"></shift>
                            </tbody>
                        </table>
                    </b-col>
                </b-row>
            </b-container>

        </div>
    </div>

</template>
<script>
    import {HTTP} from '@/utils/index';
    import Shift from "../../components/Shift";
    import _ from 'lodash'
    import {PEOPLE_TYPE_KEYS,PROGRAM_TYPE_CHOICES,PROGRAM_STATE_CHOICES} from '@/utils/choices'

    export default {
        components: {Shift},
        name: 'ManageProgram',

        data() {
            return {
                status: 'default',
                shifts: [],
                keys: PEOPLE_TYPE_KEYS,
                loaded:false,
                PROGRAM_TYPE_CHOICES:PROGRAM_TYPE_CHOICES,
                PROGRAM_STATE_CHOICES:PROGRAM_STATE_CHOICES

            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            fetchData() {
                HTTP.get('manage/' + this.$route.params.program_id + '/shifts/?format=json').then(resp => {
                    this.shifts = resp.data
                    this.loaded=true
                }).catch(error => {
                })
            },
            save() {
                this.status = 'sending'
                HTTP.patch('manage/'+this.$parent.program.id+'/',this.$parent.program).then(resp=>{
                    this.$parent.program=resp.data
                    this.status='saved'
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
<template>
    <div dir="rtl">
        <div>
            <b-row>
                <b-col>
                    <div>
                        <div>
                            <label>
                                وضعیت:
                            </label>
                            <span style="margin-right: -7px; display: inline">
                                <b-form-checkbox-group plain v-model="filter.status" :options="choices.status">
                                </b-form-checkbox-group>
                            </span>
                        </div>
                        <b-collapse id="more_filter">
                            <div>
                                <label>
                                    وضعیت تحصیل:
                                </label>
                                <span style="margin-right: -7px; display: inline">
                                <b-form-checkbox-group plain v-model="filter.people_type"
                                                       :options="choices.people_type">
                                </b-form-checkbox-group>
                            </span>
                            </div>
                            <div>
                                <label>
                                    تعداد قسط پرداخت شده:
                                </label>
                                <span style="margin-right: -7px; display: inline">
                                <b-form-checkbox-group plain v-model="filter.numberOfPayments">
                                    <b-form-checkbox :value="0">بدون پرداخت</b-form-checkbox>
                                    <b-form-checkbox :value="1">قسط اول</b-form-checkbox>
                                    <b-form-checkbox :value="2">دو قسط</b-form-checkbox>
                                    <b-form-checkbox :value="3">سه قسط</b-form-checkbox>
                                </b-form-checkbox-group>
                            </span>
                            </div>
                            <div>
                                <label>
                                    جنسیت:
                                </label>
                                <span style="margin-right: -7px; display: inline">
                                <b-form-checkbox-group plain v-model="filter.gender">
                                    <b-form-checkbox value="مرد">مرد</b-form-checkbox>
                                    <b-form-checkbox value="زن">زن</b-form-checkbox>
                                </b-form-checkbox-group>
                            </span>
                            </div>
                            <div v-if="$parent.program.has_coupling">
                                <label>
                                    متاهلی:
                                </label>
                                <span style="margin-right: -7px; display: inline">
                                <b-form-checkbox-group plain v-model="filter.coupling">
                                    <b-form-checkbox value="بله">بله</b-form-checkbox>
                                    <b-form-checkbox value="خیر">خیر</b-form-checkbox>
                                </b-form-checkbox-group>
                            </span>
                            </div>
                             <div v-if="$parent.program.type==='arbaeen'">
                                <label>
                                    وضعیت گذرنامه:
                                </label>
                                <span style="margin-right: -7px; display: inline">
                                <b-form-checkbox-group plain v-model="filter.passport">
                                    <b-form-checkbox value="دارم">دارم</b-form-checkbox>
                                    <b-form-checkbox value="ندارم">ندارم</b-form-checkbox>
                                </b-form-checkbox-group>
                            </span>
                            </div>
                            <div v-if="$parent.program.type==='arbaeen'">
                                <label>
                                    وضعیت نظام وظیفه:
                                </label>
                                <span style="margin-right: -7px; display: inline">
                                <b-form-checkbox-group plain v-model="filter.conscription"
                                                       :options="choices.conscription">
                                </b-form-checkbox-group>
                            </span>
                            </div>
                            <div>
                                <label>
                                    مقطع:
                                </label>
                                <span style="margin-right: -7px; display: inline">
                                <b-form-checkbox-group plain v-model="filter.level">
                                    <b-form-checkbox value="کارشناسی">کارشناسی</b-form-checkbox>
                                    <b-form-checkbox value="کارشناسی ارشد">کارشناسی ارشد</b-form-checkbox>
                                    <b-form-checkbox value="دکترا">دکترا</b-form-checkbox>
                                </b-form-checkbox-group>
                            </span>
                            </div>
                            <div>
                                <label>
                                    سال ورود:
                                </label>
                                <span style="margin-right: -7px; display: inline">
                                <b-form-checkbox-group plain v-model="filter.year"
                                                       :options="years">
                                </b-form-checkbox-group>
                            </span>
                            </div>
<div v-for="question in $parent.program.questions">
                                <label>
                                    {{question.title}}:
                                </label>
                                <span style="margin-right: -7px; display: inline">
                                <b-form-checkbox-group plain v-model="filter[question.title]">
                                    <b-form-checkbox value="بله">بله</b-form-checkbox>
                                    <b-form-checkbox value="خیر">خیر</b-form-checkbox>
                                </b-form-checkbox-group>
                            </span>
                            </div>

                        </b-collapse>

                    </div>
                    <div>
                        <b-button variant="success" :disabled="fetchStatus==='fetching'" @click="fetchData">
                            <span v-show="fetchStatus!=='fetching'">بارگیری مجدد از سرور</span>
                            <span v-show="fetchStatus==='fetching'">در حال بارگیری</span>
                        </b-button>
                        <b-button variant="secondary" @click="excel">
                            خروجی اکسل از
                            {{filtered.length | pNumber}}
                            مورد در حال نمایش
                        </b-button>

                        <b-button variant="info" v-b-toggle.more_filter>
                           فیلتر بیشتر
                        </b-button>
                    </div>
                </b-col>
                <b-col cols="2">
                    <b-button variant="info" v-b-toggle.show_columns>
                        ستون‌های جدول
                    </b-button>
                    <b-collapse id="show_columns">
                        <b-form-checkbox-group stacked plain v-model="fields" :options="availableFields">
                        </b-form-checkbox-group>
                    </b-collapse>

                </b-col>
            </b-row>
        </div>
        <hr>
        <div class="well">
            <b-table striped hover :items="filtered" :fields="fields" outlined bordered>
                <template slot="اعمال" slot-scope="data">
                    <span>
                        <input type="checkbox" :value="data.item['ردیف']" v-model="selectedIds">
                    </span>
                </template>
                <template slot="HEAD_اعمال" slot-scope="data">
                    <span>
                        <b-button variant="secondary" @click="toggleSelectAll">
                            <span v-show="!allSelected">
                                انتخاب همه
                            </span>
                            <span v-show="allSelected">
                                عدم انتخاب همه
                            </span>
                        </b-button>
                    </span>
                </template>

            </b-table>

        </div>
    </div>

</template>
<script>
    import {HTTP, exportExcel} from '@/utils/index';
    import {mapGetters, mapState} from 'vuex'
    import {flatRegistrations} from '@/utils/specifics'
    import {STATUS_VALUES, PEOPLE_TYPE_VALUES,CONSCRIPTION_VALUES} from '@/utils/choices'

    export default {
        name: 'ManagePanel',

        data() {
            return {
                registrations: [],
                availableFields: ['ردیف', 'نام', 'وضعیت تحصیل', 'وضعیت', 'متاهلی','جنسیت','تعداد قسط','تاریخ ثبت‌نام','وضعیت گذرنامه','وضعیت نظام وظیفه','کد ملی','ایمیل','شماره موبایل','نام پدر','شماره گذرنامه','تاریخ صدور گذرنامه','تاریخ انقضای گذرنامه','شماره دانشجویی','مقطع','سال ورود','تاریخ تولد شمسی','تاریخ تولد میلادی', 'اعمال',..._.map(this.$parent.program.questions,'title')],
                fields: ['ردیف', 'نام', 'وضعیت تحصیل', 'وضعیت', 'اعمال'],
                fetchStatus: 'default',
                selectedIds: [],
                allSelected: false,
                choices: {
                    status: STATUS_VALUES,
                    people_type: PEOPLE_TYPE_VALUES,
                    conscription:CONSCRIPTION_VALUES
                },
                filter: {
                    status: ["قطعی", "منتظر قرعه کشی", "شرکت کرده"],
                    people_type: [...(this.$parent.program.type==='mashhad'?['دانشجو شریف']:[])],
                    gender:['مرد',],
                    coupling:[],
                    passport:[],
                    conscription:[],
                    numberOfPayments:[],
                    level:[],
                    year:[],
                    ..._.reduce(this.$parent.program.questions,(obj,question)=>{
                       obj[question.title]=[]
                    },{})
                }

            }
        },
        created() {
            // this.constructNewRegistration();
            // this.$parent.$on('fetched', this.constructNewRegistration);
            this.fetchData()
        },
        methods: {
            fetchData() {
                this.fetchStatus = 'fetching'
                HTTP.get('manage/' + this.$route.params.program_id + '/registrations/?format=json').then(resp => {
                    this.registrations = flatRegistrations(resp.data,this.$parent.program.questions)
                    this.fetchStatus = 'fetched'
                }).catch(error => {
                    this.fetchStatus = 'error'
                })
            },
            toggleSelectAll() {
                this.selectedIds = [];
                this.allSelected = !this.allSelected
                if (this.allSelected) {
                    for (let r of this.filtered) {
                        this.selectedIds.push(r['ردیف'])
                    }
                }
            },
            excel() {
                exportExcel(this.filtered)
            }
        },
        computed: {
            ...mapGetters(['getUser', 'isAuthenticated', 'isProfileLoaded', 'isProfileCompleted', 'isMarried']),
            years(){
              let year=Number(this.$parent.program.year.toString().slice(-2))
                return [...Array(year+1).keys()].slice(year-4)
            },
            filtered() {
                return _.filter(this.registrations, item => {
                    if (this.filter.status.length > 0) {
                        if (!_.includes(this.filter.status, item['وضعیت'])) {
                            return false;
                        }
                    }
                    if (this.filter.level.length > 0) {
                        if (!_.includes(this.filter.level, item['مقطع'])) {
                            return false;
                        }
                    }
                    if (this.filter.year.length > 0) {
                        if (!_.includes(this.filter.year, item['سال ورود'])) {
                            return false;
                        }
                    }
                    if (this.filter.conscription.length > 0) {
                        if (!_.includes(this.filter.conscription, item['وضعیت نظام وظیفه'])) {
                            return false;
                        }
                    }
                    if (this.filter.numberOfPayments.length > 0) {
                        if (!_.includes(this.filter.numberOfPayments, item['تعداد قسط'])) {
                            return false;
                        }
                    }
                    if (this.filter.coupling.length > 0) {
                        if (!_.includes(this.filter.coupling, item['متاهلی'])) {
                            return false;
                        }
                    }
                    if (this.filter.passport.length > 0) {
                        if (!_.includes(this.filter.passport, item['وضعیت گذرنامه'])) {
                            return false;
                        }
                    }
                    if (this.filter.gender.length > 0) {
                        if (!_.includes(this.filter.gender, item['جنسیت'])) {
                            return false;
                        }
                    }
                    if (this.filter.people_type.length > 0) {
                        if (!_.includes(this.filter.people_type, item['وضعیت تحصیل'])) {
                            return false;
                        }
                    }
                    for(let question of this.$parent.program.questions){
                        if (this.filter[question.title] && this.filter[question.title].length > 0) {
                            if (!_.includes(this.filter[question.title], item[question.title])) {
                                return false;
                            }
                        }
                    }
                    return true
                })
            },
        }
    }
</script>
<style>
    .answer {
        font-weight: bold;
    }

    .question-item {
        font-weight: bold;
    }

    .form-check-label {
        margin-left: 3px;
        padding-right: 5px !important;
    }

    .form-check.form-check-inline {
        margin-left: 0;
        margin-right: 7px;
    }

    .form-check-inline .form-check-input {
        margin-right: 0;
    }
</style>
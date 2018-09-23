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
                                جنسیت:
                            </label>
                            <span style="margin-right: -7px; display: inline">
                                <b-form-checkbox-group plain v-model="filter.gender">
                                    <b-form-checkbox value="مرد">مرد</b-form-checkbox>
                                    <b-form-checkbox value="زن">زن</b-form-checkbox>
                                </b-form-checkbox-group>
                            </span>
                        </div>

                    </div>
                    <div>
                        <b-button variant="success" :disabled="fetchStatus==='fetching'" @click="fetchData">
                            <span v-show="fetchStatus!=='fetching'">بارگیری مجدد از سرور</span>
                            <span v-show="fetchStatus==='fetching'">در حال بارگیری</span>
                        </b-button>
                        <b-button variant="default" @click="excel">
                            خروجی اکسل از
                            {{filtered.length | pNumber}}
                            مورد در حال نمایش
                        </b-button>
                    </div>
                </b-col>
                <b-col cols="2">
                    <h3>
                        ستون‌های جدول
                    </h3>
                    <b-form-checkbox-group stacked plain v-model="fields" :options="availableFields">
                    </b-form-checkbox-group>
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
    import {STATUS_VALUES, PEOPLE_TYPE_VALUES} from '@/utils/choices'

    export default {
        name: 'ManagePanel',

        data() {
            return {
                registrations: [],
                availableFields: ['ردیف', 'نام', 'وضعیت تحصیل', 'وضعیت', 'متاهلی','جنسیت', 'اعمال'],
                fields: ['ردیف', 'نام', 'وضعیت تحصیل', 'وضعیت', 'اعمال'],
                fetchStatus: 'default',
                selectedIds: [],
                allSelected: false,
                choices: {
                    status: STATUS_VALUES,
                    people_type: PEOPLE_TYPE_VALUES
                },
                filter: {
                    status: ["قطعی", "منتظر قرعه کشی", "شرکت کرده"],
                    people_type: [],
                    gender:[]
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
                    this.registrations = flatRegistrations(resp.data)
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
            filtered() {
                return _.filter(this.registrations, item => {
                    if (this.filter.status.length > 0) {
                        if (!_.includes(this.filter.status, item['وضعیت'])) {
                            return false;
                        }
                    }if (this.filter.gender.length > 0) {
                        if (!_.includes(this.filter.gender, item['جنسیت'])) {
                            return false;
                        }
                    }
                    if (this.filter.people_type.length > 0) {
                        if (!_.includes(this.filter.people_type, item['وضعیت تحصیل'])) {
                            return false;
                        }
                    }if (this.filter.people_type.length > 0) {
                        if (!_.includes(this.filter.people_type, item['وضعیت تحصیل'])) {
                            return false;
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
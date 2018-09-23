<template>
    <div dir="rtl">
        <div>
            <b-row>
                <b-col>

                    <div>
                        <b-button variant="success" :disabled="fetchStatus==='fetching'" @click="fetchData">
                            <span v-show="fetchStatus!=='fetching'">بارگیری مجدد از سرور</span>
                            <span v-show="fetchStatus==='fetching'">در حال بارگیری</span>
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
    import {HTTP} from '@/utils/index';
    import {mapGetters, mapState} from 'vuex'
    import {flatRegistrations} from '@/utils/specifics'


    export default {
        name: 'ManagePanel',

        data() {
            return {
                registrations: [],
                availableFields: ['ردیف', 'نام', 'وضعیت تحصیل', 'وضعیت', 'متاهلی', 'اعمال'],
                fields: ['ردیف', 'نام', 'وضعیت تحصیل', 'وضعیت', 'اعمال'],
                fetchStatus: 'default',
                selectedIds: [],
                allSelected: false

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
        },
        computed: {
            ...mapGetters(['getUser', 'isAuthenticated', 'isProfileLoaded', 'isProfileCompleted', 'isMarried']),
            filtered() {
                return _.filter(this.registrations, item => {
                    return item['ردیف'] % 2 === 0
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

</style>
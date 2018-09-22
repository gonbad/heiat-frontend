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
                    <b-form-checkbox-group stacked  plain v-model="fields" :options="availableFields">
                    </b-form-checkbox-group>
                </b-col>
            </b-row>
        </div>
        <div class="well">
            <b-table striped hover :items="registrations"  :fields="fields" outlined bordered>
                <template slot="اعمال" slot-scope="data">
                    <span>
                        چطوری؟
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
                availableFields:['ردیف','نام','وضعیت تحصیل','وضعیت','متاهلی','اعمال'],
                fields:['ردیف','نام','وضعیت تحصیل','وضعیت','اعمال'],
                fetchStatus:'default'

            }
        },
        created() {
            // this.constructNewRegistration();
            // this.$parent.$on('fetched', this.constructNewRegistration);
            this.fetchData()
        },
        methods: {
            fetchData() {
                this.fetchStatus='fetching'
                HTTP.get('manage/' + this.$route.params.program_id+'/registrations/?format=json').then(resp => {
                    this.registrations =flatRegistrations( resp.data)
                    this.fetchStatus='fetched'
                }).catch(error=>{
                    this.fetchStatus='error'
                })
            }
        },
        computed: {
            ...mapGetters(['getUser', 'isAuthenticated', 'isProfileLoaded', 'isProfileCompleted', 'isMarried']),
            //
            // answers: function () {
            //     return _.map(this.$parent.program.users_questions, item => {
            //         let ans = {
            //             title: item.title
            //         };
            //         let found_answer = _.find(this.$parent.program.registration.answers, {'question': item.id})
            //         if (found_answer) {
            //             ans['yes'] = found_answer.yes
            //         } else {
            //             ans['yes'] = false
            //         }
            //         return ans;
            //
            //     })
            // }
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
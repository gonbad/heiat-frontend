<template>
    <div dir="rtl">
        <div class="well">
            <b-table striped hover :items="$parent.program.registrations" :fields="fields" outlined bordered>
                <template slot="people_type" slot-scope="data">
                    <span>
                        {{PEOPLE_TYPE_CHOICES[data.item.profile.people_type]}}
                    </span>
                </template>
                <template slot="status" slot-scope="data">
                    <span>
                        {{STATUS_CHOICES[data.item.status]}}
                    </span>
                </template>
            </b-table>
        </div>
    </div>

</template>
<script>
    import {HTTP} from '@/utils/index';
    import {mapGetters, mapState} from 'vuex'
    import {STATUS_CHOICES,PEOPLE_TYPE_CHOICES} from '@/utils/choices'


    export default {
        name: 'ManagePanel',

        data() {
            return {
                fields: [
                    { key: 'id', label: 'ردیف' },
                    { key: 'profile.name', label: 'نام' },
                    { key: 'people_type', label: 'وضعیت تحصیل' },
                    { key: 'status', label: 'وضعیت' },
                ],
                STATUS_CHOICES:STATUS_CHOICES,
                PEOPLE_TYPE_CHOICES:PEOPLE_TYPE_CHOICES

            }
        },
        created() {
            // this.constructNewRegistration();
            // this.$parent.$on('fetched', this.constructNewRegistration);
        },
        methods: {

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
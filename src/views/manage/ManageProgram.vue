<template>
    <div dir="rtl">
        <div class="well">
            <b-container>
                <b-row>
                    <b-col>

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
    import {PEOPLE_TYPE_KEYS} from '@/utils/choices'

    export default {
        components: {Shift},
        name: 'ManageProgram',

        data() {
            return {
                status: 'default',
                shifts: [],
                keys: PEOPLE_TYPE_KEYS,
                loaded:false
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
                // HTTP.shift('manage/shifts/',{'program':this.$parent.program.id,'text':this.newShift}).then(resp=>{
                //     this.status='saved'
                //     this.newShift=''
                //     this.shifts.unshift(resp.data)
                // })
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
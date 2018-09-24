<template>
    <div dir="rtl">
        <div class="well">
            <b-container>
                <div class="well">
                    <b-table striped hover :items="ordered" :fields="fields" outlined bordered>
                        <template slot="sender" slot-scope="data">
                            <router-link :to="'/program/'+data.item.id">{{data.item.name}}</router-link>
                        </template>
                        <template slot="date" slot-scope="data">
                            <span>
                                {{data.item.message.send_date | moment | jalaliWithTime | pNumber}}
                            </span>
                        </template>
                    </b-table>
                </div>
            </b-container>

        </div>
    </div>

</template>
<script>
    import {HTTP} from '@/utils/index';


    export default {
        name: 'ManageInbox',

        data() {
            return {
                registrations:[],
                fetchStatus:'default',
                fields: [
                    { key: 'sender', label: 'فرستنده' },
                    { key: 'message.text', label: 'متن' },
                    { key: 'date', label: 'تاریخ' },
                ],
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            fetchData() {
                this.fetchStatus = 'fetching'
                HTTP.get('manage/' + this.$route.params.program_id + '/last_messages/?format=json').then(resp => {
                    this.registrations = resp.data
                    this.fetchStatus = 'fetched'
                }).catch(error => {
                    this.fetchStatus = 'error'
                })
            },
        },
        computed: {
            ordered(){
                return _.orderBy(this.registrations,'message.send_date','asc')
            }
        }
    }
</script>
<style>
</style>
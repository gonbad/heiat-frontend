<template>
    <div class="container">
        <div class="well">
            <b-table striped hover :items="$parent.program.registration.payments" :fields="fields" outlined bordered>
                <template slot="time" slot-scope="data">
                    {{data.item.takingDate | moment | jalaliWithTime | pNumber}}
                </template>
                <template slot="status" slot-scope="data">
                    {{data.item.success?'موفق':'ناموفق'}}
                </template>
            </b-table>
        </div>

    </div>
</template>

<script>
    import {HTTP} from '@/utils'
    import _ from 'lodash'

    export default {
        name: 'Home',
        data() {
            return {
                programs: [],
                fields: [
                    { key: 'time', label: 'زمان تراکنش' },
                    { key: 'amount', label: 'مبلغ به تومان' },
                    { key: 'refId', label: 'شناسه مرجع' },
                    { key: 'saleRefId', label: 'رسید دیجیتال' },
                    { key: 'status', label: 'وضعیت' },
                ],
            }
        },
        created() {
            this.fetchData()
        },

        watch: {
            '$route': 'fetchData'
        },

        methods: {
            fetchData() {
                HTTP.get('programs/?format=json')
                    .then((resp) => {
                        this.programs = resp.data;
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        }
    }
</script>

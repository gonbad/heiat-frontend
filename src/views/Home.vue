<template>
    <div class="container">
        <div class="well">
            <b-table striped hover :items="programs" :fields="fields" outlined bordered>
                <template slot="title_id" slot-scope="data">
                    <router-link :to="'/program/'+data.item.id">{{data.item.title}}</router-link>
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
                    { key: 'title_id', label: 'عنوان برنامه' },
                    { key: 'program_interval', label: 'زمان برنامه' },
                    { key: 'register_interval', label: 'زمان ثبت‌نام' },
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

<template>
    <div class="container">
        <div class="well">
            <b-table striped hover :items="managements" :fields="fields" outlined bordered>
                <template slot="title_id" slot-scope="data">
                    <router-link :to="'/manage/'+data.item.program.id">{{data.item.program.title}}</router-link>
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
                managements: [],
                fields: [
                    { key: 'title_id', label: 'عنوان برنامه' },
                    { key: 'role', label: 'مسئولیت' },
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
                HTTP.get('managements/?format=json')
                    .then((resp) => {
                        this.managements = resp.data;
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        }
    }
</script>

<template>
    <b-container fluid>
        <div class="well">
            <b-table striped hover :items="managements" :fields="fields" outlined bordered>
                <template slot="title_id" slot-scope="data">
                    <router-link :to="{name:'Manage.Panel',params:{program_id:data.item.program.id}}">
                        {{data.item.program.title}}
                    </router-link>
                </template>
            </b-table>
        </div>

    </b-container>
</template>

<script>
    import {HTTP} from '@/utils'

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

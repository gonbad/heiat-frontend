<template>
    <b-container>
        <div class="well">
            <b-table striped hover :items="managements" :fields="fields" outlined bordered>
                <template v-slot:cell(title_id)="data">
                    <a :href="'/manage/' + data.item.program.id">{{data.item.program.title}}</a>
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
                    {key: 'title_id', label: 'عنوان برنامه'},
                    {key: 'role', label: 'مسئولیت'},
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
                        console.log(resp.data);
                        this.managements = resp.data;
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        }
    }
</script>

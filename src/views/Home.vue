<template>
    <div class="container">
        <div class="well">

            <b-table striped hover :items="programs" :fields="fields" outlined bordered>
                <template v-slot:cell(title)="data">
                    <span v-html="data.value"/>
                </template>
                <template v-slot:cell(status)="data">
                    <span v-html="data.value"/>
                </template>
            </b-table>
        </div>

    </div>
</template>

<script>
    import {HTTP} from '@/utils'
    import Vue from 'vue'
    import {BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'

    Vue.use(BootstrapVue);
    Vue.use(BootstrapVueIcons);


    export default {
        name: 'Home',
        data() {
            return {
                programs: [],
                fields: [
                    {key: 'title', label: 'عنوان برنامه'},
                    {key: 'program_interval', label: 'زمان برنامه'},
                    {key: 'register_interval', label: 'زمان ثبت‌نام'},
                    {key: 'status', label: 'وضعیت'},
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
                        let programs = resp.data;
                        programs.map(program => {
                            program.title = `<a href="/program/${program.id}">${program.title}</a>`;
                            if (program.status != null)
                                program.status += `&nbsp;<a href="/help/status"><sub>(راهنما)</sub></a>`;
                            return program
                        });
                        this.programs = programs;
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        }
    }
</script>

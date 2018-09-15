<template>
    <div dir="rtl">
        <b-row>
            <b-col>
                <h1>
                    اطلاعیه‌ها
                </h1>
                <b-card v-for="post in $parent.program.posts" :footer="post.post_date | moment | jalaliWithTime | pNumber">
                    <div v-html="post.text"></div>
                </b-card>
            </b-col>
            <b-col>

            </b-col>
        </b-row>
    </div>
</template>
<script>
    import {HTTP} from '../utils/index';

    export default {
        name: 'ProgramMain',

        data() {
            return {}
        },
        methods: {}
    }
</script>
<style>

</style>
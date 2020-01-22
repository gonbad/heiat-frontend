<template>
    <b-container fluid>
        <div class="well">
            <b-container>
                <wysiwyg v-model="newPost"/>
                <b-button @click="save" variant="success" :disabled="status==='sending' || !newPost">
                    <span v-show="status==='default'">ثبت اطلاعیه جدید</span>
                    <span v-show="status==='sending'">در حال ارسال</span>
                    <span v-show="status==='saved'">ذخیره شد</span>
                </b-button>
                <hr>
                <div v-for="post in posts">
                    <post :post="post"></post>
                    <hr>
                </div>
            </b-container>

        </div>
    </b-container>

</template>
<script>
    import {HTTP} from '@/utils/index';
    import Post from "../../components/Post";


    export default {
        components: {Post},
        name: 'ManagePosts',

        data() {
            return {
                newPost: '',
                status: 'default',
                posts:[]
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            fetchData(){
                HTTP.get('manage/' + this.$route.params.program_id + '/posts/?format=json').then(resp => {
                    this.posts = resp.data
                }).catch(error => {
                })
            },
            save() {
                this.status='sending'
                HTTP.post('manage/posts/',{'program':this.$parent.program.id,'text':this.newPost}).then(resp=>{
                    this.status='saved'
                    this.newPost=''
                    this.posts.unshift(resp.data)
                })
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
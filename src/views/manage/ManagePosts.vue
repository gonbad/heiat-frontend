<template>
    <div dir="rtl">
        <div class="well">
            <b-container>
                <wysiwyg v-model="newPost"/>
                <b-button @click="save" variant="primary" :disabled="status==='sending' || !newPost">
                    <span v-show="status==='default'">ثبت اطلاعیه جدید</span>
                    <span v-show="status==='sending'">در حال ارسال</span>
                    <span v-show="status==='saved'">ذخیره شد</span>
                </b-button>
            </b-container>

        </div>
    </div>

</template>
<script>
    import {HTTP} from '@/utils/index';


    export default {
        name: 'ManagePosts',

        data() {
            return {
                newPost: '',
                status: 'default'
            }
        },
        created() {
            // this.constructNewRegistration();
            // this.$parent.$on('fetched', this.constructNewRegistration);
        },
        methods: {
            save() {
                this.status='sending'
                HTTP.post('manage/posts/',{'program':this.$parent.program.id,'text':this.newPost}).then(resp=>{
                    this.status='saved'
                    this.newPost=''
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
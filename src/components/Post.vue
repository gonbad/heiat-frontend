<template>
    <div>
        <div v-if="!deleted">

            <wysiwyg v-model="post.text"/>
            <b-button @click="save" variant="primary" :disabled="status==='sending' || !post.text">
                <span v-show="status==='default'">ویرایش</span>
                <span v-show="status==='sending'">در حال ارسال</span>
                <span v-show="status==='saved'">ذخیره شد</span>
            </b-button>
            <b-button @click="deletePost" variant="danger">
                حذف اطلاعیه
            </b-button>
        </div>
    </div>
</template>

<script>
    import {HTTP} from '@/utils'

    export default {
        name: 'Post',
        data() {
            return {
                deleted: false,
                status: 'default'
            }
        },
        props: {
            post: {}
        },
        methods:{
            save(){
                this.status='sending'
                HTTP.patch('manage/posts/'+this.post.id+'/',this.post).then(resp=>{
                    this.status='saved'
                })
            },
            deletePost(){
                HTTP.delete('manage/posts/'+this.post.id+'/delete/').then(resp=>{
                    this.deleted=true
                })
            }
        }
    }
</script>
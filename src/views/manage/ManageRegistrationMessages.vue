<template>
    <div dir="rtl" class="container">
<messages :messages="messages"></messages>
        <div >
                                <textarea v-model="newMessageText" style="width: 100%">

                                </textarea>
            <b-button @click="send" variant="primary" :disabled="status==='sending' || newMessageText===''">
                <span v-show="status!=='sending'">ارسال</span>
                <span v-show="status==='sending'">در حال ارسال</span>
            </b-button>
            <label>
                ارسال پیامک
            </label>
            <input type="checkbox" v-model="send_sms"/>
            <label>
                تعداد حرف:
            </label>
            <span>
                {{newMessageText.length | pNumber}}
            </span>
        </div>
    </div>

</template>
<script>
    import {HTTP} from '@/utils/index';
    import Messages from "../../components/Messages";


    export default {
        components: {Messages},
        data() {
            return {
                messages:[],
                newMessageText:'',
                send_sms:false,
                status:'default'
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            send(){
                this.status='sending';
                HTTP.post('manage_registration/'+this.$route.params.registration_id+'/new_message/', {text:this.newMessageText,to_user:true,send_sms:this.send_sms}).then(resp => {
                    this.$parent.registration.messages.push(resp.data);
                    this.status='default'
                    this.newMessageText=''
                }).catch(error => {
                    this.status = 'error'
                })
            },
            fetchData(){
                HTTP.get('manage_registration/'+this.$route.params.registration_id+'/messages').then(resp => {
                    this.messages=resp.data
                })
            }
        },
        computed: {
        }
    }
</script>
<style>
</style>
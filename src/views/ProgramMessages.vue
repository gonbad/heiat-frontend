<template>
    <div class="container">
        <h3 class=" text-center">جعبه پیام‌ها</h3>
        <messages :messages="$parent.program.registration.messages"/>
        <div>
                                <textarea v-model="newMessageText" style="width: 100%">

                                </textarea>
            <b-button :disabled="status==='sending' || newMessageText===''" @click="send" variant="success">
                <span v-show="status!=='sending'">ارسال</span>
                <span v-show="status==='sending'">در حال ارسال</span>
            </b-button>
        </div>
    </div>
</template>

<script>
    import {HTTP} from '@/utils'
    import Messages from "../components/Messages";

    export default {
        components: {Messages},
        name: 'ProgramMessages',
        data() {
            return {
                image: require('@/assets/logo.png'),
                newMessageText: '',
                status: 'default'
            }
        },
        methods: {
            send() {
                this.status = 'sending';
                HTTP.post('registration/message/', {
                    registration: this.$parent.program.registration.id,
                    text: this.newMessageText,
                    to_user: false
                }).then(resp => {
                    this.$parent.program.registration.messages.push(resp.data);
                    this.status = 'default'
                    this.newMessageText = ''
                }).catch(error => {
                    this.status = 'error'
                })
            }
        }
    }
</script>

<template>
    <div class="messaging">
        <div class="inbox_msg">
            <div class="mesgs">
                <div class="msg_history">

                    <div :class="{'incoming_msg':message.to_user,'outgoing_msg':!message.to_user}"
                         v-for="message in messages">
                        <div class="incoming_msg_img" v-if="message.to_user"><img
                                :src="image" alt="مدیر برنامه"></div>
                        <div :class="{'received_msg':message.to_user,'sent_msg':!message.to_user}">
                            <div :class="{'received_withd_msg':message.to_user}">
                                <p v-html="$options.filters.newLine(message.text)"></p>
                                <span class="time_date">{{message.send_date | moment | jalaliWithTime | pNumber}}
                                        <b-badge v-if="message.send_sms">SMS</b-badge>
                                        </span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Messages',
        data() {
            return {
                image: require('@/assets/logo.png'),

            }
        },
        props: {
            messages: Array
        }
    }
</script>
<style>
    img {
        max-width: 100%;
    }

    .inbox_msg {
        border: 1px solid #c4c4c4;
        clear: both;
        overflow: hidden;
    }


    .recent_heading h4 {
        color: #28a745;
        font-size: 21px;
        margin: auto;
    }

    .srch_bar input {
        border: 1px solid #cdcdcd;
        border-width: 0 0 1px 0;
        width: 80%;
        padding: 2px 0 4px 6px;
        background: none;
    }

    .srch_bar .input-group-addon button {
        background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
        border: medium none;
        padding: 0;
        color: #707070;
        font-size: 18px;
    }

    .srch_bar .input-group-addon {
        margin: 0 0 0 -27px;
    }

    .chat_ib h5 {
        font-size: 15px;
        color: #464646;
        margin: 0 0 8px 0;
    }

    .chat_ib h5 span {
        font-size: 13px;
        float: right;
    }

    .chat_ib p {
        font-size: 14px;
        color: #989898;
        margin: auto
    }


    .incoming_msg_img {
        display: inline-block;
        width: 4%;
    }

    .received_msg {
        display: inline-block;
        padding: 0 0 0 10px;
        vertical-align: top;
        width: 92%;
    }

    .received_withd_msg p {
        background: #ebebeb none repeat scroll 0 0;
        border-radius: 3px;
        color: #646464;
        font-size: 14px;
        margin: 0;
        padding: 5px 10px 5px 12px;
        width: 100%;
    }

    .time_date {
        color: #747474;
        display: block;
        font-size: 12px;
        margin: 8px 0 0;
    }

    .received_withd_msg {
        max-width: 57%;
        width: fit-content;
    }

    .mesgs {
        padding: 30px 15px 0 25px;
    }

    .sent_msg p {
        background: #28a745 none repeat scroll 0 0;
        border-radius: 3px;
        font-size: 14px;
        margin: 0;
        color: black;
        padding: 5px 10px 5px 12px;
        width: 100%;
    }

    .outgoing_msg {
        overflow: hidden;
        margin: 26px 0 26px;
    }

    .sent_msg {
        float: left;
        max-width: 46%;
    }

    .input_msg_write input {
        background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
        border: medium none;
        color: #4c4c4c;
        font-size: 15px;
        min-height: 48px;
        width: 100%;
    }

    .type_msg {
        border-top: 1px solid #c4c4c4;
        position: relative;
    }

</style>
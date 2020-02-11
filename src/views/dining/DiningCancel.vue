<template>
    <div>
        <br>
        <b-container>
            <b-form @submit="onSubmit">
                <b-button :disabled="status==='sending'" type="submit" variant="success">
                    <span v-show="status==='default'">لغو وعده غذایی</span>
                    <span v-show="status==='sending'">در حال انجام</span>
                    <span v-show="status==='canceled'">لغو شد</span>
                    <span v-show="status==='error'">با خطا مواجه شد</span>
                </b-button>
            </b-form>

        </b-container>
    </div>

</template>

<style>

</style>

<script>
    import {HTTP} from '@/utils'


    export default {
        name: 'DiningCancel',
        data() {
            return {
                status: 'default',
            }
        },
        methods: {
            onSubmit: function (e) {
                e.preventDefault();
                this.status = 'sending';
                HTTP.post('/dining/cancel/' + this.$route.params.meal_id + "/").then(resp => {
                    this.status = 'canceled'
                }).catch(error => {
                    if (error.response) {
                        this.status = 'error'
                    }
                })
            }
        },
    }
</script>

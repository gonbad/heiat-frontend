<template>
    <div class="container">
        <b-form @submit="onSubmit" v-if="status!=='success'">
            <h2 v-if="fixed">
                {{fix_expense_name}}
            </h2>
            <b-form-group v-if="!fixed" label="مورد مصرف:">
                <b-form-select v-model="expense_id" :options="expenses"/>
            </b-form-group>
            <b-form-group label="مبلغ:">
                <b-form-input type="number"
                              v-model="amount"
                              required
                              placeholder="مبلغ به تومان">
                </b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary" :disabled="status==='sending' || !expense_id || !amount">
                <span v-show="status!=='sending'">پرداخت</span>
                <span v-show="status==='sending'">در حال انجام</span>
            </b-button>
        </b-form>
        <form ref="hiddenForm" action="https://bpm.shaparak.ir/pgwchannel/startpay.mellat" method="POST">
            <input ref="refref" type="hidden" name="RefId" :value="refId">
            <input type="submit" value="go" style="display: none;">
        </form>
    </div>
</template>

<script>
    import {HTTP, formToJson} from '@/utils'
    import _ from 'lodash'

    export default {
        name: 'Home',
        data() {
            return {
                expenses: [],
                expense_id: null,
                fixed: false,
                fix_expense_name: '',
                amount: '',
                status: 'default',
                refId: ''
            }
        },
        created() {
            if (this.$route.params.expense_id) {
                this.expense_id = this.$route.params.expense_id
                this.fixed = true
            }
            this.fetchData()
        },

        methods: {
            fetchData() {
                HTTP.get('expenses?format=json')
                    .then((resp) => {
                        this.expenses = _.mapValues(_.keyBy(resp.data, 'id'), 'expense_name')
                        console.log(JSON.stringify(this.expenses))
                        if (this.fixed) {
                            this.fix_expense_name = this.expenses[this.expense_id]
                            if (!this.fix_expense_name) {
                                this.fixed = false
                                this.expense_id = null
                            }
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            onSubmit: function (e) {
                e.preventDefault();
                this.status = 'sending';
                HTTP.post('terminal/start/', {'amount': this.amount, 'expense_id': this.expense_id}).then(resp => {
                    console.log(resp.data);
                    this.refId = resp.data
                    this.$refs.refref.value = resp.data
                    console.log(formToJson(this.$refs.hiddenForm))
                    this.$refs.hiddenForm.submit();
                })
            },
        }
    }
</script>

<template>
  <div class="container">
    <b-card>
        <div v-if="!!fixedExpense">
            <div v-show="fixedExpense.image_url">
                <img :src="fixedExpense.image_url">
            </div>
            <h2>{{fixedExpense.expense_name}}</h2>
        </div>
      <b-form @submit="onSubmit" v-if="status!=='success'">
        <b-form-group label="مورد مصرف:" v-if="!fixedExpense">
          <b-form-select :options="expenses" value-field="id"
      text-field="expense_name" v-model="chosenEspenseId" ></b-form-select>
        </b-form-group>
        <b-form-group label="مبلغ:">
          <b-form-input placeholder="مبلغ به تومان" required type="number" v-model="amount"></b-form-input>
        </b-form-group>
        <b-form-group label="نام و نام خانوادگی (اختیاری):">
          <b-form-input type="text" v-model="optional_name"></b-form-input>
        </b-form-group>
        <b-form-group label="شمارهٔ تلفن (اختیاری):">
          <b-form-input type="number" v-model="optional_mobile"></b-form-input>
        </b-form-group>

        <b-button
          :disabled="status==='sending' || (!chosenEspenseId && !fixedExpense )|| !amount"
          type="submit"
          variant="success"
        >
          <span v-show="status!=='sending'">پرداخت</span>
          <span v-show="status==='sending'">در حال انجام</span>
        </b-button>
      </b-form>
      <form
        action="https://bpm.shaparak.ir/pgwchannel/startpay.mellat"
        method="POST"
        ref="hiddenForm"
      >
        <input :value="refId" name="RefId" ref="refref" type="hidden" />
        <input style="display: none;" type="submit" value="go" />
      </form>
    </b-card>
  </div>
</template>

<script>
import { HTTP } from "@/utils";
import _ from "lodash";

export default {
  name: "Home",
  data() {
    return {
      expenses: [],
      chosenEspenseId:null,
      amount: "",
      optional_name: "",
      optional_mobile: "",
      status: "default",
      refId: ""
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    fixedExpense() {
      if (this.$route.params.expense_id) {
        return _.find(this.expenses, { "id": Number(this.$route.params.expense_id) });
      }
      if (this.$route.params.expense_address) {
        return _.find(this.expenses, {
          "address": this.$route.params.expense_address
        });
      }
      return null;
    }
  },
  methods: {
    fetchData() {
      HTTP.get("expenses?format=json")
        .then(resp => {
            this.expenses = resp.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    onSubmit: function(e) {
      e.preventDefault();
      this.status = "sending";
      HTTP.post("pay/terminal/start/", {
        amount: this.amount,
        expense_id: this.fixedExpense?this.fixedExpense.id:this.chosenEspenseId,
        optional_name: this.optional_name,
        optional_mobile: this.optional_mobile
      }).then(resp => {
        this.refId = resp.data;
        this.$refs.refref.value = resp.data;
        this.$refs.hiddenForm.submit();
      });
    }
  }
};
</script>

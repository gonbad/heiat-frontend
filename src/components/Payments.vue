<template>
  <div class="container">
    <div class="well">
      <b-table striped hover :items="payments" :fields="fields" outlined bordered>
        <template slot="time" slot-scope="data">
          {{data.item.takingDate | moment | jalaliWithTime | pNumber}}
        </template>
        <template slot="status" slot-scope="data">
          {{data.item.success?'موفق':'ناموفق'}}
        </template>
      </b-table>
    </div>

  </div>

</template>

<script>
export default {
  name: 'Payments',
    data() {
        return {
            fields: [
                { key: 'time', label: 'زمان تراکنش' },
                { key: 'amount', label: 'مبلغ به تومان' },
                { key: 'refId', label: 'شناسه مرجع' },
                { key: 'saleRefId', label: 'رسید دیجیتال' },
                { key: 'status', label: 'وضعیت' },
            ],
        }
    },
  props: {
    payments: Array
  }
}
</script>
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import "./filters"
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-v4-rtl/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-v4-rtl/dist/css/bootstrap-rtl.css'
import './assets/IRANSans5/WebFonts/css/style.css'
import 'font-awesome/css/font-awesome.css';
import './omid.css';
// import PDatePicker from 'vue2-persian-datepicker'
// import vSelect from 'vue-select'

Vue.use(BootstrapVue);
// Vue.component('pdatepicker', PDatePicker)
// Vue.component('v-select', vSelect)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

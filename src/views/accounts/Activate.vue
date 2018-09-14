<template>
    <div>
        <b-container>
       <div class="success" v-if="status==='success'">
           فعال‌سازی با موفقیت انجام شد. اکنون می‌توانید
           <router-link :to="{name:'Login'}">
               وارد شوید
           </router-link>
           <p>
               لطفا به محض ورود با کلیک روی نام خود در منوی بالای صفحه و ورود به صفحه
               <router-link to="/profile">
                   ویرایش پروفایل
               </router-link>
               ، اطلاعات خود را تکمیل نمایید.
           </p>
       </div>
        <div class="error" v-if="status==='error'">
            فعال‌سازی با خطا مواجه شد:
            <p>
                {{error}}
            </p>
        </div>
        </b-container>
    </div>
</template>

<style>

</style>

<script>
    import {HTTP} from "../../utils/index";

    export default {
        name: 'Profile',
        data() {
            return {
                status: 'default',
                error: ''
            }
        },
        created() {
            HTTP.post('auth/users/confirm/', {
                'uid': this.$route.params.uid,
                'token': this.$route.params.token
            }).then(resp => {
                this.status = 'success'
            }).catch(error => {
                this.status = 'error'
                this.error = error.response.data.detail
            })
        },
    }
</script>

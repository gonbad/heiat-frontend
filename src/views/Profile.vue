/**
* Created by vouill on 11/13/17.
*/

<template>
    <div>
        <b-nav fill tabs>
            <b-nav-item :to="{name:'Profile.User'}">ویرایش اطلاعات اولیه</b-nav-item>
            <b-nav-item :to="{name:'Profile.Base'}" exact>اطلاعات اصلی</b-nav-item>
            <b-nav-item :to="{name:'Profile.Passport'}">اطلاعات نظام وظیفه و گذرنامه</b-nav-item>
            <b-nav-item :to="{name:'Profile.ChangePassword'}">تغییر گذرواژه</b-nav-item>
        </b-nav>
        <router-view></router-view>
    </div>
</template>

<style>

</style>

<script>
    import {AUTH_REQUEST} from '@/modules/constants'
    export default {
        name: 'Profile',
        data () {
            return {
                user:JSON.parse( JSON.stringify( this.$store.getters.getUser ))
            }
        },
        created(){
            this.$store.watch((state, getters) => getters.getUser, () => {
                console.log('watch'+JSON.stringify(this.$store.getters.getUser));
                this.user=JSON.parse( JSON.stringify( this.$store.getters.getUser ))
            })
        },
    }
</script>

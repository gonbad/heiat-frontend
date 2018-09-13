/**
* Created by vouill on 11/13/17.
*/

<template>
    <div>
        <label>
        </label>
        <input type="text" v-model="$parent.user.email"/>
        <button @click="update">ذخیره</button>

    </div>

</template>

<style>

</style>

<script>
    import {AUTH_REQUEST} from '@/modules/constants'
    import {formToJson} from '@/utils'

    export default {
        name: 'ProfileUser',
        data() {
            return {
                // edited: this.$store.getters.getProfile || {},
                // bo:'ff'
            }
        },
        // created(){
        //     this.$store.watch((state, getters) => getters.getProfile, () => {
        //         this.edited=this.$store.getters.getProfile
        //     })
        // },
        // computed: {
        //     user: {
        //         get() {
        //             return this.$store.getters.getProfile
        //         },
        //         set(value) {
        //             this.edited = value;
        //             console.log(value)
        //         }
        //     }
        // },
        methods: {
            update: function (e) {
                console.log(this.$parent.user);
                e.preventDefault();
            }, forms: function (e) {
                e.preventDefault();
                console.log(formToJson(e.target))
            }
        },
    }
</script>

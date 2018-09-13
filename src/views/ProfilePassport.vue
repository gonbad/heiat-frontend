/**
* Created by vouill on 11/13/17.
*/

<template>
    <div>
       p
    </div>
</template>

<style>

</style>

<script>
    import {AUTH_REQUEST} from '@/utils/constants'

    export default {
        name: 'Profile',
        data () {
            return {
                username: '4900152234',
                password: '2rooohet',
            }
        },
        methods: {
            login: function () {
                const { username, password } = this
                this.$store.dispatch(AUTH_REQUEST, { username, password }).then(() => {
                    this.$router.push('/')
                })
            }
        },
    }
</script>

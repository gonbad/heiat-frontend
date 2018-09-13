/**
* Created by vouill on 11/13/17.
*/

<template>
    <div>
        <br>
        <b-container>
            <b-form @submit="onSubmit">
                <b-form-group id="exampleInputGroup1"
                              label="ایمیل:"
                              label-for="exampleInput1">
                    <b-form-input id="exampleInput1"
                                  type="email"
                                  v-model="$parent.user.email"
                                  required
                                  placeholder="Enter email">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="exampleInputGroup2"
                              label="نام:"
                              label-for="exampleInput2">
                    <b-form-input id="exampleInput2"
                                  type="text"
                                  v-model="$parent.user.first_name"
                                  required
                                  placeholder="Enter name">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="exampleInputGroup3"
                              label="نام خانوادگی:"
                              label-for="exampleInput3">
                    <b-form-input id="exampleInput3"
                                  type="text"
                                  v-model="$parent.user.last_name"
                                  required
                                  placeholder="Enter name">
                    </b-form-input>
                </b-form-group>
                <b-button type="submit" variant="primary" :disabled="status==='sending'">
                    <span v-show="status==='default'">ذخیره</span>
                    <span v-show="status==='sending'">در حال ارسال</span>
                    <span v-show="status==='saved'">ذخیره شد</span>
                </b-button>
            </b-form>
        </b-container>
    </div>

</template>

<style>

</style>

<script>
    import {USER_SUCCESS} from '@/modules/constants'
    import {formToJson, HTTP} from '@/utils'

    export default {
        name: 'ProfileUser',
        data() {
            return {
                status:'default'
            }
        },
        methods: {
            onSubmit: function (e) {
                e.preventDefault();
                this.status='sending';
                HTTP.patch('auth/users/me/', this.$parent.user).then(resp => {
                    console.log(resp.data);
                    this.$store.commit(USER_SUCCESS, resp.data);
                    this.status='saved'
                })
            }
        },
    }
</script>

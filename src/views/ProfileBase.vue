/**
* Created by vouill on 11/13/17.
*/

<template>
    <div>
        <br>
        <b-container>
            <b-form @submit="onSubmit">
                <b-form-group id="exampleInputGroup1"
                              label="نام پدر:"
                              label-for="exampleInput1">
                    <b-form-input id="exampleInput1"
                                  type="text"
                                  v-model="$parent.user.profile.father_name"
                                  placeholder="نام پدر خود را وارد کنید">
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
    import {PROFILE_SUCCESS} from '@/modules/constants'
    import {formToJson, HTTP} from '@/utils'

    export default {
        name: 'ProfileBase',
        data() {
            return {
                status:'default'
            }
        },
        methods: {
            onSubmit: function (e) {
                e.preventDefault();
                this.status='sending';
                HTTP.patch('accounts/profile/', this.$parent.user.profile).then(resp => {
                    console.log(resp.data);
                    this.$store.commit(PROFILE_SUCCESS, resp.data);
                    this.status='saved'
                })
            }
        },
    }
</script>

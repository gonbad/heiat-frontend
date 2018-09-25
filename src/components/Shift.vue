<template>
    <tr>
        <td>
            {{label}}
        </td>

        <td>
            <input type="number" v-model="num"/>
        </td>
        <td>
            <b-button @click="save" variant="primary" :disabled="status==='sending'">
                <span v-show="status==='default'">اعمال</span>
                <span v-show="status==='sending'">در حال ارسال</span>
                <span v-show="status==='saved'">ذخیره شد</span>
            </b-button>
        </td>


    </tr>
</template>

<script>
    import {HTTP} from '@/utils'
    import {PEOPLE_TYPE_CHOICES} from '@/utils/choices'

    export default {
        name: 'Shift',
        data() {
            let label = PEOPLE_TYPE_CHOICES[this.peopleType]
            let shiftObj = _.find(this.shifts, {'people_type': this.peopleType})
            let num = shiftObj ? shiftObj.shift : 0
            return {
                status: 'default',
                label: label,
                num: num
            }
        },
        props: {
            peopleType: String,
            shifts: Array,
            program: Number
        },
        methods: {
            save() {
                this.status = 'sending'
                HTTP.post('manage/' + this.$route.params.program_id + '/shift_price/', {people_type:this.peopleType,shift:this.num}).then(resp=>{
                    this.status = 'saved'
                })
            }
        }
    }
</script>
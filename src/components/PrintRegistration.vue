<template>
   <div>
       <div v-for="kv in flat">
           <label>
               {{kv.key}}
               :
           </label>
           <span>
               {{kv.value}}
           </span>
       </div>
   </div>
</template>

<script>
    import {flatRegistration} from '@/utils/specifics'
    export default {
        name: 'PrintRegistration',
        data() {
            return {
                image: require('@/assets/logo.png'),

            }
        },
        props: {
            registration: {},
            questions: Array
        },
        computed:{
            flat(){
                let obj=flatRegistration(this.registration,this.questions)
                let arr=_.map(obj,(value,key)=>{
                    return{
                        key:key,
                        value:value
                    }
                })
             return arr
            }
        }
    }
</script>
<style>
    label{
        font-weight: bold;
    }
</style>
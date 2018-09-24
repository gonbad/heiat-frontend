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
                console.log(JSON.stringify(this.questions))
                let obj=flatRegistration(this.registration,this.questions)
                console.log(JSON.stringify(obj))
                let arr=_.map(obj,(value,key)=>{
                    console.log(key+'-'+value)
                    return{
                        key:key,
                        value:value
                    }
                })
                console.log(arr)
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
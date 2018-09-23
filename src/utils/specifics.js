import {STATUS_CHOICES, PEOPLE_TYPE_CHOICES} from '@/utils/choices'
import _ from 'lodash'
export  function flatRegistration(raw){
    let ans=[]
    ans['ردیف']=raw.id
    ans['نام']=raw.profile.name
    ans['وضعیت تحصیل']=PEOPLE_TYPE_CHOICES[raw.profile.people_type]
    ans['متاهلی']=raw.coupling?'بله':'خیر'
    ans['جنسیت']=raw.profile.gender?'مرد':'زن'
    ans['وضعیت']=STATUS_CHOICES[raw.status]
    return ans;
}
export function flatRegistrations(list){
    return _.map(list,flatRegistration)
}
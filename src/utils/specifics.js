import {STATUS_CHOICES, PEOPLE_TYPE_CHOICES} from '@/utils/choices'
import _ from 'lodash'
export  function flatRegistration(raw,questions=[]){
    let ans=[]
    ans['ردیف']=raw.id
    ans['نام']=raw.profile.name
    ans['تعداد قسط']=raw.numberOfPayments
    ans['وضعیت تحصیل']=PEOPLE_TYPE_CHOICES[raw.profile.people_type]
    ans['متاهلی']=raw.coupling?'بله':'خیر'
    ans['جنسیت']=raw.profile.gender?'مرد':'زن'
    ans['وضعیت']=STATUS_CHOICES[raw.status]
    for(let question of questions){
        let yes=false;
        let found_answer = _.find(raw.answers, {'question': question.id})
        if (found_answer) {
            yes = found_answer.yes
        }
        ans[question.title]=yes?'بله':'خیر'
    }
    return ans;
}
export function flatRegistrations(list,questions=[]){
    return _.map(list,item => {return flatRegistration(item,questions)})
}
import {STATUS_CHOICES, PEOPLE_TYPE_CHOICES,CONSCRIPTION_CHOICES} from '@/utils/choices'
import _ from 'lodash'
import moment from 'moment-jalaali'
export  function flatRegistration(raw,questions=[]){
    let ans={}
    ans['ردیف']=raw.id
    ans['نام']=raw.profile.user.name
    ans['کد ملی']=raw.profile.user.username
    ans['ایمیل']=raw.profile.user.email
    ans['وضعیت گذرنامه']=raw.profile.passport_status
    ans['وضعیت نظام وظیفه']=CONSCRIPTION_CHOICES[raw.profile.conscription]
    ans['شماره گذرنامه']=raw.profile.passport_number
    ans['تاریخ صدور گذرنامه']=raw.profile.passport_date_of_issue
    ans['تاریخ انقضای گذرنامه']=raw.profile.passport_date_of_expiry
    ans['شماره موبایل']=raw.profile.mobile
    ans['نام پدر']=raw.profile.father_name
    ans['تاریخ تولد میلادی']=raw.profile.birth_date
    ans['تاریخ تولد شمسی']=raw.profile.birth_date?moment(raw.profile.birth_date).format('jYYYY/jM/jD'):null
    ans['تاریخ ثبت‌نام']=moment(raw.registrationDate).format('jYYYY/jM/jD-HH:mm')
    ans['شماره دانشجویی']=raw.profile.student_number
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
    let level='نامشخص'
    let year='نامشخص'
    if(raw.profile.student_number){
        let num=Number(raw.profile.student_number.toString().charAt(2))
        if(num===1){
            level='کارشناسی'
        }
        else if(num===2 || num===7){
            level='کارشناسی ارشد'
        }
        else if(num===3){
            level='دکترا'
        }
        year=Number(raw.profile.student_number.toString().substring(0,2))
    }

    ans['مقطع']=level
    ans['سال ورود']=year
    return ans;
}
export function flatRegistrations(list,questions=[]){
    return _.map(list,item => {return flatRegistration(item,questions)})
}
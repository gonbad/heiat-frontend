import _ from 'lodash'

export const CONSCRIPTION_CHOICES = {
    "army": "نظامی",
    "respite": "مهلت قانونی معرفی",
    "without_condition": "غیر مشمول",
    "went": "دارای کارت پایان خدمت",
    "educational exempt": "معافیت تحصیلی",
    "exempt": "معافیت دایم ",
    "other": "سایر"
}
export const PEOPLE_TYPE_CHOICES = {
    "sharif student": "دانشجو شریف",
    "sharif graduated": "فارغ التحصیل شریف",
    "sharif graduated student not sharif": "فارغ التحصیل شریف و دانشجو سایر",
    "sharif graduated talabe": "فارغ التحصیل شریف و طلبه فعلی",
    "sharif master": "استاد شریف",
    "sharif employed": "کارمند شریف",
    "talabe": "طلبه",
    "not sharif student": "دانشجو سایر",
    "not sharif graduated": "فارغ التحصیل سایر",
    "other": "سایر",
}
export const STATUS_CHOICES = {
    "default": "منتظر قرعه کشی",
    "certain": "قطعی",
    "reserved": "رزرو",
    "given up": "انصراف",
    "suspended": "معلق",
    "not chosen": "انتخاب نشده",
    "came": "شرکت کرده",
    "not came": "شرکت نکرده",
    "temporary": "موقت",
    "removed": "پاک شده",
    "first stage": "مرحله اول"
}
export const PROGRAM_TYPE_CHOICES = {
    "arbaeen": "اربعین",
    "mashhad": "پابوس عشق",
    "etekaf": "اعتکاف",
    "south": "اردو جنوب",
    "voroodi": "اردو ورودی ها",
    "marasem": "مراسم",
    "guest": "سایر",
}
export const PROGRAM_STATE_CHOICES = {
    "config": "در حال پیکربندی",
    "active": "فعال",
    "archive": "بایگانی"
}
export const STATUS_VALUES = _.values(STATUS_CHOICES)
export const PEOPLE_TYPE_VALUES = _.values(PEOPLE_TYPE_CHOICES)
export const CONSCRIPTION_VALUES = _.values(CONSCRIPTION_CHOICES)
export const PEOPLE_TYPE_KEYS = _.keys(PEOPLE_TYPE_CHOICES)

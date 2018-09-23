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
    "sharif employed": "کارمند شریف",
    "other": "سایر",
    "sharif graduated talabe": "فاغ التحصیل شریف و طلبه فعلی",
    "sharif graduated student not sharif": "فارغ التحصیل شریف و دانشجو سایر",
    "talabe": "طلبه",
    "sharif student": "دانشجو شریف",
    "sharif graduated": "فارغ التحصیل شریف",
    "not sharif graduated": "فارغ التحصیل سایر",
    "sharif master": "استاد شریف",
    "not sharif student": "دانشجو سایر"
}
export const STATUS_CHOICES = {
    "certain": "قطعی",
    "removed": "پاک شده",
    "default": "منتظر قرعه کشی",
    "temporary": "موقت",
    "not chosen": "انتخاب نشده",
    "came": "شرکت کرده",
    "reserved": "رزرو",
    "suspended": "معلق",
    "not came": "شرکت نکرده",
    "given up": "انصراف",
    "first stage": "مرحله اول"
}

export const STATUS_VALUES=_.values(STATUS_CHOICES)
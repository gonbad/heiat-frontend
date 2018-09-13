
export const validateMobile = mobile => {
    if (!mobile || mobile === '') {
        return true
    }
    if (mobile.toString().length !== 11) {
        return false
    }
    if(mobile.toString().charAt(0)!=='0'){
        return false
    }
    return /^\d+$/.test(mobile.toString())
}


export const validateStudentNumber = number => {
    if (!number || number === '') {
        return true
    }
    if (number.toString().length !== 8) {
        return false
    }
    if(number.toString().charAt(0)!=='9'&&number.toString().charAt(0)!=='8'&&number.toString().charAt(0)!=='7'&&number.toString().charAt(0)!=='6'&&number.toString().charAt(0)!=='5'&&number.toString().charAt(0)!=='4'){
        return false
    }
    return /^\d+$/.test(number.toString())
}


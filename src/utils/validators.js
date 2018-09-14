export const validateMobile = mobile => {
    if (!mobile || mobile === '') {
        return true
    }
    if (mobile.toString().length !== 11) {
        return false
    }
    if (mobile.toString().charAt(0) !== '0') {
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
    if (number.toString().charAt(0) !== '9' && number.toString().charAt(0) !== '8' && number.toString().charAt(0) !== '7' && number.toString().charAt(0) !== '6' && number.toString().charAt(0) !== '5' && number.toString().charAt(0) !== '4') {
        return false
    }
    return /^\d+$/.test(number.toString())
}


export const validateMelliCode = number => {
    if (!number || number === '') {
        return true
    }
    if (number.toString().length !== 10) {
        return false
    }

    if (!/^\d+$/.test(number.toString())) {
        return false
    }

    let c = parseInt(number.charAt(9));
    let n = parseInt(number.charAt(0)) * 10 +
        parseInt(number.charAt(1)) * 9 +
        parseInt(number.charAt(2)) * 8 +
        parseInt(number.charAt(3)) * 7 +
        parseInt(number.charAt(4)) * 6 +
        parseInt(number.charAt(5)) * 5 +
        parseInt(number.charAt(6)) * 4 +
        parseInt(number.charAt(7)) * 3 +
        parseInt(number.charAt(8)) * 2;
    let r = n - parseInt(n / 11) * 11;
    if ((r == 0 && r == c) || (r == 1 && c == 1) || (r > 1 && c == 11 - r)) {
        return true
    }
    return false
}


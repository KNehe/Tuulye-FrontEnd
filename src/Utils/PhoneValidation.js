const validatePhoneNumber = phoneNumber =>{
    let regExp = new RegExp("^\\d+$");
    let isValid = regExp.test(phoneNumber);
    let length = phoneNumber.trim().length;

    if(length < 10 || length > 10 ){
      return false;
    }

    if(!phoneNumber.trim().startsWith('0')){
        return false;
    }
    return isValid;
};


export default validatePhoneNumber;
import {AbstractControl } from "@angular/forms";

export function changePassword(control: AbstractControl) {
  if (control && (control.value !== null || control.value !== undefined)) {

    const cnfPasswordValue = control.value;
    //console.log(cnfPasswordValue);
    const passControl = control.root.get('newPassword');
    if (passControl) {
      const passValue = passControl.value;
      if (passValue !== cnfPasswordValue || passValue === '') {
        return {
          isError: true,
        };
      }
    }
  }
  return null;
}

export function emailAndPhone(control: AbstractControl) {

    if (control && (control.value !== null || control.value !== undefined)) 
    {

    const emailAddress = control.root.get('emailAddress');
      const mobileNo = control.root.get('mobileNo');
      /* let emailValue = ""; */
      if (emailAddress && mobileNo) {
        const emailValue = emailAddress.value;
        const mobileValue = mobileNo.value;
       /*  console.warn("email value", emailValue);
        console.warn('mobile value', mobileValue); */

         if((mobileValue && emailValue) || (!mobileValue && !emailValue)) 
            { 
              return {
                emailAndPhoneError : true 
              }
            } 
      };

        /* if (!mobileNo || mobileNo !== null) {
          if (!emailValue || emailValue !== null) {
            return {
              isError: true,
            };
          }
        } */
  }
    return null;
   
}

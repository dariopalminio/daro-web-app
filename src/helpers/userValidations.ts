
/**
 * Validate if the email is in the correct format
 * @param emailValue 
 * @returns 
 */
export const emailIsValid = (emailValue: string): boolean => {
    const regularExpresion = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (!regularExpresion.test(emailValue)) {
      return false
    }else{
        return true
    }
  };


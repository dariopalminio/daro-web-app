import * as yup from 'yup';

/**
 * Validate if the email is in the correct format
 * @param emailValue 
 * @returns 
 */
export const emailIsValid = (emailValue: string): boolean => {
  const regularExpresion = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!regularExpresion.test(emailValue)) {
    return false
  } else {
    return true
  }
};

//Email validation
export const EmailValidation = yup.object().shape({
  email: yup.string().email().required(),
});

//Email & Password validation for login
export const LoginValidation = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(10),
});

//Password validation
export const PasswordValidation = yup.object().shape({
  password: yup.string().required().min(10),
});


import * as yup from 'yup';
import IUserValidators from './IUserValidator';

/**
 * Implementation of IUserValidators interface
 */
export class UserValidatorsYupImpl implements IUserValidators {

/**
 * Validate if the email is in the correct format
 * @param emailValue 
 * @returns 
 */
 public emailIsValid = async (emailValue: string): Promise<boolean> => {
  
  if  (await this.EmailValidation.isValid({
    email: emailValue,
  })) return true;
  return false;
};

public confirmPassIsValid = (pasOne: string, passTwo: string): boolean => {
  if (pasOne!==passTwo) {
    return false
  } else {
    return true
  }
};

public passIsValid = async (pass: string): Promise<boolean> => {
  if  (await this.PasswordValidation.isValid({
    password: pass,
  })) return true;
  return false;
};

//Email & Password validation for login
public loginFormIsValid = async (emailValue: string, pass: string): Promise<boolean> => {
  if  (await this.LoginValidation.isValid({
    email: emailValue,
    password: pass,
  })) return true;
  return false;
};

private EmailValidation = yup.object().shape({
  email: yup.string().email().required(),
});

//Formatt: number + char + Uppercase + min 10 chars
private PasswordValidation = yup.object().shape({
  password: yup.string()
    .required()
    .min(10)
    .matches(/^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[A-Z]).{10,}$/gs),
});

private LoginValidation = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(10),
});

};

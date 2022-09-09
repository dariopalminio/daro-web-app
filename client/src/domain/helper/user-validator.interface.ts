
/**
 * UserValidator Interface
 */
export default interface IUserValidator{
    nameIsValid (nameToValidate: string): Promise<boolean>;
    nameWithNumberIsValid (nameToValidate: string): Promise<boolean>;
    emailIsValid (emailValue: string): Promise<boolean>;
    passIsValid (pass: string): Promise<boolean>;
    confirmPassIsValid (pasOne: string, passTwo: string): boolean;
    loginFormIsValid (emailValue: string, pass: string): Promise<boolean>;
};

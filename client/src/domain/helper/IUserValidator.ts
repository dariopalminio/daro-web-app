
/**
 * UserValidator Interface
 */
export default interface IUserValidator{
    emailIsValid (emailValue: string): Promise<boolean>;
    passIsValid (pass: string): Promise<boolean>;
    confirmPassIsValid (pasOne: string, passTwo: string): boolean;
    loginFormIsValid (emailValue: string, pass: string): Promise<boolean>;
};

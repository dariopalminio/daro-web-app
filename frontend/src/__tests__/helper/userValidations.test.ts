import { emailIsValid, confirmPassIsValid, PasswordValidation, EmailValidation, LoginValidation } from "../../logic/helper/userValidations";

describe("Testin validations functions from userValidations", () => {

  test('It should answer that the email format is correct', () => {
    expect(emailIsValid("test@email.com")).toBe(true)
  })

  test('I should answer that the email format is wrong', () => {
    expect(emailIsValid("bad.email")).toBe(false)
  })

  
  test('I should answer that the pass is wrong', () => {
    expect(confirmPassIsValid("aaaa","bbbbb")).toBe(false)
  })

  test('I should answer that the pass is true', () => {
    expect(confirmPassIsValid("abcde12345","abcde12345")).toBe(true)
  })

});

describe("Testin validations functions from userValidations using async/await", () => {

  //Login validation
  test('validate login awell formated email', async () => {
    const result = await LoginValidation.isValid({
      email: 'test@daro.com',
      password: 'abcde12345',
    });
    expect(result).toBeTruthy();
  });

  //Email validation
  test('validate well formated email', async () => {
    const result = await EmailValidation.isValid({
      email: 'test@daro.com',
    });
    expect(result).toBeTruthy();
  });

  test('validate bad formated email', async () => {
    const result = await EmailValidation.isValid({ email: 'bad.email' });
    expect(result).toBeFalsy();
  });

  //Password validation
  test('validate password to be required', async () => {
    const result = await PasswordValidation.isValid({ password: null });
    expect(result).toBeFalsy();
  });

  test('validate short password to be false', async () => {
    const result = await PasswordValidation.isValid({ password: 'b9' });
    expect(result).toBeFalsy();
  });

  test('validate well fomated password', async () => {
    const result = await PasswordValidation.isValid({
      password: 'abcde12345',
    });
    expect(result).toBeTruthy();
  });

});
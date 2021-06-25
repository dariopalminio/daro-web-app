import IUserValidator from '../../../domain/helper/IUserValidator';
import { UserValidatorFactory } from "../../../domain/helper/UserValidatorFactory";

describe("Testing validations functions from userValidations", () => {

  const validator: IUserValidator = UserValidatorFactory.create();

  test('It should answer that the email format is correct', async () => {
    expect(await validator.emailIsValid("test@email.com")).toBe(true)
  })

  test('I should answer that the email format is wrong', async () => {
    expect(await validator.emailIsValid("bad.email")).toBe(false)
  })


  test('I should answer that the pass is wrong', async () => {
    expect(await validator.confirmPassIsValid("aaaa", "bbbbb")).toBe(false)
  })

  test('I should answer that the pass is true', async () => {
    expect(await validator.confirmPassIsValid("abcde12345", "abcde12345")).toBe(true)
  })

});

describe("Testin validations functions from userValidations using async/await", () => {

  const validator: IUserValidator = UserValidatorFactory.create();

  //Login validation
  test('validate login awell formated email', async () => {
    const result = await validator.loginFormIsValid(
      'test@daro.com',
      'abcde12345',
    );
    expect(result).toBeTruthy();
  });

  //Email validation
  test('validate well formated email', async () => {
    const result = await validator.emailIsValid(
      'test@daro.com',
    );
    expect(result).toBeTruthy();
  });

  test('validate bad formated email', async () => {
    const result = await validator.emailIsValid('bad.email');
    expect(result).toBeFalsy();
  });

  test('validate short password to be false', async () => {
    const result = await validator.passIsValid('b9');
    expect(result).toBeFalsy();
  });

  test('validate well fomated password', async () => {
    const result = await validator.passIsValid(
    'abcde12345',
    );
    expect(result).toBeTruthy();
  });

});
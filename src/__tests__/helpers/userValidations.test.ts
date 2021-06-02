import { emailIsValid } from "../../helpers/userValidations";

describe("Testin validations functions from userValidations", () => {

  test('It should answer that the email format is correct', () => {
    expect(emailIsValid("test@email.com")).toBe(true)
  })

  test('I should answer that the email format is wrong', () => {
    expect(emailIsValid("bad.email")).toBe(false)
  })

});
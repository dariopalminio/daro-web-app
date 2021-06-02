import { emailIsValid } from "../../helpers/userValidations";

test('It should answer that the email format is correct', () => {
  expect(emailIsValid("test@email.com")).toBe(true)
})

test('I should answer that the email format is wrong', () => {
  expect(emailIsValid("bad.email")).toBe(false)
})
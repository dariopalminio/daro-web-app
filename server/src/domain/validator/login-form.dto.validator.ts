import Ajv from "ajv";
import { Type } from "@sinclair/typebox";
import addErrors from "ajv-errors";
import addFormats from "ajv-formats";


const LoginFormDTOSchema = Type.Object(
  {
      username: Type.String({
          format: "email",
              errorMessage: {
              type: "auth.ERROR.INVALID_EMPTY_CREDENTIALS", //Debe ser un string
              format: "auth.ERROR.INVALID_EMPTY_CREDENTIALS", //Debe ser un correo electrónico válido
      },
    }),
      password: Type.String({
          errorMessage: {
          type: "auth.ERROR.INVALID_EMPTY_CREDENTIALS", //Debe ser un string
      },
    }),
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: "auth.ERROR.INVALID_FORMAT_OBJECT", //El formato del objeto no es válido
    },
  }
);
  
  
const ajvalidator = new Ajv({ allErrors: true });
addFormats(ajvalidator, ["email"]).addKeyword("kind").addKeyword("modifier");
addErrors(ajvalidator, { keepErrors: false });

const validateLoginFormDTOSchema = ajvalidator.compile(LoginFormDTOSchema);


export default validateLoginFormDTOSchema;

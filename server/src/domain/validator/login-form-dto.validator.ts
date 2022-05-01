import Ajv from "ajv";
import { Type } from "@sinclair/typebox";
import addErrors from "ajv-errors";
import addFormats from "ajv-formats";
import { ITranslator } from '../../domain/output-port/translator.interface';

export class LoginFormDTOValidator {
  
   loginFormDTOSchema = Type.Object(
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
  ajvalidator = null;
  validateLoginFormDTOSchema = null;

  constructor() { 
    this.ajvalidator = new Ajv({ allErrors: true });
    addFormats(this.ajvalidator, ["email"]).addKeyword("kind").addKeyword("modifier");
    addErrors(this.ajvalidator, { keepErrors: false });
    this.validateLoginFormDTOSchema = this.ajvalidator.compile(this.loginFormDTOSchema);
  };

  async traslateValidateErrorsText(i18n?: ITranslator) {
    let compoundMessage = '';

    if (typeof(i18n) === 'undefined') {
      compoundMessage = this.ajvalidator.errorsText(this.validateLoginFormDTOSchema.errors, { separator: "\n" });
      return compoundMessage;
    }

    for (var valor of this.validateLoginFormDTOSchema.errors) {
      compoundMessage = compoundMessage + await i18n.translate(valor.message) + "\n";
    }

    return compoundMessage;
  };

  validate(objectJson: any){
    return this.validateLoginFormDTOSchema(objectJson);
  };


};

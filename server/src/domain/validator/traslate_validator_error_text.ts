import { ITranslator } from '../../domain/output-port/translator.interface';

export const traslateValidateErrorsText = async (validate: any, i18n: ITranslator) => {
    let compoundMessage = '';
    for (var valor of validate.errors) {
      compoundMessage = compoundMessage + await i18n.translate(valor.message) + "\n";
    }
    return compoundMessage;
  };

  export default traslateValidateErrorsText;
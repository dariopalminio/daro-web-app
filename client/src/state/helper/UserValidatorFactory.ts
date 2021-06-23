
import { UserValidatorsYupImpl } from './UserValidatorsYupImpl';

/**
 * Factory of UserValidation implementation for dependency injection
 */
export class UserValidatorFactory {
    static create(){
        return new UserValidatorsYupImpl();
    }
}
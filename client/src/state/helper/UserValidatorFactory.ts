
import { UserValidatorsImpl } from '../../origin/helper/UserValidatorImpl';

/**
 * Factory of UserValidation implementation for dependency injection
 */
export class UserValidatorFactory {
    static create(){
        return new UserValidatorsImpl();
    }
}
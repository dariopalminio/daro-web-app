
import { UserValidatorsImpl } from './UserValidatorImpl';

/**
 * Factory of UserValidation implementation for dependency injection
 */
export class UserValidatorFactory {
    static create(){
        return new UserValidatorsImpl();
    }
}
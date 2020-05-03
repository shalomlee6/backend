import bcrypt from 'bcrypt';
import { ServerConstants } from '../config/server.constants';
import { ErrorHandler } from './ErrorHandler';
import { PasswordUtilsModel } from '../model/passwordUtils.model';


export class PasswordUtils {

    public static async validatePassword(password: string, hash: string, salt: string): Promise<boolean> {

        let hashed: string = '';

        try {
            await bcrypt.hash(password, salt)
            .then(hashBack => {
                hashed = hashBack;
            })
            .catch(err => {
                throw new ErrorHandler(ServerConstants.HTTP_ERROR_RESPONSE_INTERNAL_SERVER_ERROR_CODE, err);
             });
        } catch(error) {
            throw new ErrorHandler(ServerConstants.HTTP_ERROR_RESPONSE_INTERNAL_SERVER_ERROR_CODE, error);
        }
        return hash === hashed;
    }
    
    public static async genPassword(password: string): Promise<PasswordUtilsModel> {

        let salt: string = '';
        let hash: string = ''; 

        try {

            // Generate Salt
            await bcrypt.genSalt(ServerConstants.SALT_ROUNDS)
            .then( saltBack => {
                salt = saltBack;
            })
            .catch( err => {
                throw new ErrorHandler(ServerConstants.HTTP_ERROR_RESPONSE_INTERNAL_SERVER_ERROR_CODE, err);
             })

            // Generate Hash
             await bcrypt.hash(password, salt)
             .then(hashed => {
                 hash = hashed;
             })
             .catch(err => {
                throw new ErrorHandler(ServerConstants.HTTP_ERROR_RESPONSE_INTERNAL_SERVER_ERROR_CODE, err);
             })

        } catch (error) {
            throw new ErrorHandler(ServerConstants.HTTP_ERROR_RESPONSE_INTERNAL_SERVER_ERROR_CODE, error);
        }

        return new PasswordUtilsModel(salt, hash);
    }
}

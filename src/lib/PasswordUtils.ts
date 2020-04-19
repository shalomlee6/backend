import bcrypt from 'bcrypt';

export class PasswordUtils {

    public static validPassword(password: string, hash: string, salt: string) : boolean{
        
        // if (password){
        //     console.log('password => ', password);
        // } else {
        //     console.log('NO password => ', password);

        // }
        // if(hash) {
        //     console.log('hash => ', hash);
        // } else {
        //     console.log('NO hash  => ', hash);
        // }
        // if(salt) {
        //     console.log('salt => ', hash);
        // } else {
        //     console.log('NO salt  => ',salt);
        // }
        return true;
    }
    
    public static genPassword(password: string) {
        
    }
}

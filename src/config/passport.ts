import {Database} from './database';
import passport from 'passport';
import {Strategy} from 'passport-local';
import { PasswordUtils } from '../lib/passwordUtils';
import { Connection } from 'mongoose';


export class Passport {

    customeField: Object;
    localStrategy: Strategy;
    

    constructor() {

        this.customeField = {
            usernameField: 'email',
            passwordField: 'password'
        }
        this.localStrategy = new Strategy(this.customeField ,this.verifyCallback);
        
        passport.use(this.localStrategy);

        passport.serializeUser( (user: any, done: Function) => {
            done(null, user.id);
          });
          
        passport.deserializeUser( (userId, done) => {

            if( Database.getInstance()){
                console.log('yess');
                Database.getInstance().connection.model('user').findById(userId)
                .then(
                    (user) => done(null,user))
                .catch( 
                    (err) => done(err));
            } else {
                console.log('NOOOO ');
    
            }
        });
    }


    verifyCallback(email: any, password: any, done: Function) {

        
        Database.getInstance().User.findOne({
            email: email
        })
        .then(
            (user) => {
                if (!user) {
                    // Returns a 401 http status
                    return done(null, false);
                }

                if ( PasswordUtils.validPassword(password, user.schema.get('hash'), user.schema.get('salt') ) ) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            }
        ).catch(
            (err) => {
                done(err)
            }
        );

    }

}

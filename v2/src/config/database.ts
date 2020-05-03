import mongoose, { Connection } from 'mongoose';
import * as dotenv from "dotenv";
import { ServerConstants } from './server.constants';
import { ErrorHandler } from '../lib/ErrorHandler';
import { User } from '../model/user.model';

export class Database {

    private static instance: Database;
    
    public connection!: Connection;
    private _User!: mongoose.Model<mongoose.Document, {}>;



    private constructor() {
        dotenv.config();
        this.initializeDB();
        this.setUserSchema();
    }

    public static getInstance(): Database {

        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }

    initializeDB() {
        if ( process.env.MONGODB_URL ) {

            this.connection = mongoose.createConnection( process.env.MONGODB_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            });
            // On Connection
            this.connection.on('connected', () => {
                console.log('Connected to the datebase ' + this.connection.db.databaseName  + '  on  ' + process.env.MONGODB_URL );
            });
            // On Error
            this.connection.on('error', (error: any) => {
                // TODO => Error handler
                throw new ErrorHandler(ServerConstants.HTTP_ERROR_RESPONSE_INTERNAL_SERVER_ERROR_CODE, error);
            });
        
        } else {
            var err = new Error();
            err.name = 'process.env MONGODB_URL error';
            err.message = ServerConstants.HTTP_ERROR_RESPONSE_DATABASE_URL_NOT_FOUND;
            throw new ErrorHandler(ServerConstants.HTTP_ERROR_RESPONSE_INTERNAL_SERVER_ERROR_CODE, err);
        }
    }

    setUserSchema() {

        const UserSchema = new mongoose.Schema({
            firstName: {
              type: String
            },
            lastName:  {
              type: String
            },  
            email: {
                type: String,
                unique: true,
                required: true
            },
            salt: {
              type: String,
              required: true
            },
            hash: {
              type: String,
              unique: true,
              required: true
            }
        });
          
        //Creating our model
        this._User = this.connection.model("user", UserSchema);
        
    }
    public get User(): mongoose.Model<mongoose.Document, {}> {
        return this._User;
    }

}



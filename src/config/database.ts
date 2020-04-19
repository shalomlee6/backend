import mongoose, { Connection } from 'mongoose';
import * as dotenv from "dotenv";


export class Database {

    private static instance: Database;
    
    public connection!: Connection;
    public User!: mongoose.Model<mongoose.Document, {}>;

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
            // // On Connection
            // this.connection.on('connected', () => {
            //     console.log('Connected to the datebase ' + this.connection.db.databaseName  + '  on  ' + process.env.MONGODB_URL );
            // });
            // // On Error
            // this.connection.on('error', (error: any) => {
            //     // TODO => Error handler
            //     console.log('Error on database => \n ' + error);
            // });
        
        } else {
            throw new Error('No active database url was found exit the app... database url is =>  ' + process.env.MONGODB_URL);
        }
    }

    setUserSchema() {

        const UserSchema = new mongoose.Schema({
            firstName: {
              type: String,
              required: true
            },
            lastName:  {
              type: String,
              required: true
            },  
            email: {
                type: String,
                unique: true,
                required: true
            },
            password: {
                type: String,
                required: true
            }
          });
          
        //Creating our model
        this.User = this.connection.model("user", UserSchema);
        
    }

}



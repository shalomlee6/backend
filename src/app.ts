import express, { Application } from 'express';
import { MainController } from './controller/main.controller';
import { UserController } from './controller/user.controller';
import cors from 'cors';
import session from 'express-session';
import mongoose from 'mongoose';
import {Passport} from './config/passport';
import passport from 'passport';
import { MongoSessionStore } from './lib/MongoSessionStore';
import * as dotenv from "dotenv";

// importing our MONGO_URL constant
import { ServerConstants } from './config/server.constants';
import { Database } from './config/database';
import { MongoStore } from 'connect-mongo';

class App {
    
  private myPassport: Passport;
  public app: Application;
  public userController: UserController;
  public mainController: MainController;
  public mongoSessionStore: MongoStore;

  constructor() {
    dotenv.config();
    this.app = express();
    
    this.myPassport = new Passport();
    this.mongoSessionStore = MongoSessionStore.createSessionStore(Database.getInstance().connection,'sessions');

    this.setConfig();
    // this.setMongoConfig();
    this.userController = new UserController(this.app);
    this.mainController = new MainController(this.app);
  }

  private setConfig() {
    // Check dotenv
    if(!process.env.PORT && !process.env.URL) {
        // TODO => Error handler
    console.log('No dotenv file was found exit the app... =>  ', process.env.PORT);
    process.exit(1);
    } else {
    console.log('PORT is =>  ', process.env.PORT);
    }
    // Allows us to receive requests with data in json format
    this.app.use(express.json({ limit: '50mb' }));

    // Allows us to receive requests with data in x-www-form-urlencoded format
    this.app.use(express.urlencoded({ limit: '50mb', extended: true}));

    // Enables cors
    this.app.use(cors());

    // initialize Passport Middlewere
    this.app.use(passport.initialize());
    // this.app.use(passport.session);

    // Sesion Setup
    this.app.use(session({
        secret: this.handleSecret(),
        resave: false,
        saveUninitialized: true,
        store:  this.mongoSessionStore,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        }
    }));


  }
    handleSecret(): string | string[] {
        if (process.env.SECRET){
            return process.env.SECRET;
        } else {
            throw new Error('Error => App secret is not found!!! in process.env file is missing or corrupted');
        }
    }

  // Connecting to MongoDB database
//   private setMongoConfig() {
//         //   mongoose.Promise = global.Promise;
//         //   mongoose.connect(process.env.MONGO_URL);

//         if ( !process.env.MONGODB_URL) {

//             console.log('No active database url was found exit the app... database url is =>  ', process.env.MONGO_URL);
//             process.exit(1);

//         } else {
//             this.db = mongoose.createConnection( process.env.MONGODB_URL, {
//                 useNewUrlParser: true,
//                 useUnifiedTopology: true,
//                 useCreateIndex: true
//             })
//             console.log('database url was found database url is =>  ' + process.env.MONGODB_URL);

//         }


//             // On Connection
//             this.db.connection.on('connected', () => {
//                 console.log('Connected to the datebase ' + mongoose.connection.db.databaseName  + '  on  ' + ServerConstants.MONGO_URL );
//             });
//             // On Error
//             this.db.connection.on('error', (error: any) => {
//                 console.log('Error on database => \n ' + error);
//             });
//     }
}

export default new App().app;

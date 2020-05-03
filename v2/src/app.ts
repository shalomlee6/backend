import express, { Application } from 'express';
import { NextFunction, Request, Response } from 'express';
import { MainController } from './controller/main.controller';
import { UserController } from './controller/user.controller';
import cors from 'cors';
import session from 'express-session';
import {Passport} from './config/passport';
import passport from 'passport';
import { MongoSessionStore } from './lib/MongoSessionStore';
// import the database
import { Database } from './config/database';
import { MongoStore } from 'connect-mongo';
import { ErrorHandler } from './lib/ErrorHandler';
import { ServerConstants } from './config/server.constants';
import * as dotenv from "dotenv";



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

    //  Passport Middlewere 
    this.app.use( passport.initialize() );
    this.app.use( passport.session() );

    this.app.use( (req, res, next) => {
      console.log('req.session  =>  \n', req.session);
      console.log('req.user  =>  \n', req.user);
      next();
    });


    this.app.use( (err: any, req: Request, res: Response, next: Function) => {
      console.log('app.use => ',err);
      ErrorHandler.handleError(err, res);
    });

    this.app.get('/error', (req, res) => {
      var err = new Error();
      err.name = 'process.env error';
      err.message = ServerConstants.HTTP_ERROR_RESPONSE_NO_DOTENV_FILE;
      throw new ErrorHandler(ServerConstants.HTTP_ERROR_RESPONSE_NOT_FOUND_CODE, err);
    });

  }
    handleSecret(): string | string[] {
      if (process.env.SECRET){
          return process.env.SECRET;
      } else {
        var err = new Error();
        err.name = 'process.env error';
        err.message = ServerConstants.HTTP_ERROR_RESPONSE_NO_DOTENV_FILE;
        throw new ErrorHandler(ServerConstants.HTTP_ERROR_RESPONSE_NOT_FOUND_CODE, err);
      }
    }
}

export default new App().app;

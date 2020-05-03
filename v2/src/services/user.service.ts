import { Request, Response } from 'express';
import { MongooseDocument } from 'mongoose';
import { ServerConstants } from '../config/server.constants';
import { PasswordUtils } from '../lib/passwordUtils';
import { Database } from '../config/database';
import { PasswordUtilsModel } from '../model/passwordUtils.model';
import { ErrorHandler } from '../lib/ErrorHandler';


export class UserService {

  public welcomeMessage(req: Request, res: Response) {
    return res.status(200).send('Welcome to login');
  }

  // Login User
  login(req: Request, res: Response, next: Function ) {
    console.log('request user is => \n',req.user + '\n');
    
    res.status(200).send(req.user);
    next();
  }

  // Register a new user
  async registerNewUser(req: Request, res: Response, next: Function) {
    
    const {firstName, lastName, email, password} =  req.body;
    if ( firstName && lastName && email && password) {
      // console.log('user data => ', req.body);

      const saltHash = await PasswordUtils.genPassword(password);

      const salt = saltHash.salt;
      const hash = saltHash.hash;
      
      if (salt && hash) {

        try {

          let newUser = await new (Database.getInstance().User) ({
            firstName,
            lastName,
            email,
            salt,
            hash
          });
    
          await newUser.save()
          .then(user => {
            res.status(ServerConstants.HTTP_RESPONSE_STATUS_OK_CODE).json({ user });
          })
          .catch(err => {
            throw new ErrorHandler(ServerConstants.HTTP_ERROR_RESPONSE_UNAUTHORIZED_REQUEST_CODE, err);
          });
          
        } catch(error) {
          throw new ErrorHandler(ServerConstants.HTTP_ERROR_RESPONSE_UNAUTHORIZED_REQUEST_CODE, error);

        }

        next();
      }
      


    } else {
      res.status(ServerConstants.HTTP_ERROR_RESPONSE_BAD_REQUEST_CODE).send({
        error: ServerConstants.HTTP_ERROR_RESPONSE_BAD_REQUEST_MESSAGE
      });
    }
    
  }

  public async findUserByEmail(req: Request, res: Response, next: Function) {

    const email = req.body.email;

    if (email) {
      try {
        await Database.getInstance().User.findOne({
          email: email
        })
        .then(
          (user) => {
            if (!user) {
              next();
            }
            if (user) {
              const duplicateUserError = new Error();
              duplicateUserError.name = 'Duplicate User Error';
              duplicateUserError.message = ServerConstants.HTTP_ERROR_RESPONSE_DUPLICATE_USER_MESSAGE;
              res.status(ServerConstants.HTTP_ERROR_RESPONSE_UNAUTHORIZED_REQUEST_CODE)
              .json({
                error: ServerConstants.HTTP_ERROR_RESPONSE_DUPLICATE_USER_MESSAGE,
                email: email
              });
            } 
          }
        ).catch(
          err => {
            throw new ErrorHandler(ServerConstants.HTTP_ERROR_RESPONSE_UNAUTHORIZED_REQUEST_CODE, err);

          }
        );
      } catch(error) {
        throw new ErrorHandler(ServerConstants.HTTP_ERROR_RESPONSE_UNAUTHORIZED_REQUEST_CODE, error);
      }
        
    } else {
      const err = new Error();
      err.name = 'find User By Email';
      err.message = 'No Email in the request body';
      throw new ErrorHandler(ServerConstants.HTTP_ERROR_RESPONSE_UNAUTHORIZED_REQUEST_CODE, err);
    }
  }

  // GET
  // Getting all posts from the db
  public getAllPosts(req: Request, res: Response) {
    // PostData.find({}, (error: Error, postData: MongooseDocument) => {
    //   if (error) {
    //     res.send(error);
    //   }
    //   res.json({payload: postData});
    // });
  }

  // CREATE
  // Create a new user record
  // public addNewUser(req: Request, res: Response) {
  //   console.log('req.body = > \n');
  //   console.log(req.body);
  //   const newUser = new User(req.body);
  //   newUser.save((error: Error, userData: MongooseDocument) => {
  //     if (error) {
  //       res.send(error);
  //     }
  //     res.json(userData);
  //   });
  // }

  // Delete
  public deletePost(req: Request, res: Response) {
    // const userId = req.params.id;
    // User.findById( userId, (error: Error, deleted: any) => {
    //   if (error) {
    //     res.send(error);
    //   }
    //   const message = deleted ? 'Deleted successfully' : 'Post not found :(';
    //   res.send(message);
    // });
  }

  // Update
  public updatePost(req: Request, res: Response) {
    // const postId = req.params.id;
    // PostData.findByIdAndUpdate(
    //   postId,
    //   req.body,
    //   (error: Error, post: any) => {
    //     if (error) {
    //       res.send(error);
    //     }
    //     const message = post
    //       ? 'Updated successfully'
    //       : 'Post not found :(';
    //     res.send(message);
    //   }
    // );
  }



}






import { Request, Response } from 'express';
import { User } from '../model/user.model';
import { MongooseDocument } from 'mongoose';
import { ServerConstants } from '../config/server.constants';


export class UserService {

  public welcomeMessage(req: Request, res: Response) {
    return res.status(200).send('Welcome to login');
  }

  // Login User
  login(req: Request, res: Response, next: Function ) {
    console.log('request user is => \n',req.user);
    res.status(200).send(req.user);
    next();
  }

  // Register a new user
  registerNewUser(req: Request, res: Response) {
    const {firstName, lastName, email, password} =  req.body;
    if ( firstName && lastName && email && password) {
      console.log('user data => ', req.body);
      let newUser = new User({
        firstName,
        lastName,
        email,
        password
      });
      newUser.save();
      res.status(ServerConstants.HTTP_RESPONSE_STATUS_OK_CODE).send(true);
    } else {
      res.status(ServerConstants.HTTP_ERROR_RESPONSE_BAD_REQUEST_CODE).send({
        error: ServerConstants.HTTP_ERROR_RESPONSE_BAD_REQUEST_MESSAGE
      });
    }
    
    
    // let userData = req.body;
    // let newUser = new User();
    
    // newUser.save( (error, user) => {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     res.status( AppConstants.OK_RESPONSE_STATUS).send({
    //       payload: newUser
    //     });
    //   }
    // });
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
  public addNewUser(req: Request, res: Response) {
    console.log('req.body = > \n');
    console.log(req.body);
    const newUser = new User(req.body);
    newUser.save((error: Error, userData: MongooseDocument) => {
      if (error) {
        res.send(error);
      }
      res.json(userData);
    });
  }

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






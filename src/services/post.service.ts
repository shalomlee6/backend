import { Request, Response } from 'express';
import { PostData } from '../model/post-data.model';
import { MongooseDocument } from 'mongoose';


export class PostService {

  public welcomeMessage(req: Request, res: Response) {
    return res.status(200).send('Welcome to my new REST API by Shalom Pinchas ^^');
  }
  // GET
  // Getting all posts from the db
  public getAllPosts(req: Request, res: Response) {
    PostData.find({}, (error: Error, postData: MongooseDocument) => {
      if (error) {
        res.send(error);
      }
      res.json({payload: postData});
    });
  }

  // CREATE
  // Create a new db record
  public addNewPost(req: Request, res: Response) {
    console.log('req.body = > \n');
    console.log(req.body);
    const newPost = new PostData(req.body);
    newPost.save((error: Error, postData: MongooseDocument) => {
      if (error) {
        res.send(error);
      }
      res.json(postData);
    });
  }

  // Delete
  public deletePost(req: Request, res: Response) {
    const postID = req.params.id;
    PostData.findByIdAndDelete( postID, (error: Error, deleted: any) => {
      if (error) {
        res.send(error);
      }
      const message = deleted ? 'Deleted successfully' : 'Post not found :(';
      res.send(message);
    });
  }

  // Update
  public updatePost(req: Request, res: Response) {
    const postId = req.params.id;
    PostData.findByIdAndUpdate(
      postId,
      req.body,
      (error: Error, post: any) => {
        if (error) {
          res.send(error);
        }
        const message = post
          ? 'Updated successfully'
          : 'Post not found :(';
        res.send(message);
      }
    );
  }



}






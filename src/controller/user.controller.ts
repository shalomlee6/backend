import { Application } from 'express';
import { UserService } from '../services/user.service';
import passport from 'passport';

export class UserController {

  private userService: UserService

  constructor(private app: Application) {
      this.userService = new UserService();
      this.routes();
  }

  public routes() {

      this.app.route('/api/login').get(this.userService.welcomeMessage);

      this.app.route('/api/login').post( passport.authenticate('local') ,this.userService.login);
 

      this.app.route('/api/register').post(this.userService.registerNewUser);

      // GET POST
    //   this.app.route('/api/posts').get(this.postService.getAllPosts);

      // CREATE POST
    //   this.app.route('/api/post').post(this.postService.addNewPost);

      // DELETE POST
    //   this.app.route('/api/post/:id').delete(this.postService.deletePost);

      // UPDATE POST
    //   this.app.route('/api/post/:id').delete(this.postService.deletePost)
    //   .put(this.postService.updatePost);
  }
}

import { Application } from 'express';
import { PostService } from '../services/post.service';

export class MainController {

  private postService: PostService;

  constructor(private app: Application) {
      this.postService = new PostService();
      this.routes();
  }

  public routes() {
      this.app.route('/api').get(this.postService.welcomeMessage);

      // GET POST
      this.app.route('/api/posts').get(this.postService.getAllPosts);

      // CREATE POST
      this.app.route('/api/post').post(this.postService.addNewPost);

      // DELETE POST
      this.app.route('/api/post/:id').delete(this.postService.deletePost);

      // UPDATE POST
      this.app.route('/api/post/:id').delete(this.postService.deletePost)
      .put(this.postService.updatePost);
  }
}

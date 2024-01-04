import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {

  comments: any[] = [];

  projectId: string | null = null;
  taskId: string | null = null;

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = params['projectId'];
      this.taskId = params['taskId'];

      console.log('projectId:', this.projectId);
      console.log('taskId:', this.taskId);
    });
    this.loadComments();
  }

  loadComments(): void {
    this.http.get<any[]>(`http://localhost:3000/get-comments/${this.taskId}`).subscribe(
    (data) => {
      this.comments = data;
      console.log(this.comments);
    },
    (error) => {
      console.error('Error fetching comments:', error);
    });
  }

  navigateToSettings() : void {}

  addComment() : void {
    this.router.navigate(['/dashboard', this.projectId, this.taskId, 'create-comment']);
  }

  deleteComment(commentId : String) : void {
    const confirmation = window.confirm('Are you sure you want to delete this comment?');
  
  if (confirmation && commentId) {
    this.http.delete(`http://localhost:3000/delete-comment/${commentId}`).subscribe(
      () => {
        console.log('Comment deleted successfully.');
        // Refresh the comments after deletion or update the view accordingly
        this.loadComments();
      },
      (error) => {
        console.error('Error deleting comment:', error);
      }
    );
  }
  }

}

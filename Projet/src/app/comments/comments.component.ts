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
      // Log all params to help with debugging
      console.log('All params:', params);
  
      this.taskId = params['taskId'];
      this.projectId = params['projectId'];
  
      console.log('Received parameters:');
      console.log('projectId:', this.projectId);
      console.log('taskId:', this.taskId);
  
      if (this.projectId && this.taskId) {
        console.log('Parameters are defined. Loading comments...');
        this.loadComments();
      } else {
        console.error('projectId or taskId is not defined.');
      }
    });
  }
  

  loadComments(): void {
    console.log('Inside loadComments method');

    // Ensure that projectId and taskId are defined before making the request
    if (this.projectId && this.taskId) {
      const url = `http://localhost:3000/get-comments/${this.taskId}`;

      console.log('Making HTTP request to:', url);

      this.http.get<any[]>(url).subscribe(
        (data) => {
          this.comments = data;
          console.log('Comments loaded successfully:', this.comments);
        },
        (error) => {
          console.error('Error fetching comments:', error);
        }
      );
    } else {
      console.error('projectId or taskId is not defined.');
    }
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

  navigateToEdit(comment: any) {
    console.log('Navigating to edit:', comment);
  
    // Change task_id to taskId and _id to projectId
    if (comment.task_id && comment._id) {
      console.log('comment.taskId:', comment.task_id);
      console.log('comment.projectId:', comment._id);
  
      // Utilisez les valeurs correctes pour projectId et taskId ici
      const navigationPath = `/dashboard/${comment._id}/${comment.task_id}/comment/edit-comment/${comment._id}`;
      this.router.navigate([navigationPath]);
    } else {
      console.error('Invalid projectId, taskId, or comment ID in comment:', comment);
    }
  }
  
  
  
  
  
  
  
  
  
}



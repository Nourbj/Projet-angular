import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  projectId: string | null = null;
  taskId: string | null = null;

  comment: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const projectId = this.route.snapshot.params['projectId'];
    const taskId = this.route.snapshot.params['taskId'];
    const commentId = this.route.snapshot.params['id'];
  
    if (projectId !== null && taskId !== null) {
      this.projectId = projectId;
      this.taskId = taskId;
      this.fetchCommentDetails(projectId, taskId, commentId);
    } else {
      console.error('projectId or taskId is null.');
    }
  }
  
    
  fetchCommentDetails(projectId: string, taskId: string, commentId: string): void {
    this.http.get<any>(`http://localhost:3000/get-comment/${commentId}`).subscribe(
      (data) => {
        // Assign the fetched comment details to the 'comment' property
        this.comment = data;
      },
      (error) => {
        console.error('Error fetching comment details:', error);
      }
    );
  }

  updateComment(): void {
    const commentId = this.route.snapshot.params['id'];
  
    this.http.put(`http://localhost:3000/edit-comment/${commentId}`, this.comment).subscribe(
      (data) => {
        console.log('Comment updated successfully:', data);
        // Optionally, navigate to another page after a successful update
        this.router.navigate([`/dashboard/${this.projectId!}/${this.taskId!}/comment`]);
      },
      (error) => {
        console.error('Error updating comment:', error);
      }
    );
  }
  
  
}

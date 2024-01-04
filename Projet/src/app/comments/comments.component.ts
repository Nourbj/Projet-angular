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

}

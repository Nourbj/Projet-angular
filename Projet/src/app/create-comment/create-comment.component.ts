import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent {

  project_id = '';

  comment = {
    task_id : '',
    message : '',
    time : '',
    writer : ''
  }

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute ) {}

  ngOnInit(): void {
    this.comment.task_id = this.route.snapshot.paramMap.get('taskId') || '';
    this.project_id = this.route.snapshot.paramMap.get('projectId') || '';
  }

  createComment(): void {
    this.comment.time = new Date().toISOString();
    
    const commentData = {
      task_id: this.comment.task_id,
      message : this.comment.message,
      time : this.comment.time,
      writer : this.comment.writer
    };

    const backendUrl = 'http://localhost:3000/create-comment';

    this.http.post(backendUrl, commentData)
    .subscribe(
      (response: any) => {
        console.log('comment creation successful:', response);
        this.router.navigate(['/dashboard/comment']);
      },
      (error) => {
        console.error('comment creation failed:', error);
      }
    );
    this.router.navigate(['/dashboard', this.project_id, this.comment.task_id, 'comment']);
  }

}

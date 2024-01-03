import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent {

  comment = {
    message : '',
    time : '',
    writer : ''
  }

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  createComment(): void {
    this.comment.time = new Date().toISOString();
    
    const commentData = {
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
  }

}

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {

  comments: any[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments(): void {
    this.http.get<any[]>('http://localhost:3000/get-comments').subscribe(
      (data) => {
        this.comments = data;
        console.log(this.comments);
      },
      (error) => {
        console.error('Error fetching comments:', error);
      }
    );
  }

  navigateToSettings(): void {
    
  }

}

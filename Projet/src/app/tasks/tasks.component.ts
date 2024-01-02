import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {

  tasks = [
    {
      id : 1,
      title : "task1",
      category: "web",
      due_date : "12-01-2024",
      priority : "important",
      state : "not started",
      assignee : "nour",
      owner : "hadil"
    }
  ]

  getStateColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'done' || 2:
        return 'success';
      case 'in progress' || 1:
        return 'primary';
      case 'not started' || 0:
        return 'waiting';
      default:
        return 'secondary';
    }
  }

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.http.get<any[]>('http://localhost:3000/get-tasks').subscribe(
      (data) => {
        this.tasks = data;
        console.log(this.tasks);
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  seeTask(): void {
    this.router.navigate(['/dashboard/task-details']);
  }

  addComment(): void {
    this.router.navigate(['/dashboard/comment']);
  }

  viewDoc(): void {
    this.router.navigate(['/dashboard/view-doc']);
  }

}

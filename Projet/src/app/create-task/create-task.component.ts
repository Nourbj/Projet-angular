import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {

  task = {
    title : '',
    description : '',
    due_date : '',
    owner : '',
    priority : '',
    state : '',
    category : '',
    assignee : ''
  }

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  createTask(): void {
    const taskData = {
      title: this.task.title,
      description: this.task.description,
      due_date: this.task.due_date,
      owner: this.task.owner,
      priority: this.task.priority,
      state: this.task.state,
      category: this.task.category,
      assignee: this.task.assignee
    };

    const backendUrl = 'http://localhost:3000/create-task';

    this.http.post(backendUrl, taskData)
    .subscribe(
      (response: any) => {
        console.log('task creation successful:', response);
        this.router.navigate(['/dashboard/tasks']);
      },
      (error) => {
        console.error('task creation failed:', error);
      }
    );
  }

}

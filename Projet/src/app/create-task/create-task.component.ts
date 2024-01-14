import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {

  task = {
    project_id: '', 
    title: '',
    description: '',
    due_date: '',
    owner: '',
    priority: '',
    state: '',
    category: '',
    assignee: ''
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute 
  ) {}

  users: any[] = []; // Array to store users

  

  ngOnInit(): void {
    this.task.project_id = this.route.snapshot.paramMap.get('projectId') || '';

    // Fetch users from the backend and populate the users array
    this.http.get<any[]>('http://localhost:3000/users').subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  createTask(): void {
    const taskData = {
      project_id: this.task.project_id, 
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
        console.log('Task creation successful:', response);
        this.router.navigate(['/dashboard/tasks']);
      },
      (error) => {
        console.error('Task creation failed:', error);
      }
    );
    this.router.navigate(['/dashboard', this.task.project_id, 'tasks']);
  }
}
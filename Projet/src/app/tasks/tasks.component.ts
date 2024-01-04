import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {

  tasks: any[] = [];

  projectId: string | null = null;

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = params['projectId'];

      console.log('projectId:', this.projectId);
    });
    this.loadTasks();
  }

  loadTasks(): void {
    const apiUrl = `http://localhost:3000/get-tasks/${this.projectId}`;
  
    this.http.get<any[]>(apiUrl).subscribe(
      (data) => {
        this.tasks = data;
        console.log(this.tasks);
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  navigateToTaskDetails(taskId: string): void {
    this.router.navigate(['/dashboard', this.projectId, taskId, 'task-details']);
  }

  createTask() : void {
    this.router.navigate(['/dashboard', this.projectId, 'create-task']);
  }

  navigateToDocs(): void {
    this.router.navigate(['/dashboard/view-doc']);
  }
}

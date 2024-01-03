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

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) {}

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

  navigateToTaskDetails(taskId: string): void {
    const projectId = this.route.snapshot.paramMap.get('projectId');
    this.router.navigate(['/dashboard', projectId, taskId, 'task-details']);
  }

  navigateToComment(): void {
    this.router.navigate(['/dashboard/comment']);
  }

  navigateToDocs(): void {
    this.router.navigate(['/dashboard/view-doc']);
  }

  
}

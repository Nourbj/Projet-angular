import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
  export class TaskDetailComponent implements OnInit {
    task: any = {};

    projectId: string | null = null;
    taskId: string | null = null;
  
    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private http: HttpClient
    ) {}
  

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = params['projectId'];
      this.taskId = params['taskId'];

      console.log('projectId:', this.projectId);
      console.log('taskId:', this.taskId);
    });
    this.loadTaskDetails();

  }
   
    
  loadTaskDetails(): void {
    const apiUrl = `http://localhost:3000/task-details/${this.taskId}`;

    this.http.get<any>(apiUrl).subscribe(
      (data) => {
        this.task = data;
        console.log(this.task);
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  updateTask(): void {
    console.log('Updating task:', this.task);
    this.router.navigate(['/dashboard', this.projectId, this.taskId, 'task-details', 'update-task']);
  }

  navigateToComment(): void {
    this.router.navigate(['/dashboard', this.projectId, this.taskId, 'comment']);
  }

  navigateToDocs(): void {
    this.router.navigate(['/dashboard', this.projectId, this.taskId, 'view-doc']);
  }

  deleteTask(): void {
    const confirmation = window.confirm('Are you sure you want to delete this task?');
    if (confirmation && this.taskId) {
      this.http.delete(`http://localhost:3000/delete-task/${this.taskId}`).subscribe(
        () => {
          console.log('Task deleted successfully.');
          this.router.navigate(['/dashboard', this.projectId, 'tasks']); // Redirige vers la liste des tâches après la suppression
        },
        (error) => {
          console.error('Error deleting task:', error);
        }
      );
    }
  }

}

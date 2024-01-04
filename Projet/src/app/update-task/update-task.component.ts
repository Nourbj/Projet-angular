import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
  task: any = {};

  private backendUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const taskId = params['taskId'];
      console.log('Task ID from URL:', taskId);

      // Directly fetch task details without using a service
      this.http.get<any>(`${this.backendUrl}/get-task/${taskId}`).subscribe(
        (taskData) => {
          console.log('Task data:', taskData);

          if (!taskData || !taskData._id) {
            console.error('Invalid task ID');
            return;
          }

          this.task = taskData;
        },
        (error: any) => {
          console.error('Error fetching task details:', error);
        }
      );
    });
  }

  updateTask(): void {
    // Assurez-vous que l'ID de la tâche est disponible
    if (!this.task || !this.task._id) {
      console.error('Invalid task ID');
      return;
    }
  
    console.log('Updating task:', this.task);  
    console.log('Updated task data for submission:', this.task);
  
    // Construire l'URL complète pour la mise à jour avec l'ID de la tâche
    const url = `${this.backendUrl}/update-task/${this.task._id}`;
  
    this.http.put(url, this.task)
      .subscribe(
        (response: any) => {
          console.log('Task updated successfully:', response);
  
          // Naviguez vers la nouvelle URL avec l'ID de la tâche après la mise à jour
          const updatedTaskId = response._id;
          this.router.navigate(['/dashboard/tasks', updatedTaskId]);
        },
        (error) => {
          console.error('Task update failed:', error);
        }
      );
  }
}

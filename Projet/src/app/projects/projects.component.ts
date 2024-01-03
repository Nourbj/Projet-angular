import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {

  projects: any[] = [];

  getStatusColor(status: string): string {
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
    this.loadProjects();
  }

  loadProjects(): void {
    this.http.get<any[]>('http://localhost:3000/get-projects').subscribe(
      (data) => {
        this.projects = data;
        console.log(this.projects);
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }

  navigateToTasks(projectId: string): void {
    this.router.navigate(['/dashboard', projectId, 'tasks']);
  }

  navigateToSettings(): void {
    this.router.navigate(['/dashboard/settings']);
  }

}

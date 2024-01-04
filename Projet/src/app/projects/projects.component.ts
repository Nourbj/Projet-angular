import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

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
    constructor(
      private router: Router,
      private http: HttpClient,
      private route: ActivatedRoute
    ) {}
  
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

  createProject() : void {
    this.router.navigate(['/dashboard/create-project']);
  }

  navigateToSettings(): void {
    this.router.navigate(['/dashboard/settings']);
  }
  
  deleteProject(projectId: string): void {
    const confirmation = window.confirm('Are you sure you want to delete this project?');
    if (confirmation) {
      this.http.delete(`http://localhost:3000/delete-project/${projectId}`).subscribe(
        () => {
          console.log('Project deleted successfully.');
          this.loadProjects(); 
        },
        (error) => {
          console.error('Error deleting project:', error);
        }
      );
    }
  }
}

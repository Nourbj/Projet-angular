import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent {
  project: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    // Fetch project details when the component is initialized
    this.fetchProjectDetails();
  }

  fetchProjectDetails(): void {
    // Get the project ID from the route parameters
    const projectId = this.route.snapshot.paramMap.get('projectId');

    // Send an HTTP request to fetch project details
    this.http.get<any>(`http://localhost:3000/get-project/${projectId}`).subscribe(
      (data) => {
        // Assign the fetched project details to the 'project' property
        this.project = data;
      },
      (error) => {
        console.error('Error fetching project details:', error);
      }
    );
  }

  updateProject(): void {
    // Send an HTTP request to update the project
    const projectId = this.route.snapshot.paramMap.get('projectId');
    this.http.put(`http://localhost:3000/edit-project/${projectId}`, this.project).subscribe(
      (data) => {
        console.log('Project updated successfully:', data);
        // Optionally, navigate to another page after a successful update
        this.router.navigate(['/dashboard/projects']);
      },
      (error) => {
        console.error('Error updating project:', error);
      }
    );
  }
}
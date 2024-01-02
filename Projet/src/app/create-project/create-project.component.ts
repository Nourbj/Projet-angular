import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent {

  project = {
    name: '',
    category: '',
    status: '', 
    lead: '',
    description: ''
  }

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  createProject(): void {
    const projectData = {
      name: this.project.name,
      category: this.project.category,
      status: this.project.status,
      lead: this.project.lead,
      description: this.project.description
    };

    const backendUrl = 'http://localhost:3000/create-project';

    this.http.post(backendUrl, projectData)
    .subscribe(
      (response: any) => {
        console.log('project creation successful:', response);
        this.router.navigate(['/dashboard/projects']);
      },
      (error) => {
        console.error('project creation failed:', error);
      }
    );
  }

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {

  projects = [ 
    {
      id: 1, 
      name: 'Project/Task Manager', 
      category: 'Web Dev', 
      status: 'In progress', 
      lead: 'Hadil Yahiaoui', 
      avatar: 'https://mdbootstrap.com/img/new/avatars/8.jpg'
    },
    {
      id: 2,
      name: 'Library Manager', 
      category: 'Java', 
      status: 'Not started', 
      lead: 'Nour Ben Jannena',
      avatar: 'https://mdbootstrap.com/img/new/avatars/6.jpg'
    }, 
    {
      id: 3, 
      name: 'Another Project', 
      category: 'saybouni zah', 
      status: 'Done', 
      lead: 'Foulen Ben Foulen',
      avatar: 'https://mdbootstrap.com/img/new/avatars/7.jpg'
    }
  ]

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'done':
        return 'success';
      case 'in progress':
        return 'primary';
      case 'not started':
        return 'waiting';
      default:
        return 'secondary';
    }
  }
}

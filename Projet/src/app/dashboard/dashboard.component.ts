import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  logout(): void {
    this.router.navigate(['/landing']);
  }

  createProject() : void {
    this.router.navigate(['/dashboard/create-project']);
  }

  createTask() : void {
    // const projectId = this.route.snapshot.paramMap.get('projectId');
    // console.log(projectId);
    // this.router.navigate(['/dashboard', projectId, 'create-task']);
    this.router.navigate(['/dashboard/create-task']);
  }

  addComment() : void {
    this.router.navigate(['/dashboard/create-comment']);
  }

  isProjectsPage(): boolean {
    return this.router.isActive('/dashboard/projects', false);
  }

  isTasksPage(): boolean {
    return this.router.url.endsWith('/tasks');
  }

  isCommentsPage(): boolean {
    return this.router.isActive('/dashboard/comment', false);
  }
}

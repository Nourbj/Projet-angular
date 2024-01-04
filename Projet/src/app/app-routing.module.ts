import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { LandingContainerComponent } from './landing-container/landing-container.component';
import { ContactusComponent } from './contactus/contactus.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { ProfileComponent } from './profile/profile.component';
import { HelpingComponent } from './helping/helping.component';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { TasksComponent } from './tasks/tasks.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { ViewDocComponent } from './view-doc/view-doc.component';
import { CommentsComponent } from './comments/comments.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { CreateCommentComponent } from './create-comment/create-comment.component';
import { UpdateTaskComponent } from './update-task/update-task.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/landing',
    pathMatch: 'full',
  },
  { 
    path: 'landing', component: LandingPageComponent,
    children: [
      { path: '', component: LandingContainerComponent},
      { path: 'contact-us', component: ContactusComponent},
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent }
    ]
  },
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      { path: '', component: HomeComponent},
      { path: 'profile', component: ProfileComponent },
      { path: 'helping', component: HelpingComponent },
      { path: 'projects', component: ProjectsComponent}, 
      { path: 'create-project', component: CreateProjectComponent},
      { path: 'settings/:projectId', component: EditProjectComponent},
      { path: ':projectId/tasks', component: TasksComponent},
      { path: ':projectId/:taskId/task-details', component: TaskDetailComponent},
      { path: ':projectId/create-task', component: CreateTaskComponent},
      { path: ':projectId/:taskId/view-doc', component: ViewDocComponent},
      { path: ':projectId/:taskId/comment', component: CommentsComponent},
      { path: ':projectId/:taskId/create-comment', component: CreateCommentComponent},
      { path: ':projectId/:taskId/task-details/update-task', component: UpdateTaskComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

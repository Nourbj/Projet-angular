import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { LandingHeaderComponent } from './landing-header/landing-header.component';
import { LandingContainerComponent } from './landing-container/landing-container.component';
import { FooterComponent } from './footer/footer.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ProjectsComponent } from './projects/projects.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProfileComponent } from './profile/profile.component';
import { HelpingComponent } from './helping/helping.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { TasksComponent } from './tasks/tasks.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { ViewDocComponent } from './view-doc/view-doc.component';
import { CommentsComponent } from './comments/comments.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { CreateCommentComponent } from './create-comment/create-comment.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    LandingHeaderComponent,
    LandingContainerComponent,
    FooterComponent,
    ContactusComponent,
    ProjectsComponent,
    SidebarComponent,
    ProfileComponent,
    HelpingComponent,
    DashboardComponent,
    HomeComponent,
    TasksComponent,
    EditProjectComponent,
    LandingPageComponent,
    CreateProjectComponent,
    TaskDetailComponent,
    ViewDocComponent,
    CommentsComponent,
    CreateTaskComponent,
    CreateCommentComponent,
    UpdateTaskComponent,
    EditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

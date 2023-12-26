import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProfileComponent } from './profile/profile.component';
import { HelpingComponent } from './helping/helping.component';
import { LandingContainerComponent } from './landing-container/landing-container.component';
import { LandingHeaderComponent } from './landing-header/landing-header.component';
import { LoginComponent } from './login/login.component';
import { ContactusComponent } from './contactus/contactus.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: 'sidebar', component: SidebarComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'helping', component: HelpingComponent },
  { path: 'landing-container', component: LandingContainerComponent},
  { path: 'landing-header', component: LandingHeaderComponent},
  { path: 'login', component: LoginComponent},
  { path: 'contact-us', component: ContactusComponent},
  { path: 'signup', component: SignupComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

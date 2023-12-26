import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { LandingHeaderComponent } from './landing-header/landing-header.component';
import { LandingContainerComponent } from './landing-container/landing-container.component';
import { FooterComponent } from './footer/footer.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProfileComponent } from './profile/profile.component';
import { HelpingComponent } from './helping/helping.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'landing-header', component: LandingHeaderComponent},
  { path: 'landing-container', component: LandingContainerComponent},
  { path: 'footer', component: FooterComponent},
  { path: 'contact-us', component: ContactusComponent},
  { path: 'about-us', component: AboutusComponent},
  { path: 'sidebar', component: SidebarComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'helping', component: HelpingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

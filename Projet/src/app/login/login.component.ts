// app-login.component.ts

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms'; // Import NgForm for form handling
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  onSubmit(form: NgForm): void {
    // Check if form is valid
    if (form.invalid) {
      this.errorMessage = 'Please fill out all fields';
      return;
    }

    // Set loading state to true
    this.loading = true;

    const userData = {
      email: this.email,
      password: this.password
    };

    const backendUrl = 'http://localhost:3000/login';

    // Make the HTTP request
    this.http.post(backendUrl, userData)
      .pipe(
        catchError((error) => {
          console.error('Login failed:', error);
          this.errorMessage = 'Invalid email or password'; // Update the error message
          return throwError(error); // Rethrow the error to propagate it to the next subscriber
        })
      )
      .subscribe(
        (response: any) => {
          console.log('Login successful:', response);
          // Handle successful login, navigate to "/sidebar"
          this.router.navigate(['/sidebar']); // Replace with the actual route
        },
        () => { },
        () => {
          // Set loading state to false after the request is complete
          this.loading = false;
        }
      );
  }
}

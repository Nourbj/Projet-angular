import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  email: string = '';
  object: string = '';
  subject: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  onSubmit() {
    this.sendEmail();
    this.clearForm(); // Clear the fields after submission
  }

  sendEmail() {
    const formData = {
      email: this.email,
      object: this.object,
      subject: this.subject
    };

    this.http.post('http://localhost:3000/contact', formData)
      .subscribe(
        (response: any) => {
          console.log('Form submitted successfully:', response);
        },
        (error) => {
          console.error('Form submission failed:', error);
        }
      );
  }

  clearForm() {
    this.email = '';
    this.object = '';
    this.subject = '';
  }
}

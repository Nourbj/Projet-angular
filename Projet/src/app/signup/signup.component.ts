import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Importez le service Router

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    // ...
  }

  onSubmit(): void {
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    // Remplacez l'URL par celle de votre backend
    const backendUrl = 'http://localhost:3000/signup';

    // Effectuer une requête POST vers le backend avec les données du formulaire
    this.http.post(backendUrl, userData)
      .subscribe(
        (response: any) => {
          console.log('Signup successful:', response);
          // Gérer la réponse réussie, rediriger vers la page /sidebar, etc.
          this.router.navigate(['/sidebar']);
        },
        (error) => {
          console.error('Signup failed:', error);
          // Gérer l'erreur, afficher un message d'erreur, etc.
        }
      );
  }
}

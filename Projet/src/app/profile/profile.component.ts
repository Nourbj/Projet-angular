import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profilePhotoSrc: string | null = 'https://th.bing.com/th/id/OIP.uAwT2i7H0G9UToXLK7-S7wHaHa?w=209&h=209&c=7&r=0&o=5&dpr=1.3&pid=1.7';
  selectedPhoto: File | null = null;
  displaySelectedPhotoLink: boolean = false;

  // Ajout des variables pour les données du profil
  username: string = '';
  email: string = '';
  project: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Récupérer les données du profil lors de l'initialisation du composant
    this.http.get('http://localhost:3000/profile') // Remplacez par l'URL correcte pour récupérer les données du profil
      .subscribe(
        (profileData: any) => {
          // Initialiser les variables avec les données du profil
          this.username = profileData.username;
          this.email = profileData.email;
          this.project = profileData.project;

          // Mettre à jour l'affichage de la photo (si elle existe)
          if (profileData.profile && profileData.profile.photo) {
            // Construire l'URL complet de l'image à partir de l'ID stocké dans la base de données
            this.profilePhotoSrc = `http://localhost:3000/images/${profileData.profile.photo}`;
            this.displaySelectedPhotoLink = true;
          }
        },
        (error) => {
          console.error('Failed to fetch profile data:', error);
        }
      );
  }

  onPhotoSelected(event: any): void {
    this.selectedPhoto = event.target.files[0];

    if (this.selectedPhoto) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profilePhotoSrc = e.target.result;
        this.displaySelectedPhotoLink = true;
      };
      reader.readAsDataURL(this.selectedPhoto);
    }
  }

  resetPhoto(): void {
    this.selectedPhoto = null;
    this.profilePhotoSrc = 'https://th.bing.com/th/id/OIP.uAwT2i7H0G9UToXLK7-S7wHaHa?w=209&h=209&c=7&r=0&o=5&dpr=1.3&pid=1.7';
    this.displaySelectedPhotoLink = false;
  }

  saveChanges(): void {
    // Envoyer les données du formulaire au backend
    const formData = new FormData();
    formData.append('username', this.username);
    formData.append('email', this.email);
    formData.append('project', this.project);

    if (this.selectedPhoto) {
      formData.append('photo', this.selectedPhoto);
    }

    this.http.put('http://localhost:3000/profile', formData)
      .subscribe(
        (response) => {
          console.log('Profile updated successfully:', response);
        },
        (error) => {
          console.error('Profile update failed:', error);
        }
      );
  }
}

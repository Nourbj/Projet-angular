import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-view-doc',
  templateUrl: './view-doc.component.html',
  styleUrls: ['./view-doc.component.css']
})
export class ViewDocComponent {

  docs = [
    {
      name : "doc1",
      owner : "hadil"
    }
  ]
  
  selectedDocument: any; // Property to store the selected document

  constructor(private http: HttpClient) {}

  onDocumentSelected(event: any) {
    const fileList: FileList | null = event.target.files;

    if (fileList && fileList.length > 0) {
      this.selectedDocument = {
        file: fileList[0],
        name: fileList[0].name,
        owner: 'Current User' // Replace with actual owner information
      };
    }
  }

  uploadDocument() {
    // Assuming you have a specific endpoint on your server to handle uploads
    // Adjust the URL accordingly
    const uploadUrl = 'http://localhost:3000/upload';
    
    const formData = new FormData();
    formData.append('file', this.selectedDocument.file);
    formData.append('name', this.selectedDocument.name);
    formData.append('owner', this.selectedDocument.owner);

    // Make a POST request to upload the document
    this.http.post(uploadUrl, formData).subscribe((response: any) => {
      console.log(response.message);
      // Handle success (if needed)
    }, (error: any) => {
      console.error('Error uploading document:', error);
      // Handle error (if needed)
    });
  }

  downloadDocument() {
    const downloadUrl = `http://localhost:3000/download/${this.selectedDocument.name}`;
  
    this.http.get(downloadUrl, { responseType: 'blob' }).subscribe(
      (data: Blob) => {
        saveAs(data, this.selectedDocument.name);
        alert('Document downloaded successfully!');
      },
      (error) => {
        console.error('Error downloading document:', error);
        // Handle error (if needed)
      }
    );
  }



  }

function saveAs(data: Blob, name: any) {
  throw new Error('Function not implemented.');
}

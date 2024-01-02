import { Component } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {

  comments = [
    {
      name : "moi dead",
      time : "hh:MM:ss dd-mm-yyyy",
      writer : "hadil"
    }
  ]

}

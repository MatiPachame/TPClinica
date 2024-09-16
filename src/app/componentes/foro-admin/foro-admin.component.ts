import { Component } from '@angular/core';
import { ChatservicesService } from '../../servicios/chatservices.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-foro-admin',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './foro-admin.component.html',
  styleUrl: './foro-admin.component.css'
})
export class ForoAdminComponent {

  public chats: any[]=[];

  constructor(public srvChat: ChatservicesService){

    srvChat.getForo().then(t=> {
      this.chats = t.docs.map(chat => chat.data());
    console.log(this.chats );
    }
    );
  }
}

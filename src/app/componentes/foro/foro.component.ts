import { Component } from '@angular/core';
import { ChatservicesService } from '../../servicios/chatservices.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-foro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './foro.component.html',
  styleUrl: './foro.component.css'
})
export class ForoComponent {
  public chats: any[]=[];
  public mensaje: string="";
  public nombre: string="";
  public apellido: string="";
  constructor(private route:Router,public srvChat: ChatservicesService) {
    srvChat.getChat().then(t=> {
      this.chats = t.docs.map(chat => chat.data());
    console.log(this.chats );
    }
    );
  }

  public enviar(){
    this.srvChat.setForo({nombre:this.nombre, apellido:this.apellido,mensaje:this.mensaje});
    alert("Mensaje enviado");
    this.route.navigateByUrl('/principal');
  }
}

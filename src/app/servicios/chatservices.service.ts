import { Injectable, inject } from '@angular/core';
import { Firestore, getDocs, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatservicesService {

  private firestore;
  constructor() {
    this.firestore = inject(Firestore);
  }

  public getChat() {
    return getDocs(collection(this.firestore, "chat"));
  }

  public setChat( valor: any){
     addDoc(collection(this.firestore, 'chat'),valor);
  }
}

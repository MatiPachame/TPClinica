import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PasstopdfService {

  constructor() { }


  exportAsPDF(divId: string) {
    let data = document.getElementById(divId);
    html2canvas(data!).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('p', 'cm', 'a4');
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 21.0, 29.7);
      pdf.save('ListaMedicos.pdf');
    });
  }

}

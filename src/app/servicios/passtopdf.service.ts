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

    // Mostrar el contenedor antes de capturarlo
    if (data) {
        data.style.display = 'block';
    }

    html2canvas(data!, { scale: 2 }).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('p', 'cm', 'a4');

      // Obtener las dimensiones del canvas
      let imgWidth = 21.0; // Ancho de la imagen (en cm)
      let imgHeight = canvas.height * imgWidth / canvas.width; // Calcular la altura manteniendo la proporción

      // Si la altura calculada es mayor que la altura de la página, ajusta la altura
      if (imgHeight > 29.7) {
          imgHeight = 29.7;
          imgWidth = canvas.width * imgHeight / canvas.height;
      }

      pdf.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('ListaMedicos.pdf');

        // Volver a ocultar el contenedor después de capturarlo
        if (data) {
            data.style.display = 'none';
        }
    });
}


}

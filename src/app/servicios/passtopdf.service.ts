import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import jspdf, { jsPDF } from 'jspdf';
import { Usuario } from '../entidades/usuario';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PasstopdfService {



  constructor(private http: HttpClient) { }


//   exportAsPDF(divId: string) {
//     let data = document.getElementById(divId);

//     // Mostrar el contenedor antes de capturarlo
//     if (data) {
//         data.style.display = 'block';
//     }

//     html2canvas(data!, { scale: 4 }).then(canvas => {
//       const contentDataURL = canvas.toDataURL('image/png');
//       let pdf = new jspdf('p', 'cm', 'a4');

//       // Ancho y alto de la imagen en el PDF (21 cm es el ancho de una página A4 en cm)
//       let imgWidth = 21.0;
//       let imgHeight = (canvas.height * imgWidth) / canvas.width; // Mantener la proporción

//       pdf.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight);
//       pdf.save('ListaMedicos.pdf');

//         // Volver a ocultar el contenedor después de capturarlo
//         if (data) {
//             data.style.display = 'none';
//         }
//     });
// }

listamedPDF1(medicos:Usuario[]) {
    const pdf = new jsPDF();

    // Agregar título
    pdf.setFontSize(22);
    pdf.text('Lista de Médicos', 20, 20);

    // Configuración de estilo de texto
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'normal');

    // Generar la lista de médicos
    let yOffset = 40; // Margen superior inicial
    medicos.forEach((medico, index) => {
        pdf.text(`${index + 1}. ${medico.nombre} - ${medico.especialidad}`, 20, yOffset);
        yOffset += 10; // Aumenta la distancia vertical para la siguiente línea
    });

    // Guardar el PDF
  pdf.save('ListaMedicos.pdf');
}

listamedPDF(medicos: Usuario[]) {
  // Ruta al logo en assets
  const logo = 'assets/imagenes/LogoClinica.png';

  // Leer la imagen desde la ruta y convertirla en base64
  this.http.get(logo, { responseType: 'blob' }).subscribe((blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const logoDataUrl = reader.result as string;

      // Crear el documento PDF
      const doc = new jsPDF();

      // Agregar el logo al PDF
      doc.addImage(logoDataUrl, 'PNG', 10, 10, 50, 20); // Ajusta las posiciones y el tamaño del logo

      // Agregar título
      doc.setFontSize(22);
      doc.text('Lista de Médicos', 20, 40); // Ajusta la posición del título después del logo

      // Configuración de estilo de texto
      doc.setFontSize(16);
      doc.setFont('helvetica', 'normal');

      // Generar la lista de médicos
      let yOffset = 60; // Ajusta la posición inicial después del título
      medicos.forEach((medico, index) => {
        doc.text(`${index + 1}. ${medico.nombre} - ${medico.especialidad}`, 20, yOffset);
        yOffset += 10; // Aumenta la distancia vertical para la siguiente línea
      });

      // Guardar el PDF
      doc.save('ListaMedicos.pdf');
    };
  });
}

}

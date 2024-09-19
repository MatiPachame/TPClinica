import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-calificar-atencion',
  standalone: true,
  imports: [CommonModule,FormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './calificar-atencion.component.html',
  styleUrl: './calificar-atencion.component.css'
})
export class CalificarAtencionComponent {
  public calificacion: number = 5;  // Valor inicial de la calificación
  public comentario: string = '';  // Nueva variable para la reseña

  constructor(
    public dialogRef: MatDialogRef<CalificarAtencionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onConfirm(): void {
    this.dialogRef.close({ calificacion: this.calificacion, reseña: this.comentario });  // Retorna la calificación y la reseña
  }

  onCancel(): void {
    this.dialogRef.close();  // Cierra el diálogo sin valor
  }
}
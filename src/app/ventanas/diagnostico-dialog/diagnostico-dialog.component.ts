import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-diagnostico-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './diagnostico-dialog.component.html',
  styleUrls: ['./diagnostico-dialog.component.css']
})
export class DiagnosticoDialogComponent {
  public diagnostico: string = '';  // Diagnóstico inicial vacío

  constructor(
    public dialogRef: MatDialogRef<DiagnosticoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.diagnostico = data.diagnostico;  // Inicializa el diagnóstico con el dato recibido
  }

  onConfirm(): void {
    this.dialogRef.close(this.diagnostico);  // Retorna el diagnóstico editado
  }

  onCancel(): void {
    this.dialogRef.close();  // Cierra sin cambios
  }
}



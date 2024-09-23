import { Component, ElementRef, ViewChild } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { DataUsuario } from '../../entidades/data-usuario';
import { Disponibilidad } from '../../clases/disponibilidad';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { Chart, ChartType, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-puntuaciones',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './puntuaciones.component.html',
  styleUrl: './puntuaciones.component.css'
})
export class PuntuacionesComponent {

  public puntuaciones:Disponibilidad[] = [];
  public decode:DataUsuario = {data: {id: 0,nombre: '',apellido:'', mail:'', nacimiento: new Date(), usuario:'', password: '', tipo_usuario: 0, autorizado:1}};
  public barChartData: any;

  @ViewChild('barChart', { static: false }) barChart!: ElementRef; // Referencia al canvas

  constructor(private usuarioservices: UsuarioService, private route: Router) {
    const token = localStorage.getItem('UsuarioToken');
    this.decode = jwtDecode<any>(token!);

    // Registra los componentes necesarios de Chart.js
    Chart.register(...registerables);

    this.usuarioservices.traerPuntuacion(this.decode).subscribe(x => {
      if ((<Disponibilidad[]>x)?.length >= 1) {
        this.puntuaciones = Object.assign([], x);
        console.log(this.puntuaciones);
        this.createBarChart();
      } else {
        alert('No se encontraron puntuaciones');
        this.route.navigateByUrl('/bienvenida');
      }
    });
  }

  ngAfterViewInit(): void {}

  createBarChart(): void {
    const labels = this.puntuaciones.map(medico => `${medico.nombre} ${medico.apellido} - ${medico.especialidad} `);
    const puntuaciones = this.puntuaciones.map(medico => medico.val_med || 0); // Si no tiene puntaje, usa 0

    new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Puntuaciones de Médicos',
          data: puntuaciones,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'; // Importa RouterModule
import { ReportesComponent } from './reportes.component';
import { InventarioComponent } from './inventario/inventario.component';
import { PrestamosComponent } from './prestamos/prestamos.component';
import { HistorialComponent } from './historial/historial.component';

// Define las rutas internas del módulo Reportes
const routes: Routes = [
  { path: '', component: ReportesComponent }, // Ruta por defecto
  { path: 'inventario', component: InventarioComponent },
  { path: 'prestamos', component: PrestamosComponent },
  { path: 'historial', component: HistorialComponent }
];

@NgModule({
  declarations: [
    ReportesComponent,
    InventarioComponent,
    PrestamosComponent,
    HistorialComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes) // Configura las rutas para este módulo
  ]
})
export class ReportesModule { }

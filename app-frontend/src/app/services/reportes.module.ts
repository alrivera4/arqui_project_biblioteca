import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'; // Importar RouterModule
import { ReportesComponent } from '../reportes/reportes.component';
import { InventarioComponent } from '../reportes/inventario/inventario.component';
import { PrestamosComponent } from '../reportes/prestamos/prestamos.component';
import { HistorialComponent } from '../reportes/historial/historial.component';

// Define las rutas internas del módulo Reportes
const routes: Routes = [
  { path: '', component: ReportesComponent },
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
    RouterModule.forChild(routes)
  ]
})
export class ReportesModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ModulosComponent } from './components/modulos/modulos.component';
import { AuthGuard } from './auth.guard';
import { ListComponent } from './components/libros/list/list.component';
import { AddComponent } from './components/libros/add/add.component';
import { EditComponent } from './components/libros/edit/edit.component';
import { RegistroUsuarioComponent } from './components/usuarios/registro-usuario/registro-usuario.component';
import { RegistroPrestamoComponent } from './components/prestamos/registro-prestamo/registro-prestamo.component';
import { DevolucionLibroComponent } from './components/prestamos/devolucion-libro/devolucion-libro.component';
import { ListarUsuariosComponent } from './components/usuarios/listar-usuarios/listar-usuarios.component';
import { PrestamosActivosComponent } from './components/reportes/prestamos-activos/prestamos-activos.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'modulos',
    component: ModulosComponent,
    canActivate: [AuthGuard],
    data: { roles: ['administrador', 'estudiante', 'profesor'] },
  },
  {
    path: 'libros',
    children: [
      { path: '', component: ListComponent },  // Para mostrar la lista de libros
      { path: 'add', component: AddComponent }, // Para agregar un libro
      { path: 'edit/:id', component: EditComponent }, // Para editar un libro
    ]
  },
  { path: '', redirectTo: '/libros', pathMatch: 'full' },

  {
    path: 'prestamos',
    children: [
      { path: 'registro', component: RegistroPrestamoComponent }, // Para registrar un préstamo
      { path: '', component: DevolucionLibroComponent }, // Para registrar la devolución de un libro
    ]
  },
  { path: '', redirectTo: '/prestamos', pathMatch: 'full' },

  {
    path: 'usuarios',
    children: [
      { path: 'registro', component: RegistroUsuarioComponent }, // Para registrar un préstamo
      { path: '', component: ListarUsuariosComponent }, // Para registrar la devolución de un libro
    ]
  },
  { path: '', redirectTo: '/usuarios', pathMatch: 'full' },
  {
    path: 'reportes',
    children: [
      { path: '', component: PrestamosActivosComponent }, // Para visualizar prestamos activos
     
    ]
  },
  { path: '', redirectTo: '/reportes', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

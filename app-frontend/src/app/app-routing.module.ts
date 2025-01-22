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
import { RegistrarBibliotecaComponent } from './components/bibliotecas/registrar-biblioteca/registrar-biblioteca.component';
import { ListarBibliotecasComponent } from './components/bibliotecas/listar-bibliotecas/listar-bibliotecas.component';
import { EditarBibliotecaComponent } from './components/bibliotecas/editar-biblioteca/editar-biblioteca.component';
import { Error404Component } from './components/error404/error404.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroUsuarioComponent },
  
  // Rutas protegidas por AuthGuard
  {
    path: 'modulos',
    component: ModulosComponent,
    canActivate: [AuthGuard],
    data: { roles: ['administrador', 'estudiante', 'profesor', 'bibliotecario'] },
  },
  {
    path: 'libros',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ListComponent },
      { path: 'add', component: AddComponent },
      { path: 'edit/:id', component: EditComponent },
    ],
  },

  {
    path: 'prestamos',
    canActivate: [AuthGuard],
    children: [
      { path: 'registro', component: RegistroPrestamoComponent },
      { path: '', component: DevolucionLibroComponent },
    ],
  },

  {
    path: 'usuarios',
    canActivate: [AuthGuard],
    children: [
      { path: 'registro', component: RegistroUsuarioComponent },
      { path: '', component: ListarUsuariosComponent },
    ],
  },

  {
    path: 'reportes',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: PrestamosActivosComponent },
    ],
  },

  {
    path: 'bibliotecas',
    children: [
      { path: 'registro', component: RegistrarBibliotecaComponent },
      { path: '', component: ListarBibliotecasComponent },
      { path: 'editar-biblioteca/:id', component: EditarBibliotecaComponent },
      
    ],
    data: { roles: ['administrador'] },
  },

  { path: '404', component: Error404Component },

  // Ruta para redirigir a la página principal si no se encuentra ninguna ruta
  { path: '', redirectTo: '/modulos', pathMatch: 'full' },

  // Captura de rutas no encontradas
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { LoginComponent } from './components/login/login.component';
import { ModulosComponent } from './components/modulos/modulos.component';
import { AuthGuard } from './auth.guard';
import { ListComponent } from './components/libros/list/list.component';
import { AddComponent } from './components/libros/add/add.component';
import { EditComponent } from './components/libros/edit/edit.component';


const routes: Routes = [
  { path: 'registro', component: RegistroUsuarioComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'modulos',
    component: ModulosComponent,
    canActivate: [AuthGuard],
    data: { roles: ['administrador'] },
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
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

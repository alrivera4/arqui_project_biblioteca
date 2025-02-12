import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModulosComponent } from './components/modulos/modulos.component';
import { ListComponent } from './components/libros/list/list.component';
import { AddComponent } from './components/libros/add/add.component';
import { EditComponent } from './components/libros/edit/edit.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegistroPrestamoComponent } from './components/prestamos/registro-prestamo/registro-prestamo.component';
import { DevolucionLibroComponent } from './components/prestamos/devolucion-libro/devolucion-libro.component';
import { RegistroUsuarioComponent } from './components/usuarios/registro-usuario/registro-usuario.component';
import { ListarUsuariosComponent } from './components/usuarios/listar-usuarios/listar-usuarios.component';
import { PrestamosActivosComponent } from './components/reportes/prestamos-activos/prestamos-activos.component';
import { RegistrarBibliotecaComponent } from './components/bibliotecas/registrar-biblioteca/registrar-biblioteca.component';
import { ListarBibliotecasComponent } from './components/bibliotecas/listar-bibliotecas/listar-bibliotecas.component';
import { EditarBibliotecaComponent } from './components/bibliotecas/editar-biblioteca/editar-biblioteca.component';

import { Error404Component } from './components/error404/error404.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ModulosComponent,
    ListComponent,
    AddComponent,
    EditComponent,
    NavbarComponent,
    RegistroPrestamoComponent,
    DevolucionLibroComponent,
    RegistroUsuarioComponent,
    ListarUsuariosComponent,
    PrestamosActivosComponent,
    RegistrarBibliotecaComponent,
    ListarBibliotecasComponent,
    EditarBibliotecaComponent,
    Error404Component
  
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

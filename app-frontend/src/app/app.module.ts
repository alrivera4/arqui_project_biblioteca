import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModulosComponent } from './components/modulos/modulos.component';
import { ListComponent } from './components/libros/list/list.component';
import { AddComponent } from './components/libros/add/add.component';
import { EditComponent } from './components/libros/edit/edit.component';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroUsuarioComponent,
    ModulosComponent,
    ListComponent,
    AddComponent,
    EditComponent,
    NavbarComponent,
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

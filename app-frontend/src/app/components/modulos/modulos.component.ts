import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modulos',
  templateUrl: './modulos.component.html',
  styleUrls: ['./modulos.component.css']
})
export class ModulosComponent {

   constructor( private router: Router) {}
  
    cerrarSesion(): void {
      this.router.navigate(['/login']);
    }

}

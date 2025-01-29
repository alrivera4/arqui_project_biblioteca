import { Component } from '@angular/core';

@Component({
  selector: 'app-error404',
  template: `
    <div style="text-align: center; margin-top: 50px;">
      <h1>Error 404</h1>
      <p>La página que buscas no existe.</p>
      <a routerLink="/login">Ir al login</a>
    </div>
  `,
})
export class Error404Component {}

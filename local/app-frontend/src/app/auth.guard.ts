import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const rutasPublicas = ['login', 'registro']; // Definir rutas públicas
    const esRutaPublica = rutasPublicas.some(ruta => state.url.includes(ruta));

    // Si el usuario no está autenticado
    if (!this.authService.estaAutenticado()) {
      if (esRutaPublica) {
        // Permitir acceso a rutas públicas
        return true;
      }
      // Redirigir al login si intenta acceder a una ruta protegida
      return this.router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
    }

    // Si está autenticado pero accede a una ruta pública, redirigir a la página principal
    if (esRutaPublica) {
      return this.router.createUrlTree(['/']);
    }

    // Permitir acceso a rutas protegidas
    return true;
  }
}

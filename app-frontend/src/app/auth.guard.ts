import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const rutasPublicas = ['login', 'registro']; // Rutas públicas
    const esRutaPublica = rutasPublicas.some(ruta => state.url.includes(ruta));

    // Si no está autenticado y está accediendo a una ruta pública
    if (!this.authService.estaAutenticado()) {
      if (esRutaPublica) {
        return true;  // Permitir acceso a rutas públicas (login, registro)
      }
      // Si está accediendo a una ruta protegida, redirigir a login
      this.router.navigate(['/login']);
      return false;
    }

    // Si está autenticado, permitir acceso
    return true;
  }
}




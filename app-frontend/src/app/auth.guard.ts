import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const tipoUsuario = this.authService.getTipoUsuario();

    // Obtener los roles permitidos desde la configuración de la ruta
    const rolesPermitidos = route.data['roles'] as Array<string>;

    if (rolesPermitidos.includes(tipoUsuario || '')) {
      return true; // Permitir acceso
    }

    // Redirigir si no tiene permiso
    alert('No tienes permiso para acceder a esta página.');
    this.router.navigate(['/login']);
    return false;
  }
}

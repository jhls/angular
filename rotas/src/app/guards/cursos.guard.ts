import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from '../login/auth.service';

@Injectable()
export class CursosGuard implements CanActivateChild{

  constructor(
    private authService:AuthService,
    private router: Router
  ) { }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Observable<boolean> {

      if(this.authService.usuarioEstaAutenticado()){
        return true;
      }

      this.router.navigate(['/login']);
      return false;
  }

}

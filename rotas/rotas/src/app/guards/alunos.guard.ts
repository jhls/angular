import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../login/auth.service";

@Injectable()
export class AlunosGuard implements CanActivateChild{

  constructor(
    private authService:AuthService,
    private router: Router
  ) { }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Observable<boolean>  {

      console.log(childRoute);
      console.log(state);

      if(state.url.includes('edita')){
        alert('Usuário sem acesso');
        return false;
      }

      return true;
  }

}

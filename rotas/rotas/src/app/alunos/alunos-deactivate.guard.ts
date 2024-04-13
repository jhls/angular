import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AlunoFormComponent } from './aluno-form/aluno-form.component';
import { Observable } from 'rxjs';
import { IFormCanDeactivate } from '../guards/iform-candeativate';

@Injectable()
export class AlunosDeactivateGuard implements CanDeactivate<IFormCanDeactivate>{
  canDeactivate(
    component: IFormCanDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean | Observable<boolean>{

    return component.podeDesativar();
  }


}


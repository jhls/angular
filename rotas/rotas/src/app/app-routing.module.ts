import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { CursosGuard } from './guards/cursos.guard';
import { AlunosGuard } from './guards/alunos.guard';

const routes: Routes = [
  { path: 'cursos',
      loadChildren: () => import('./cursos/cursos.module').then(m => m.CursosModule),
      canActivate: [AuthGuard],
      canActivateChild: [CursosGuard],
      canLoad: [AuthGuard]
  },
  { path: 'alunos',
      loadChildren: () => import('./alunos/alunos.module').then(m => m.AlunosModule),
      canActivate: [AuthGuard],
      canLoad: [AuthGuard]
  },
  { path: '',
      component: HomeComponent,
      canActivate: [AuthGuard]
  },
  { path: 'login' , component: LoginComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

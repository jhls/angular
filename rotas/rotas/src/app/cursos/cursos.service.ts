import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor() { }

  getCursos(){
    return [
      {id:1, nome: 'Angular 2'},
      {id:2, nome: 'Java'}
    ];
  }

  getCurso(id: number){
    let cursos = this.getCursos();
    return cursos.find(curso => curso.id == id);
  }
}

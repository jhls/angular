import { Component, OnInit } from '@angular/core';
import { CursosService } from '../cursos/cursos.services';

@Component({
  selector: 'app-criar-curso',
  templateUrl: './criar-curso.component.html',
  styleUrls: ['./criar-curso.component.scss'],
  providers: [CursosService]
})
export class CriarCursoComponent implements OnInit {

  cursos: String[]=[];

  constructor(private cursosService:CursosService) { }

  ngOnInit(): void {
    this.cursos = this.cursosService.getCursos();
  }

  onAddCurso(curso:string){
    this.cursosService.addCurso(curso);
  }

}

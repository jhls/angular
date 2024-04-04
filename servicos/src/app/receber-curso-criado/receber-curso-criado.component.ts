import { Component, OnInit } from '@angular/core';
import { CursosService } from '../cursos/cursos.services';

@Component({
  selector: 'app-receber-curso-criado',
  templateUrl: './receber-curso-criado.component.html',
  styleUrls: ['./receber-curso-criado.component.scss']
})
export class ReceberCursoCriadoComponent implements OnInit {

  curso: string = "";
  constructor(private cursoService:CursosService) { }

  ngOnInit(): void {
    this.cursoService.emitirCursoCriado.subscribe(
      cursoCriado => this.curso = cursoCriado
    );
  }

}

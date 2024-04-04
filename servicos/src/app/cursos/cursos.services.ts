import { EventEmitter, Injectable } from "@angular/core";
import { LogService } from "../shared/log.service";

@Injectable()
export class CursosService{

  emitirCursoCriado = new EventEmitter<string>();
  static criouNovoCurso = new EventEmitter<string>();

  private cursos: string [] = ['Angular 2','Java','Phonegap'];

  constructor(private logService:LogService){
    console.log('CursosService');
  }

  getCursos(){
    this.logService.consoleLog("Obtendo Lista de Cursos!");
    return this.cursos;
  }

  addCurso(curso:string){
    this.logService.consoleLog(`Criando um novo Curso! ${curso}`);
    this.cursos.push(curso);
    this.emitirCursoCriado.emit(curso);
    CursosService.criouNovoCurso.emit(curso);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlunosService } from '../alunos.service';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.scss']
})
export class AlunoFormComponent implements OnInit {

  aluno: any ={};
  inscricao!: Subscription;
  private formMudou: boolean = false;

  constructor(
    private route:ActivatedRoute,
    private alunosService: AlunosService
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: any) =>{
        let param = params['id'];
        this.aluno = this.alunosService.getAluno(param);

        if(this.aluno === undefined || this.aluno ===null){
          this.aluno = {};
        }
      }
    );
  }

  onInput(){
    this.formMudou = true;
    console.log('mudou');
  }

  podeMudarRota(){
    if(this.formMudou){
      return confirm('Gostaria de mudar de página?');
    }
    return true;
  }

  ngOnDestroy(): void {
    if(this.inscricao !== undefined)
      this.inscricao.unsubscribe();
  }
}

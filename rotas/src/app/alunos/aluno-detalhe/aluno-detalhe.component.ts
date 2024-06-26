import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlunosService } from '../alunos.service';
import { Aluno } from '../aluno';

@Component({
  selector: 'app-aluno-detalhe',
  templateUrl: './aluno-detalhe.component.html',
  styleUrls: ['./aluno-detalhe.component.scss']
})
export class AlunoDetalheComponent implements OnInit {



  aluno!: Aluno;
  inscricao!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private alunosService: AlunosService,
    private router: Router
    ) { }

  ngOnInit(): void {
    /*
    this.inscricao = this.route.params.subscribe(
      (params:any) =>{
        let id = params['id'];
        this.aluno = this.alunosService.getAluno(id);
      }
    );*/
    this.inscricao = this.route.data.subscribe(
      (info) => {
        console.log(info);
        this.aluno = info['aluno'];
      }
    );
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }

  editarContato(){
    this.router.navigate(['/alunos',this.aluno.id,'editar']);
  }

}

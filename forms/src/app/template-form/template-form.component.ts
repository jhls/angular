import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {map} from 'rxjs/operators'
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: null,
    email: null
  }

  constructor(
    private http : HttpClient,
    private consultaCepService: ConsultaCepService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(formulario:any){
    console.log(formulario.value);
    this.http.post('https://httpbin.org/post',JSON.stringify(formulario.value))
      .pipe(map(resp => resp))
      .subscribe(dados =>{
        console.log(dados);
        formulario.form.reset();
      });
  }

  verificaValidTouched(campo: any){
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo:any){
    return {
        'has-error': this.verificaValidTouched(campo),
        'has-feedback': this.verificaValidTouched(campo)
    }
  }

  consultaCEP(event :any, form :NgForm){


    var cep = event.value;
    cep = cep.replace(/\D/g,'');

    if(cep != null && cep !== ""){
      this.consultaCepService
      .consultaCEP(cep)?.subscribe(dados => this.populaDadosForm(dados,form));
    }
  }

  populaDadosForm(dados:any, formulario:NgForm){
    formulario.form.patchValue({
      endereco: {
        rua: dados.logradouro,
        cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    })
  }

  resetaDadosFormulario( formulario: NgForm){
    formulario.form.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    })
  }


}

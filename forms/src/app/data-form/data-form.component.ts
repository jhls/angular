import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent implements OnInit {

  formulario! : FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient

  ) { }

  ngOnInit(): void {

    /*
    this.formulario = new FormGroup({
      nome: new FormControl(null),
      email: new FormControl(null)
    });*/

    this.formulario = this.formBuilder.group({
      nome: [null,[Validators.required]],
      email: [null,[Validators.required,Validators.email]],
      endereco: this.formBuilder.group({
        cep: [null,[Validators.required]],
        numero: [null,[Validators.required]],
        complemento:[null],
        rua: [null,[Validators.required]],
        bairro: [null,[Validators.required]],
        cidade: [null,[Validators.required]],
        estado: [null,[Validators.required]]
      })
    })
  }

  onSubmit(){
    console.log(this.formulario);

    this.http.post('https://httpbin.org/post',JSON.stringify(this.formulario.value))
      .pipe(map(resp => resp))
      .subscribe(dados => {

        console.log(dados);

        //reseta o form
        this.resetar();

      },
      (erro: any) => alert('erro')
    );
  }

  resetar(){
    this.formulario.reset();
  }

  verificaValidTouched(campo: string){
    return !this.formulario.get(campo)?.valid && !!this.formulario.get(campo)?.touched;
  }

  verificaEmailInvalido(){
    let campoEmail = this.formulario.get('email');
    if(campoEmail?.errors){
       return campoEmail.hasError('email') && campoEmail.touched;
    }else{
      return false;
    }
  }

  aplicaCssErro(campo : string){
    return {
        'has-error': this.verificaValidTouched(campo),
        'has-feedback': this.verificaValidTouched(campo)
    }
  }

  consultaCEP(){
    var cep = this.formulario.get('endereco.cep')?.value;
    cep = cep.replace(/\D/g,'');

    if(cep  != ""){
      var validaCep = /^[0-9]{8}$/;
      if(validaCep.test(cep)){
        this.resetaDadosFormulario();
        this.http.get(`//viacep.com.br/ws/${cep}/json/`)
          .pipe(map((dados: any) => dados))
          .subscribe(dados => this.populaDadosForm(dados));
      }

      //this.formulario.get('nome')?.setValue('teste');
    }
  }


  populaDadosForm(dados:any){
    this.formulario.patchValue({
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

  resetaDadosFormulario(){
    this.formulario.patchValue({
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

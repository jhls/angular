import { DropdownService } from './../shared/services/dropdown.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { EstadoBr } from '../shared/models/estado-br';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { Observable } from 'rxjs';
import { FormValidations } from '../shared/form-validations';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss'],
})
export class DataFormComponent implements OnInit {

  formulario!: FormGroup;
  estados!: Observable<EstadoBr[]>;
  cargos!:any[];
  tecnologias!:any[];
  newsletterOp!: any[];
  frameworks = ['Angular','React','Vue','Sencha'];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropDownService: DropdownService,
    private consultaCepService: ConsultaCepService
  ) {}

  ngOnInit(): void {

    this.estados = this.dropDownService.getEstadosBr();
    this.cargos = this.dropDownService.getCargos();
    this.tecnologias = this.dropDownService.getTecnologias();
    this.newsletterOp = this.dropDownService.getNewsletter();
    /*
    this.dropDownService.getEstadosBr().subscribe((dados) => {
      this.estados = dados;
      console.log(dados);
    });*/

    /*
    this.formulario = new FormGroup({
      nome: new FormControl(null),
      email: new FormControl(null)
    });*/

    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      confirmarEmail: [null, [FormValidations.equalsTo('email')]],
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
        numero: [null, [Validators.required]],
        complemento: [null],
        rua: [null, [Validators.required]],
        bairro: [null, [Validators.required]],
        cidade: [null, [Validators.required]],
        estado: [null, [Validators.required]],
      }),
      cargo: [null],
      tecnologias: [null],
      newsletter: ['s'],
      termos: [null, Validators.requiredTrue],
      frameworks: this.buildFramework()
    });
  }

  buildFramework(){

    const valor = this.frameworks.map(v => new FormControl(false));
    return this.formBuilder.array(valor,FormValidations.requiredMinCheckBox(1));

  }

  frameworksArrayControls() {
    return (this.formulario.get('frameworks') as FormArray).controls;
  }

  onSubmit() {
    console.log(this.formulario);

    let valueSubmit = Object.assign({}, this.formulario.value);

    valueSubmit = Object.assign(valueSubmit,{
      frameworks: valueSubmit.frameworks.map((v: any,i:number)=>{
        v? this.frameworks[i] : null
      })
      .filter((v: any) => v !== null)
    });

    if (this.formulario.valid) {
      this.http
        .post('https://httpbin.org/post', JSON.stringify(valueSubmit))
        .pipe(map((resp) => resp))
        .subscribe(
          (dados) => {
            console.log(dados);

            //reseta o form
            this.resetar();
          },
          (erro: any) => alert('erro')
        );
    } else {
      console.log('formulario invalido');
      Object.keys(this.formulario.controls).forEach((campo) => {
        console.log(campo);
        const controle = this.formulario.get(campo);
        controle?.markAsDirty();
      });
    }
  }

  resetar() {
    this.formulario.reset();
  }

  verificaValidTouched(campo: string) {
    return (
      !this.formulario.get(campo)?.valid &&
      (!!this.formulario.get(campo)?.touched ||
        !!this.formulario.get(campo)?.dirty)
    );
  }

  verificaEmailInvalido() {
    let campoEmail = this.formulario.get('email');
    if (campoEmail?.errors) {
      return campoEmail.hasError('email') && campoEmail.touched;
    } else {
      return false;
    }
  }

  aplicaCssErro(campo: string) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo),
    };
  }

  consultaCEP() {
    var cep = this.formulario.get('endereco.cep')?.value;
    cep = cep.replace(/\D/g, '');

    if (cep != null && cep !== '') {
      this.consultaCepService
        .consultaCEP(cep)
        ?.subscribe((dados) => this.populaDadosForm(dados));
    }
    //this.formulario.get('nome')?.setValue('teste');
  }

  populaDadosForm(dados: any) {
    this.formulario.patchValue({
      endereco: {
        rua: dados.logradouro,
        cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
      },
    });
  }

  resetaDadosFormulario() {
    this.formulario.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null,
      },
    });
  }

  setarCargo(){
    const cargo ={ nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl' };
    this.formulario.get('cargo')?.setValue(cargo);
  }

  setarTecnologias(){
    this.formulario.get('tecnologias')?.setValue(['java','javascript','php']);
  }

  compararCargos(o1: any, o2:any){
    return o1 && o2 ? (o1.nome === o2.nome && o1.nivel === o2.nivel): o1 === o2;
  }

  verificaRequired(campo:string){
    return this.formulario.get(campo)?.hasError('required') &&
    (!!this.formulario.get(campo)?.touched ||
      !!this.formulario.get(campo)?.dirty);
  }

  // compararTecnologias(o1: any, o2:any){
  //   return o1 && o2 ? (o1.nome === o2.nome && o1.desc === o2.desc): o1 === o2;
  // }
}

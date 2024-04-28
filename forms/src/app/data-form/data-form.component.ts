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
      email: [null,[Validators.required,Validators.email]]
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

}

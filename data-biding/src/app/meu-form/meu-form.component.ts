import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meu-form',
  templateUrl: './meu-form.component.html',
  styleUrls: ['./meu-form.component.scss']
})
export class MeuFormComponent implements OnInit {



  constructor() { }

  ngOnInit(): void {
  }

  nome :string = 'abc';

  pessoa: any = {
    nome: 'def',
    idade: 18
  }


}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.scss']
})
export class DataBindingComponent implements OnInit {

  url: string = 'http://jean.com';
  cursoAngular: boolean = true;
  urlImagem: string = 'https://files.tecnoblog.net/wp-content/uploads/2019/05/banco-imagem-gratuito-unsplash-700x467.jpeg';
  valorAtual: string = '';
  valorSalvo: string = '';
  isMouseOver: boolean = false;
  nome:string = 'abc';

  nomeDoCurso: string = 'Angular';


  valorInicial:number = 15;

  pessoa: any = {
    nome: 'def',
    idade: 18
  }


  constructor() { }

  ngOnInit(): void {
  }

  getValor(){
    return 1;
  }

  getCurtirCurso(){
    return true;
  }

  botaoClicado(){
    alert('Botão Clicado');
  }

  onKeyUp(evento:KeyboardEvent){
    this.valorAtual = (<HTMLInputElement>evento.target).value;
  }
  salvarValor(valor:any){
    this.valorSalvo = valor;
  }

  onMouseOverOut(){
    this.isMouseOver = !this.isMouseOver;
  }

  onMudouValor(evento: any){
    console.log(evento.novoValor);
  }
}

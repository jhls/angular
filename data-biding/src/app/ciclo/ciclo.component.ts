import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-ciclo',
  templateUrl: './ciclo.component.html',
  styleUrls: ['./ciclo.component.scss']
})
export class CicloComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked,OnDestroy{


  @Input() valorInicial: number =10;

  constructor() {

    this.log('constructor');
  }

  ngOnInit(): void {
    this.log('ngOnInit');
  }

  ngOnChanges(): void {
    this.log('ngOnChanges');
  }

  ngDoCheck(): void {
    this.log('ngDoCheck');
  }

  ngAfterContentInit(): void {
    this.log('ngAfterContentInit');
  }

  ngAfterContentChecked(): void {
    this.log('ngAfterContentChecked');
  }

  ngAfterViewInit(): void {
    this.log('ngAfterViewInit');
  }

  ngAfterViewChecked(): void {
    this.log('ngAfterViewChecked');
  }

  ngOnDestroy(): void {
    this.log('ngOnDestroy');
  }

  private log(log:string):void{

    console.log(log);
  }

}

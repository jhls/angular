import {
  Directive,
  HostListener,
  ElementRef,
  Renderer2,
  HostBinding,
  Input,
} from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective {

  @HostBinding('style.backgroundColor') backgroundColor: string = 'null';

  @Input() defaultColor: string = 'white';
  @Input('highlight') highlightColor : string = 'yellow';

  constructor(
    //private _elementRef: ElementRef,
    //private _renderer : Renderer2
    ) { }

    @HostListener('mouseenter') onMouseOver(){
     // this._renderer.setStyle(this._elementRef.nativeElement,'background-color','yellow');
     this.backgroundColor = this.highlightColor;
    }

    @HostListener('mouseleave') onMouseLeave(){
      //this._renderer.setStyle(this._elementRef.nativeElement,'background-color','white');
      this.backgroundColor = this.defaultColor;
    }

    ngOnInit(): void {
      this.backgroundColor = this.defaultColor;

    }

}

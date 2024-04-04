import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroArray',
  pure: true
})
export class FiltroArrayPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    //console.log("Arg "+ args );
    console.log(value);
    if(value.length  === 0 || args === undefined){
      return value;
    }

    let filter = (args[0] as string).toLocaleLowerCase();
    return value.filter(
      (v:any) => v.toLocaleLowerCase().indexOf(filter) != -1
    );
  }

}

import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn } from "@angular/forms";

export class FormValidations {
  static requiredMinCheckBox(min = 1): ValidatorFn{

    const validator: ValidatorFn = (formArray: AbstractControl) => {
      if(formArray instanceof FormArray){

        const totalChecked = formArray.controls
        .map(v => v.value)
        .reduce((total,current)=> current ? total + current : total ,0)

        return totalChecked >= min ? null : { required: true };

      };
      throw new Error('formArray is not an instance of FormArray');
    };
    return validator;
  }

  static cepValidator(control: FormControl){

    const cep = control.value;

    if(cep && cep.value !==  ''){
      const validaCep = /^[0-9]{8}$/;
      return validaCep.test(cep.value) ? null : { cepInvalido : true };

    }
    return null;
  }

  static equalsTo(otherField:string){

    if(!otherField){
      throw new Error('É necessário informar um campo!')
    }

    const validator: ValidatorFn = (formControl: AbstractControl) => {
      if(formControl instanceof FormControl){

        if(!formControl.root || !(<FormGroup>formControl.root).controls){
          return null;
        }

        const fieldPai = (<FormGroup>formControl.root).get(otherField);

        if(!fieldPai){
          throw new Error('É necessário informar um campo válido!')
        }

        return formControl.value === fieldPai.value? null: {equalsTo:otherField};

      }
      throw new Error('formControl is not an instance of FormControl');
    }
    return validator;
  }
}

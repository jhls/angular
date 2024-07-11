import { AbstractControl, FormArray, FormControl, ValidatorFn } from "@angular/forms";

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
}

import { AbstractControl } from '@angular/forms';

export default class CustomValidators {
  static matchPasswords(form: AbstractControl) {
    const password = form.get('password').value;
    const repeatPassword = form.get('repeatPassword').value;

    if (password !== repeatPassword) {
      form.get('repeatPassword').setErrors({ matchPasswords: true });
    } else {
      return null;
    }
  }
}
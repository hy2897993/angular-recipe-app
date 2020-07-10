import { FormControl, Validators, FormGroup } from '@angular/forms';

export class RegisterForm {
form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      // Validators.minLength(20),
    ]),
    
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    confirm_password: new FormControl('', [
      this.checkPasswords
    ])
    
   });

   checkPasswords(group: FormGroup) { // here we have the 'passwords' group
        let pass = group.get('password').value;
        let confirmPass = group.get('confirm_password').value;
        return pass === confirmPass ? null : { notSame: true }     
    }
}
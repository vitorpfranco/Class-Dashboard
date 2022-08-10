import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';
export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return {
        passwordsDontMatch: true
      }
    }
    return null;
  }
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)

  }, { validators: passwordsMatchValidator() })

  constructor(private authenticationService: AuthenticationService, private router: Router, private toast: HotToastService, private userService: UsersService) { }

  ngOnInit(): void {
  }

  get name() {
    return this.signUpForm.get('name');
  }
  get email() {
    return this.signUpForm.get('email');
  }
  get password() {
    return this.signUpForm.get('password');
  }

  get passwordConfirm() {
    return this.signUpForm.get('passwordConfirm');
  }

  register() {
    if (!this.signUpForm.valid) return
    const { name, email, password } = this.signUpForm.value
    this.authenticationService.singUp(email, password).pipe(
      switchMap(({ user: { uid } }) => this.userService.addUser({ uid, email, displayName: name })), this.toast.observe({
        success: 'Parabens! Você foi cadastrado',
        loading: "Registrando",
        error: ({ message }) => `${message}`
      })
    ).subscribe(() => {
      this.router.navigate(['/home']);
    })
  }
}

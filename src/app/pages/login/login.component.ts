import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  constructor(private authenticationService: AuthenticationService, private router: Router, private toast: HotToastService) { }

  ngOnInit(): void {
  }

  get email() {
    return this.loginForm.get('email')
  }
  get password() {
    return this.loginForm.get('password')
  }

  login() {
    if (!this.loginForm.valid) {
      return;
    }
    const { email, password } = this.loginForm.value;
    this.authenticationService.login(email, password).pipe(
      this.toast.observe({
        success: 'Login realizado com sucesso',
        loading: "Carregando",
        error: "ERROR: Não foi possivel realizar o login"
      })
    ).subscribe(() => {
      this.router.navigate(['/home']);
    })
  }
}

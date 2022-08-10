import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  user$ = this.userService.currentUserProfile$;
  constructor(private authenticationService: AuthenticationService, private router: Router, private userService: UsersService) {

  }
  logout() {
    this.authenticationService.logout().subscribe(() => {
      this.router.navigate(['']);
    })
  }
}

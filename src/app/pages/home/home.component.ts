import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  User$ = this.authenticationService.currentUser$;
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

}

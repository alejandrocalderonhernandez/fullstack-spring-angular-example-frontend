import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  constructor( protected loginService: LoginService ) { }

  ngOnInit() {
  }

  protected logout(): void {
    this.loginService.logout();
  }

}

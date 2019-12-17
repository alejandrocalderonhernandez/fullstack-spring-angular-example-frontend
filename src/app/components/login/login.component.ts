import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from 'src/app/models/user';
import { SuccessMesages } from 'src/app/utils/messages/succes-messages';
import { ErrorMessages } from 'src/app/utils/messages/error-messages';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private messagesSuccess = new SuccessMesages();
  private messagesError = new ErrorMessages();
  protected title = 'Login';
  protected user: User;
  protected formUser: FormGroup;

  constructor( private loginService: LoginService, private router: Router ) {
    this.user = new User();
  }


  ngOnInit() {
    this.setForm();
    if ( this.loginService.isAuthenticated() ) {
      this.router.navigate(['/clients']);
    }
  }

  protected login(): void {
    if ( this.user.username == null || this.user.password == null ) {
      this.messagesError.showBasicMessage('The userneme or password cant be void');
      return;
    }

    this.loginService.login( this.user ).subscribe( responce => {
      const user = this.loginService.getUser();
      this.router.navigate(['/clients']);
      this.messagesSuccess.showBasicMessage(`Welcome ${user.username}`);
      this.loginService.saveToken( responce.access_token );
      this.loginService.saveUser( responce.access_token );
    }, error => {
      if (error.status == 400 ) {
        this.messagesError.showBasicMessage('bad credentials');
      }
    });
  }

  private setForm(): void {
    this.formUser = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(15)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(15)
      ])
    });
  }

}

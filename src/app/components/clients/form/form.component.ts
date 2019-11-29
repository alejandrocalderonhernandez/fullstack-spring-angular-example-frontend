import { Component, OnInit } from '@angular/core';
import { ClientModel } from 'src/app/models/client-model';
import { ClientService } from 'src/app/services/client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SuccessMesages } from 'src/app/utils/messages/succes-messages';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private client: ClientModel;
  private messages = new SuccessMesages();
  public formClient: FormGroup;
  public title = 'Client';
  private errors: string[];

  constructor( private service: ClientService, private router: Router,
               private activateRoutr: ActivatedRoute ) { }

  ngOnInit() {
    this.loadClient();
    this.setForm();
  }

  public createClient(): void {
    this.service.createClient(this.client).subscribe(
      responce => { this.router.navigate(['/clients']);
                    this.messages.basicSuccesMessage();
      }, error => {
        this.errors = error.error.errors as string[];
        console.log('Error status: ' + error.status());
      });
  }

  public loadClient(): void {
    let id: number;
    this.activateRoutr.params.subscribe( params => {
      id = params['id']
      if(id !== undefined && id !== null) {
        this.service.getClient(id).subscribe( client => this.client );
        this.messages.basicSuccesMessage();
      }
    });
  }

  public updateClient(): void {
    this.service.updateClient(this.client).subscribe(
      responce => {
        this.router.navigate(['/clients']);
        this.messages.showBasicMessage(this.client.id.toString());
      }, error => {
        this.errors = error.error.errors as string[];
        console.log('Error status: ' + error.status());
      });
  }

  private setForm(): void {
    this.formClient = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(15)
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(15)
      ]),
      email: new FormControl('',[
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(30),
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
      ]),
      createAt: new FormControl('',[])
    });
  }
}

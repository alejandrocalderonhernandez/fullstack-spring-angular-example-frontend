import { Component, OnInit } from '@angular/core';
import { ClientModel } from 'src/app/models/client-model';
import { ClientService } from 'src/app/services/client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private client: ClientModel;
  private title = 'Create client';

  constructor( private service: ClientService, private router: Router,
               private activateRoutr: ActivatedRoute ) { }

  ngOnInit() {
    this.loadClient();
  }

  public createClient(): void {
    this.service.createClient(this.client).subscribe(
      responce => this.router.navigate(['/clients'])
    );
  }

  public loadClient(): void {
    let id: number;
    this.activateRoutr.params.subscribe( params => {
      id = params['id']
      if(id !== undefined) {
        this.service.getClient(id).subscribe( client => this.client );
        Swal.fire({
          title: 'Success',
          text: 'Cliente creado satifactoriamente',
          icon: 'success',
        });
      }
    });
  }

  public updateClient(): void {
    this.service.updateClient(this.client).subscribe(
      responce => {
        this.router.navigate(['/clients']);
        Swal.fire({
          title: 'Success',
          text: `El cliente con id ${responce.id} se a actualizado correctamente`,
          icon: 'success',
        });
      });

  }
}

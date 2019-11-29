import { Component, OnInit } from '@angular/core';
import { ClientModel } from 'src/app/models/client-model';
import { ClientService } from 'src/app/services/client.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html'
})
export class ClientsComponent implements OnInit {

  clients: ClientModel[] = [];
  paginator: any;
  clientSelected: ClientModel;

  constructor( private service: ClientService,
               private router: ActivatedRoute,
               private modalService: ModalService ) { }

  ngOnInit() {
    this.router.paramMap.subscribe( params => {
      let page =  +params.get('page');
      if ( !page ) {
        page = 0;
      }
      this.callService( page );
    });
  }

  public delete( client: ClientModel ): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `Delete ${client.name} ${client.lastName}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.service.deleteClient(client.id).subscribe(
          responce => {
            this.clients.filter(clientInList => clientInList !== client);
          });
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      }
    });
  }

  public openModal( client: ClientModel ): void {
    this.clientSelected = client;
    this.modalService.openModal();
  }

  private callService( page: number ): void {
    this.service.getAllClients( page ).subscribe( responce => {
      this.clients = responce.content as ClientModel[];
      this.paginator = responce;
    });
  }
}

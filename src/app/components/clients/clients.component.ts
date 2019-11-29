import { Component, OnInit } from '@angular/core';
import { ClientModel } from 'src/app/models/client-model';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html'
})
export class ClientsComponent implements OnInit {

  clients: ClientModel[];

  constructor( private service: ClientService) { }

  ngOnInit() {
    this.service.getAllClients().subscribe(
      clientsResponce => this.clients = clientsResponce
    );

    console.log(this.clients);
  }

}

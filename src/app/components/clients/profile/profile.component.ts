import { Component, OnInit, Input } from '@angular/core';
import { ClientModel } from 'src/app/models/client-model';
import { ClientService } from 'src/app/services/client.service';
import { SuccessMesages } from 'src/app/utils/messages/succes-messages';
import { ErrorMessages } from 'src/app/utils/messages/error-messages';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input()
  client: ClientModel;

  title: 'client';
  private photoSelected: File;
  private messagesSuccess = new SuccessMesages();
  private messagesError = new ErrorMessages();
  protected progress = 0;
  num = 1;

  constructor( private service: ClientService,
               private modalService: ModalService ) { }

  ngOnInit() {
  }


  public selectPhoto( event ): void {
    if ( this.photoSelected.type.indexOf('image') > 0 ) {
      this.photoSelected = event.target.files[0];
      this.progress = 0;
    } else {
      this.messagesError.showBasicMessage('Formato no valido');
      this.photoSelected = null;
    }
  }

  public uploadPhoto(): void {
    if ( !this.photoSelected ) {
      this.messagesError.showBasicMessage('Seleccione una foto');
    } else {
      this.service.uploadImg(this.photoSelected, this.client.id)
      .subscribe( event => {
        if ( event.type === HttpEventType.UploadProgress ) {
          this.progress = Math.round(event.loaded / event.total) * 100;
        } else if ( event.type === HttpEventType.Response ) {
          const responce: any = event.body;
          this.client = responce.client as ClientModel;
          this.messagesSuccess.basicSuccesMessage();
        }
      });
    }
  }

  public closeModal(): void {
    this.modalService.closeModal();
    this.photoSelected = null;
    this.progress = 0;
  }

}

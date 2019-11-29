import { GenericMessages } from '../generic-messages/generic.messages';
import { MessageModel } from 'src/app/models/message.model';
import Swal from 'sweetalert2';

export class ErrorMessages extends GenericMessages {

    messageModel = new MessageModel('error', 'Oops...', 'message error: ');

    public showBasicMessage(message: string): void {
       Swal.fire({
        icon: this.messageModel.icon,
        title: this.messageModel.title,
        text: `${this.messageModel.title}${message}`
       });
    }

}

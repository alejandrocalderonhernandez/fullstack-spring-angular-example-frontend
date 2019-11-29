import { MessageModel } from 'src/app/models/message.model';
import Swal from 'sweetalert2';

export abstract class GenericMessages {

    private model: MessageModel;

    public basicSuccesMessage(): void {
        Swal.fire({
            icon: 'success',
            title: 'Success',
          });
    }

    public abstract showBasicMessage( messaage: string ): void;
}

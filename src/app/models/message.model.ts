
export class MessageModel {
    icon: string;
    title: string;
    text: string;

    constructor( icon: string, title: string, text: string ) {
        this.icon = icon;
        this.title = title;
        this.text = text;
    }
}

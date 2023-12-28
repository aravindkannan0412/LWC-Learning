import { LightningElement,api } from 'lwc';

export default class QaGoogleActionLWC extends LightningElement {

    @api recordId
    @api invoke(){
        console.log("invoke",this.recordId);
        window.open("https://google.com","_blank")
    }
}
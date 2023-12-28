import { LightningElement } from 'lwc';

export default class C2pParentComponent extends LightningElement {
    showModal=false;
    message='';
    displayModal(){
        this.showModal=true;
        message='';
    }

    closeHandler(event){
        this.showModal=false;
        this.message=event.detail;

    }

    bubbleHandler(event){
        console.log(`bubbled handler call ${event.target}`);
    }
}
import { LightningElement } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent'
export default class SrShowNotificationToastLWCDemo extends LightningElement {

    toastHandler(){
        this.showToast('Success','{0} Account Created!! {1}','success','dismissable');
    }
    toastHandlerTwo(){
        this.showToast('Error!!','Account Creation failed!!','error','pester');
    }
    toastHandlerThree(){
        this.showToast('Warning!!','password should be 15 characters','warning','sticky');
    }
    toastHandlerFour(){
        this.showToast('info!!','summer 24 release is upcoming','info','sticky');
    }

    showToast(title,message,variant,mode){
        const evt=new ShowToastEvent({
           title,message,variant,mode,messageData:[
            'salesforce',{
                url:'http://www.salesforce.com/',
                label:'Click here'
            }
           ]
        });
        this.dispatchEvent(evt);
    }
}
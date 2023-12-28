import { LightningElement,wire } from 'lwc';
import SAMPLEMC from "@salesforce/messageChannel/SampleMessageChannel__c"
import { APPLICATION_SCOPE,publish,subscribe,unsubscribe,MessageContext } from 'lightning/messageService'; //all APIs of LMS
export default class LmsComponentA extends LightningElement {
    inputvalue
    //wire adapter with me message contect to get information of all Lwc using this message serive

    @wire(MessageContext)
    context

    inputHandler(event){
        this.inputvalue=event.target.value;
    }

    publishMessage(){
        const message={
            lmsData:{
                value:this.inputvalue
            }
        }
        publish(this.context,SAMPLEMC,message);
    }
}
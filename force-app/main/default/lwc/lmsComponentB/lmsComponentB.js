import { LightningElement,wire } from 'lwc';
import SAMPLEMC from "@salesforce/messageChannel/SampleMessageChannel__c"
import { APPLICATION_SCOPE,publish,subscribe,unsubscribe,MessageContext } from 'lightning/messageService'; 

export default class LmsComponentB extends LightningElement {

    //subscribe(messagecontect,messgaechannel,listener,subscripterOptions)
    recieveMessage
    subscribtion
    @wire(MessageContext)
    context

    connectedCallback(){
        this.subscribeMessage();
    }

    subscribeMessage(){
      this.subscribtion=  subscribe(this.context,SAMPLEMC,(message)=>{this.handleMessage(message)},{scope:APPLICATION_SCOPE})
    }

    handleMessage(message){
        this.recieveMessage=message.lmsData.value?message.lmsData.value:"No Message Published "
    }

    unsubscribeHandler(){
        unsubscribe(this.subscribtion);
        this.subscribtion=null
    }
}
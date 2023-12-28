import { LightningElement,wire } from 'lwc';
import getCars from '@salesforce/apex/carhubController.getCars';
import CARS_FILTERED_MESSAGE from '@salesforce/messageChannel/CarsFiltered__c'
import CAR_SELECTED_MESSAGE from '@salesforce/messageChannel/CarSelected__c'
import { APPLICATION_SCOPE,publish,subscribe,unsubscribe,MessageContext } from 'lightning/messageService';
export default class CarhubTitleList extends LightningElement {
    cars=[]
    error
    filters={};
    subscribtion;
    @wire(MessageContext)
    messageContext

    connectedCallback(){
        this.subscribeMessage();
    }
    subscribeMessage(){
        this.subscribtion=  subscribe(
            this.messageContext,
            CARS_FILTERED_MESSAGE,
            (message)=>{
                this.handleFilterChange(message)
            }
            )
    }

    handleFilterChange(message){
        console.log(message.filters);
        this.filters=message.filters? {...message.filters}:{};
    }

    @wire(getCars,{filters:'$filters'})
    carsHandler({data,error}){
        if(data){
            this.cars=data
        }
        if(error){
            this.error=error
        }
    }

    handleCarSelected(event){
        console.log("car id",event.detail);

        publish(this.messageContext,CAR_SELECTED_MESSAGE,{
            selectedcar:event.detail
        })
    }


    disconnectedCallback(){
        unsubscribe(this.subscribtion)

        this.subscribtion=null
    }

}
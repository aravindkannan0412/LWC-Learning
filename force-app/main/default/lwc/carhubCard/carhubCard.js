import { LightningElement,wire } from 'lwc';

import CAR_OBJ from '@salesforce/schema/Car__c'
import NAME_FIELD from '@salesforce/schema/Car__c.Name'
import PICTUREURL_FIELD from '@salesforce/schema/Car__c.Picutre_URL__c'
import CATEGORY_FIELD from '@salesforce/schema/Car__c.Category__c'
import CONTROL_FIELD from '@salesforce/schema/Car__c.Control__c'
import FUELTYPE_FIELD from '@salesforce/schema/Car__c.Fuel_Type__c'
import MAKE_FIELD from '@salesforce/schema/Car__c.Make__c'
import MSRP_FIELD from '@salesforce/schema/Car__c.MSRP__c'
import SEATS_FIELD from '@salesforce/schema/Car__c.Seats__c'
//field value extract
import { getFieldValue } from 'lightning/uiRecordApi';

import CAR_SELECTED_MESSAGE from '@salesforce/messageChannel/CarSelected__c'
import { APPLICATION_SCOPE,publish,subscribe,unsubscribe,MessageContext } from 'lightning/messageService';

import {NavigationMixin} from 'lightning/navigation'

export default class CarhubCard extends NavigationMixin(LightningElement) {
    //exposing fields to make them available to templae
    // nameField=NAME_FIELD
    // pictureURLField=PICTUREURL_FIELD
    categoryField=CATEGORY_FIELD
    controlField=CONTROL_FIELD
    fuelTypeField=FUELTYPE_FIELD
    makeField=MAKE_FIELD
    msrpField=MSRP_FIELD
    seatsField=SEATS_FIELD

    recordId
    carName='Car'
    carpictureUrl
    carSelectedSubscription

    @wire(MessageContext)
    messageContext

    connectedCallback(){
        this.subscribeMessage();
    }

    subscribeMessage(){
        this.carSelectedSubscription=  subscribe(
            this.messageContext,
            CAR_SELECTED_MESSAGE,
            (message)=>{
                this.handleFilterChange(message)
            }
            )
    }
    handleFilterChange(message){
        this.recordId=message.selectedcar
    }

    handleRecordLoaded(event){
        const {records}=event.detail
        console.log(JSON.stringify(records));
        const recordData=records[this.recordId]
        //uiRecordApi methods
        this.carName=getFieldValue(recordData,NAME_FIELD)
        console.log(this.carName);
        this.carpictureUrl=getFieldValue(recordData,PICTUREURL_FIELD)
    }

    disconnectedCallback(){
        unsubscribe(this.carSelectedSubscription)

        this.carSelectedSubscription=null
    }


    handleNavigation(){
        this[NavigationMixin.Navigate]({
            type:'standard__recordPage',
            attributes:{
                recordId:this.recordId,
                objectApiName:CAR_OBJ.objectApiName,
                actionName:'view'
            }
        })
    }

}
import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import CONTACT_OBJ from '@salesforce/schema/Contact'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class WireDemoLdsCreateRecord extends LightningElement {
    formFields={}
    changeHandler(event){
        const {name,value}=event.target
        this.formFields[name]=value;
    }

    createContact(){
        const recordInput={apiName:CONTACT_OBJ.objectApiName,fields:this.formFields}
        createRecord(recordInput).then(result=>{
            this.showToast('Success!!',`contact created with is 
            ${result.id}`);
            this.template.querySelector('form.createForm').reset();
            this.formFields={};

        }).catch(error=>{
            this.showToast('error creating record',error.body.message,'error')
        })
    }

    showToast(title,message,variant){
        this.dispatchEvent(new ShowToastEvent({
            title,message,
            variant:variant||'success'
        }))
    }
}
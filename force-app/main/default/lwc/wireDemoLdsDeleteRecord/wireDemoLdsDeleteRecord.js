import { LightningElement } from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent'
export default class WireDemoLdsDeleteRecord extends LightningElement {
    recordId
    changeHandler(event){
        this.recordId=event.target.value
    }

    deleteHandler(){
        deleteRecord(this.recordId).then((result)=>{
            this.showToast('Success!!',`Deleted succesfully`,'success');
        })
        .catch(error=>{
            this.showToast('error deleting record',error.body.message,'error')
        })
    }

    showToast(title,message,variant){
        this.dispatchEvent(new ShowToastEvent({
            title,message,
            variant:variant||'success'
        }))
    }
}
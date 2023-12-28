import { LightningElement,api } from 'lwc';
import { updateRecord } from 'lightning/uiRecordApi';

import STAGENAME from '@salesforce/schema/Opportunity.StageName';

import ID from '@salesforce/schema/Opportunity.Id';

import {ShowToastEvent} from 'lightning/platformShowToastEvent'

export default class QaCloseActionForOppLWC extends LightningElement {

    @api recordId
    @api invoke(){
        const fields={}
        fields[ID.fieldApiName]=this.recordId;
        fields[STAGENAME.fieldApiName]='Closed';

        const recordInput={fields}
        updateRecord(recordInput)
        .then(()=>{
            this.ShowToast("Success","Oppurtunity closed successfully","success")
        })
        .catch(error=>{
            this.ShowToast("Error!!",error.message,"error")
        })
    }

    ShowToast(title,message,variant){
        this.dispatchEvent(new ShowToastEvent({
            title,message,variant
        }))
    }
}
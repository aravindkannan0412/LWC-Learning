import { LightningElement,api } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import ACCOUNT_OBJECT from '@salesforce/schema/Account'
import NAME_FIELD from '@salesforce/schema/Account.Name'
import ANNUALREVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue'
import TYPE_FIELD from '@salesforce/schema/Account.Type'
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry'
export default class BlcRecordFormLWCDemo extends LightningElement {
    @api recordId
    @api objectApiName
    objectName=ACCOUNT_OBJECT;
    fieldList=[NAME_FIELD,ANNUALREVENUE_FIELD,TYPE_FIELD,INDUSTRY_FIELD];

    get dynamicRecDisplay(){
        console.log(this.recordId);
        return (this.recordId!=null && this.recordId!='')
    }


    successHandler(event){
        console.log(event.detail.id);

        const evt=new ShowToastEvent({
            title:'Account Created',
            message:"Record Id: "+event.detail.id,
            variant:"success",
            mode:"sticky"
        })

        this.dispatchEvent(evt);
    }
}
import { LightningElement} from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import ACCOUNT_OBJECT from '@salesforce/schema/Account'
export default class BlcRecordEditCustomFormLWCDemo extends LightningElement {

    objectName=ACCOUNT_OBJECT;
    inputValue='';

    handleChange(event){
        this.inputValue=event.target.value;
    }

    handleSubmit(event){
        event.preventDefault();
        const inputCmp=this.template.querySelector('lightning-input');

        const value=inputCmp.value;

        if(!value.includes('Australia')){
            inputCmp.setCustomValidity("The Account Name must Include Australia");
        }
        else{
            inputCmp.setCustomValidity("");
            const fields=event.detail.fields;

            fields.Name=this.inputValue;
            this.template.querySelector('lightning-record-edit-form').submit(fields)
        }
        inputCmp.reportValidity();
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

    handleError(event){
        const evt=new ShowToastEvent({
            title:'Error Creating Account',
            message:event.detail.message,
            variant:"error",
            mode:"sticky"
        })

        this.dispatchEvent(evt);
    }
}
import { LightningElement } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import CONTACT_OBJ from '@salesforce/schema/Contact'
import nameField from '@salesforce/schema/Contact.Name'
import titleField from '@salesforce/schema/Contact.Title'
import phoneField from '@salesforce/schema/Contact.Phone'
import accountField from '@salesforce/schema/Contact.AccountId'
export default class BlcRecordFormEditLWCDEmo extends LightningElement {

    objectName=CONTACT_OBJ;
    fieldList={
        nameField,titleField,phoneField,accountField
    };
    handleReset(){
       const inputFields= this.template.querySelectorAll('lightning-input-field')

       if(inputFields){
        Array.from(inputFields).forEach(field=>{
            field.reset();
        })
       }
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
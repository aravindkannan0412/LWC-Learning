import { LightningElement,api,wire } from 'lwc';
import {getRecordUi,getFieldValue,getFieldDisplayValue} from 'lightning/uiRecordApi'
import NAMEF from '@salesforce/schema/Account.Name'
import OWNERNAMEF from '@salesforce/schema/Account.Owner.Name'
import ANNUALREVENUEF from '@salesforce/schema/Account.AnnualRevenue'
export default class WireDemoGetRecordLWC extends LightningElement {
    @api recordId;
    formFields=[
        {fieldName:"AccountNumber","label":"Account Number"},
        {fieldName:"AnnualRevenue","label":"Annual Revenue"},
        {fieldName:"Name","label":"Name"},
        {fieldName:"Phone","label":"Phone"}
    ]

    @wire(getRecordUi,{recordIds:'$recordId',layoutTypes:'Full',modes:'Edit'})
    accountRecordUiHandler({data,error}){
        if(data){
            this.formFields=this.formFields.map(item=>{
                return {...item, value:data.records[this.recordId].fields[item.fieldName].value}
            })
        }
    }

}
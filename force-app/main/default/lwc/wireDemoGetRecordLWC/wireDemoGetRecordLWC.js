import { LightningElement,api,wire } from 'lwc';
import {getRecord,getFieldValue,getFieldDisplayValue} from 'lightning/uiRecordApi'
import NAMEF from '@salesforce/schema/Account.Name'
import OWNERNAMEF from '@salesforce/schema/Account.Owner.Name'
import ANNUALREVENUEF from '@salesforce/schema/Account.AnnualRevenue'
export default class WireDemoGetRecordLWC extends LightningElement {
    @api recordId;
    name
    owner
    AnnualRevenue

    @wire(getRecord,{recordId:'$recordId',fields:[NAMEF,OWNERNAMEF,ANNUALREVENUEF]})
    accountHandler({data}){
        if(data){

            // this.name=data.fields.Name.displayValue? data.fields.Name.displayValue:data.fields.Name.value

            // this.AnnualRevenue=data.fields.AnnualRevenue.displayValue? data.fields.AnnualRevenue.displayValue:data.fields.AnnualRevenue.value;

            // this.owner=data.fields.Owner.displayValue? data.fields.Owner.displayValue:data.fields.Owner.value;

            
            this.name=getFieldValue(data,NAMEF)

            this.AnnualRevenue=getFieldDisplayValue(data,ANNUALREVENUEF)

            this.owner=getFieldValue(data,OWNERNAMEF)
        }
    }

    @wire(getRecord,{recordId:'$recordId',layoutTypes:['Full'],modes:['view']})
    accountlayoutHandler({data}){
        if(data){
            console.log(data);
        }
    }


}
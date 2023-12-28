import { LightningElement,wire } from 'lwc';
import {getObjectInfos} from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJ from '@salesforce/schema/Account';
import OPPORTUNITY_OBJ from '@salesforce/schema/Opportunity';
const objectApiNames=[ACCOUNT_OBJ,OPPORTUNITY_OBJ];
export default class WireDemoGetObjectInfo extends LightningElement {
    objectInfos
    @wire(getObjectInfos,{objectApiNames})
    objectInfors({data,error}){
        if(data){
            console.log(data);
            this.objectInfos=data;
        }
        if(error){
            console.error(error);
        }

    }
   
}
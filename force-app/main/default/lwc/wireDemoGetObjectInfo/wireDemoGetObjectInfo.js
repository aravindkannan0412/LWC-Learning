import { LightningElement,wire } from 'lwc';
import {getObjectInfo} from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJ from '@salesforce/schema/Account';
export default class WireDemoGetObjectInfo extends LightningElement {
    defaultRecordType
    @wire(getObjectInfo,{objectApiName:ACCOUNT_OBJ})
    objectInfor({data,error}){
        if(data){
            console.log(data);
            this.defaultRecordType=data.defaultRecordTypeId;
        }
        if(error){
            console.error(error);
        }

    }
    @wire(getObjectInfo,{objectApiName:ACCOUNT_OBJ})
    objectInforProps
}
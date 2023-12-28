import { LightningElement,wire } from 'lwc';
import {getObjectInfo, getPicklistValues} from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJ from '@salesforce/schema/Account';
import INDUSTRY_FIED from '@salesforce/schema/Account.Industry';
import TYPE_FIED from '@salesforce/schema/Account.Type';
export default class WireGetPicklistValueDemo extends LightningElement {

    selectedIndustry;
    selectedType;
    industryOptions=[];
    typeOptions=[];
    @wire(getObjectInfo,{objectApiName:ACCOUNT_OBJ})
    objectInfo

    @wire(getPicklistValues,{recordTypeId:'$objectInfo.data.defaultRecordTypeId',fieldApiName:INDUSTRY_FIED})
    getPickListIndustry({data,error}){
        if(data){
          this.industryOptions= [...this.generatedPicklist(data)]
        }
        if(error){
            console.error(error);
        }
    }

    @wire(getPicklistValues,{recordTypeId:'$objectInfo.data.defaultRecordTypeId',fieldApiName:TYPE_FIED})
    getPickListType({data,error}){
        if(data){
          this.typeOptions= [...this.generatedPicklist(data)]
        }
        if(error){
            console.error(error);
        }
    }

    generatedPicklist(data){
        return data.values.map(item=>({
            label:item.label,
            value:item.value
        }))
    }

    handleChangeOne(event){
        this.selectedIndustry=event.detail.value;
    }

    handleChangeTwo(event){
        this.selectedType=event.detail.value;
    }
}
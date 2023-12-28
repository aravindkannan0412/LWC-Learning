import { LightningElement,wire } from 'lwc';
import { getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';
import {getObjectInfo} from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJ from '@salesforce/schema/Account';
export default class WireDemoGetPicklistValueForTheObject extends LightningElement {
    ratingOptions=[];
    industryOptions=[];
    selectedIndustry;
    selectedRating;
    @wire(getObjectInfo,{objectApiName:ACCOUNT_OBJ})
    objectInfo

    @wire(getPicklistValuesByRecordType,{objectApiName:ACCOUNT_OBJ,recordTypeId:'$objectInfo.data.defaultRecordTypeId'})
    getPckByRecordTypeForObject({data,error}){
        if(data){
            this.ratingOptions=this.generatedPicklist(data.picklistFieldValues.Rating)
            this.industryOptions=this.generatedPicklist(data.picklistFieldValues.Industry)
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

    handleChange(event){

        const {name,value}=event.target;
        if(name==='industry'){
            this.selectedIndustry=value;
        }
        if(name==='rating'){
            this.selectedRating=value;
        }
    }

   
}
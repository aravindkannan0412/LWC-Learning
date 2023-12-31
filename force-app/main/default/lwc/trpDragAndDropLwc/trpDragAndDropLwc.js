import { LightningElement,wire } from "lwc";

import { getListUi } from "lightning/uiListApi";
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity'
import { getObjectInfo,getPicklistValues } from "lightning/uiObjectInfoApi";
import STAGE_FIELD from '@salesforce/schema/Opportunity.StageName'
import  ID_FIELD from '@salesforce/schema/Opportunity.Id'
import { updateRecord } from "lightning/uiRecordApi";
import {ShowToastEvent} from 'lightning/platformShowToastEvent'
import {refreshApex} from '@salesforce/apex'
export default class TrpDragAndDropLwc extends LightningElement {
    
    kanbanData
    StageNames=[];
    recordIdDragged
    
    @wire(getListUi,{objectApiName:OPPORTUNITY_OBJECT,listViewApiName:'AllOpportunities'})
    getListData({error,data}){
        if(data){
            console.log("Listui",data);
            this.kanbanData=data.records.records.map(item=>{
                        let field=item.fields;
                        let account=field.Account.value.fields;

                        return {
                            'id':field.Id.value,
                            'Name':field.Name.value,
                            'AccountId':account.Id.value,
                            'AccountName':account.Name.value,
                            'CloseDate':field.CloseDate.value,
                            'StageName':field.StageName.value,
                            'Amount':field.Amount.value
                        }

            })
        }
        if(error){
            console.error(error);
        }
    }

    @wire(getObjectInfo,{objectApiName:OPPORTUNITY_OBJECT})
    objectInfo

    @wire(getPicklistValues,{recordTypeId:'$objectInfo.data.defaultRecordTypeId',fieldApiName:STAGE_FIELD})
    pickListController({data,error}){
        if(data){
            this.StageNames=data.values.map(item=>item.value)
            let indexToRemove =  this.StageNames.indexOf('Closed Lost');

            if (indexToRemove !== -1) {
                this.StageNames.splice(indexToRemove, 1);
            }

            this.StageNames.forEach(item=>{

            })
        }
        if(error){
            console.error(error);
        }
    }


    get calcWidth(){
        let  len=this.StageNames.length+1;

        return `width:calc(100vw/${len})`
    }

    handleListItemDrag(event){
        try{
        this.recordIdDragged=event.detail
        }
        catch(error){
            console.error(error);
        }
    }

    handleItemDrop(event){
        let stage=event.detail;
        try{
            this.updateHandler(stage);
        }
        catch(error){
            console.error(error);
        }
    }

    async updateHandler(stage){
        const fields={}
        fields[ID_FIELD.fieldApiName]=this.recordIdDragged;
        fields[STAGE_FIELD.fieldApiName]=stage
        try{
            await updateRecord({fields}) 
            await refreshApex(this.getListData)
            this.template.querySelector('c-trp-drag-and-drop-lwc-child').resetTotalAmount();
            this.showToastHandler("Success","Stage updated successfully","success")
        }
        catch(error){
            console.error(error);
        }
    }

    showToastHandler(title,message,variant,mode){
        this.dispatchEvent(new ShowToastEvent({
            title,message,variant,mode
        }))
    }

   
}   
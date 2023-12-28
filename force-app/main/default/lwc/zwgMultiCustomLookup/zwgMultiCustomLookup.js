import { LightningElement, api, wire } from "lwc";
import fetchLookUpData from "@salesforce/apex/customLookupController.fetchLookUpData";
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
const DELAY=2000;
export default class ZwgMultiCustomLookup extends LightningElement {
	@api recordId;
	@api objectApiName="Account";
    @api label="Account";
    @api placeHolder="Search Account"
    @api iconName="standard:account";

    searchKey='';
    hasRecords=false;
    searchOuput=[];
    timer;
    selectedRecords=[];
    @wire(fetchLookUpData,{searchKey:'$searchKey',objectApiName:'$objectApiName'})
    searchResult({data,error}){
        if(data){
            console.log(data);
            this.hasRecords=data.length >0 ? true: false;
            this.searchOuput=data;
        }
        else if(error){
            console.error(error);
        }
    }

    changeHandler(event){
        window.clearTimeout(this.timer);

        console.log(event.target.value);
        let value=event.target.value;
        //debouncing

        this.timer=window.setTimeout(()=>{
            this.searchKey=value;
        },DELAY)

    }

    clickHandler(event){
        let recId=event.target.getAttribute("data-recid");
        console.log('recId',recId);
        let selectedRecord=this.searchOuput.find(currItem => currItem.Id===recId );
        if(this.validateDuplicate(selectedRecord)){
            let pill= {
                type: 'icon',
                label: selectedRecord.Name,
                name: selectedRecord.Id,
                iconName: this.iconName,
                alternativeText:selectedRecord.Name
            }
    
            this.selectedRecords=[...this.selectedRecords,pill];
        }
        
    }

    handleItemRemove(event) {
        const index = event.detail.index;
        console.log(index);
        this.selectedRecords.splice(index, 1);
    }

    validateDuplicate(selectedRecord){
    let isValid=true;
       if(this.selectedRecords.find(currItem=>currItem.name===selectedRecord.Id)){
            isValid=false;
            this.dispatchEvent(new ShowToastEvent({
                title:'Error !!',
                message :`${selectedRecord.Name} is already Selected`,
                variant:'error'
            }))
       }

       return isValid;
    }
}
import { LightningElement,wire } from 'lwc';
import filterAccountByType from '@salesforce/apex/AccountControllerForExposeLWC.filterAccountByType';
export default class WireDemoApexExposeWithParamsLDS extends LightningElement {
    selectedType=''
    @wire(filterAccountByType,{type:'$selectedType'})
    filteredAccount

    get typeOptions(){
        return [
            {label:"Customer - Direct",value:"Customer - Direct"},
            {label:"Customer - Channel",value:"Customer - Channel"}
        ]
    }

    typeHandler(event){
        this.selectedType=event.target.value;
    }
}
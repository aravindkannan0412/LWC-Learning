import { LightningElement ,track,wire} from 'lwc';
import { getObjectInfo,getPicklistValues } from 'lightning/uiObjectInfoApi';
import CAR_OBJECT from '@salesforce/schema/Car__c'
import CATEGORY_FIELD from '@salesforce/schema/Car__c.Category__c'
import MAKE_FIELD from '@salesforce/schema/Car__c.Make__c'
const CATEGORY_ERROR='Error loading categories'
const MAKETYPE_ERROR='Error loading Make Type'

import CARS_FILTERED_MESSAGE from '@salesforce/messageChannel/CarsFiltered__c'
import { APPLICATION_SCOPE,publish,subscribe,unsubscribe,MessageContext } from 'lightning/messageService';

export default class CarhubFilter extends LightningElement {
 filters={
        searchKey:'',
        maxPrice:999999
    }
    categoryError=CATEGORY_ERROR
    makeTypeError=MAKETYPE_ERROR
    timer//for debouncing search key
    /***fectching  pciklist using wire configs*/
    @wire(MessageContext)
    messageContext //lms

    @wire(getObjectInfo,{objectApiName:CAR_OBJECT})
    carObjectInfo
    
     @wire(getPicklistValues,{recordTypeId:'$carObjectInfo.data.defaultRecordTypeId',
     fieldApiName:CATEGORY_FIELD
     })
     categories

    @wire(getPicklistValues,{recordTypeId:'$carObjectInfo.data.defaultRecordTypeId',
    fieldApiName:MAKE_FIELD
    })
    makeType


    handleSearchKeyChange(event){
       
    //     window.clearTimeout(this.timer);

    //    this.timer= window.setTimeout(()=>{
          
    //     }, 1000);

    this.filters={...this.filters,"searchKey":event.target.value};
    this.sendDataToCarList();
      
        
    }

    handleMaxPriceChange(event){
        this.filters={...this.filters,"maxPrice":event.target.value}

        this.sendDataToCarList();
    }
    handlecheckbox(event){
        try{
            if(!this.filters.categories){
                const categories=this.categories.data.values.map(item=>item.value)
                const makeType=this.makeType.data.values.map(item=>item.value)
                this.filters={...this.filters,categories,makeType}
            }
            const {name,value}=event.target.dataset
            console.log(name,value);
    
            if(event.target.checked){
                if(!this.filters[name].includes(value)){
                    this.filters[name]=[...this.filters[name],value]
                }
            }
            else{
                 this.filters[name]=this.filters[name].filter(item=>item!==value)
            }
    
            this.sendDataToCarList()
        }
        catch(error){
            console.error(error);
        }
        
    }

    sendDataToCarList(){

        try{
            window.clearTimeout(this.timer);
            
            this.timer=window.setTimeout(()=>{
                    publish(this.messageContext,CARS_FILTERED_MESSAGE,{
                        filters:this.filters
                    });
            },400)
          
        }
        catch(error){
            console.error(error);
        }

    }
}
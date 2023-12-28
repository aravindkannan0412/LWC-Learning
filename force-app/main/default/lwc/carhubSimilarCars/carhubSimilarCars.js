import { LightningElement ,api,wire} from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import MAKE_FIELD from '@salesforce/schema/Car__c.Make__c'
import getSimilarCars from '@salesforce/apex/carhubController.getSimilarCars'
import {NavigationMixin} from 'lightning/navigation'
export default class CarhubSimilarCars extends NavigationMixin(LightningElement) {

    @api recordId;
    similarCars

    @wire(getRecord,{recordId:'$recordId',fields:[MAKE_FIELD]})
    carRecord



    fetchSimilarCars(){
        getSimilarCars({
            carId:this.recordId,
            makeType:this.carRecord.data.fields.Make__c.value
        }).then(result=>{
            console.log(result);
            this.similarCars=result
        }).catch(error=>{
            console.error(error);
        })
    }

    navigateToDetailCar(event){
        console.log(event.target.dataset.id);
        this[NavigationMixin.Navigate]({
            type:'standard__recordPage',
            attributes:{
                recordId:event.target.dataset.id,
                objectApiName:'Car__c',
                actionName:'view'
            }
        })
    }
}
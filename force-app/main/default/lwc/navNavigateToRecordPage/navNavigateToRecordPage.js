import { LightningElement } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
export default class NavNavigateToRecordPage extends NavigationMixin(LightningElement) {

    recordViewMode(){
        this[NavigationMixin.Navigate]({
            type:'standard__recordPage',
            attributes:{
                recordId:'0031m00000YgW4xAAF',
                objectApiName:'Contact',
                actionName:'view'
            }
        })
    }
    recordEditMode(){
        this[NavigationMixin.Navigate]({
            type:'standard__recordPage',
            attributes:{
                recordId:'0031m00000YgW4xAAF',
                objectApiName:'Contact',
                actionName:'edit'
            }
        })
    }   
    
}
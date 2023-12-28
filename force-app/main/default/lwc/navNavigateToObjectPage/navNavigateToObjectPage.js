import { LightningElement } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
import {encodeDefaultFieldValues} from 'lightning/pageReferenceUtils'
import FirstName from '@salesforce/schema/Contact.FirstName';
export default class NavNavigateToHome extends NavigationMixin (LightningElement){
    
    navigateToNewRecord(){
        this[NavigationMixin.Navigate]({
            type:'standard__objectPage',
            attributes:{
                objectApiName:'Contact',
                actionName:'new'
            }
        })
    }

    //navigate to new record with default
    navigateToNewRecordWithDefault(){
      const defaultValue=  encodeDefaultFieldValues({
            FirstName:'Zero',
            LastName:'Hero',
            LeadSource:'Other'
        })
        this[NavigationMixin.Navigate]({
            type:'standard__objectPage',
            attributes:{
                objectApiName:'Contact',
                actionName:'new'
            },
            state:{
               defaultFieldValues:defaultValue 
            }
        })
    }

    navigateToListView(){
        this[NavigationMixin.Navigate]({
            type:'standard__objectPage',
            attributes:{
                objectApiName:'Contact',
                actionName:'list'
            },
            state:{
               filterName:'Recent'
            }
        })
    }

    navigateToFiles(){
        this[NavigationMixin.Navigate]({
            type:'standard__objectPage',
            attributes:{
                objectApiName:'ContentDocument',
                actionName:'home'
            }
        })

    }
}
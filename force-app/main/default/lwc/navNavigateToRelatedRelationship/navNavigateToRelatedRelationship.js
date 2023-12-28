import { LightningElement } from 'lwc';
import  {NavigationMixin} from 'lightning/navigation'
export default class NavNavigateToRelatedRelationship extends NavigationMixin(LightningElement) {

    navigateToRelatedRecord(){
        this[NavigationMixin.Navigate]({
            type:'standard__recordRelationshipPage',
            attributes:{
                recordId:'0011m00000o40EGAAY',
                objectApiName:'Account',
                relationshipApiName:'Contacts',
                actionName:'view'
            }
        })
    }
}
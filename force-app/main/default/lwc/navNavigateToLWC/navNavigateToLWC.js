import { LightningElement } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
export default class NavNavigateToWebPage extends NavigationMixin(LightningElement) {

    navigateToLWC(){
        let definition={
            componentDef:'c:navNavigationToLWCTarget',
            attributes:{
                recordId:'0011m00000o40EHAAY'
            }
        }
        this[NavigationMixin.Navigate]({
            type:"standard__webPage",
            attributes:{
                url:'/one/one.app#'+btoa(JSON.stringify(definition))
            }
        })
    }
}
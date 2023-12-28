import { LightningElement } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
export default class NavNavigateToWebPage extends NavigationMixin(LightningElement) {

    navigateToVf(){
//this navigate to vf gives a promise
        this[NavigationMixin.Navigate]({
            type:"standard__webPage",
            attributes:{
                url:'/apex/navNavigateToVFTarget'
            }
        }).then(gnereatedUrl=>{
            console.log(gnereatedUrl);
            window.open(gnereatedUrl,"_blank");
        })
    }
}
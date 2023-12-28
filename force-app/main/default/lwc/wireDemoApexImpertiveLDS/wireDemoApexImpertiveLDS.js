import { LightningElement } from 'lwc';
import getAccountList from '@salesforce/apex/AccountControllerForExposeLWC.getAccountList';
export default class WireDemoApexImpertiveLDS extends LightningElement {

    accounts
    handleClick(){
        getAccountList().then(result=>{
            this.accounts=result
        })
        .catch(error=>{
            console.error(error);
        })
    }

}
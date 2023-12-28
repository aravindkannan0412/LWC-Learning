import { LightningElement } from 'lwc';
import findAccounts from '@salesforce/apex/AccountControllerForExposeLWC.findAccounts';
export default class WireDemoApexImperativeWithParamsLDS extends LightningElement {

    searchKey='';
    accounts
    timer
    handleInputChange(event) {
        window.clearTimeout(this.timer)// debouncing technique
        this.searchKey = event.target.value;
        console.log(this.searchKey);
        this.timer= setTimeout(()=>{
            this.callApex()
        },2000)

    }

    callApex(){
        findAccounts({searchKey:this.searchKey}).then(result=>{
            this.accounts=result
            console.log(this.accounts);

        })
        .catch(error=>{
            console.error(error);
        })
    }
}
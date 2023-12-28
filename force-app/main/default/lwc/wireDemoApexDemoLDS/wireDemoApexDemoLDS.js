import { LightningElement,wire } from 'lwc';
import getAccountList from '@salesforce/apex/AccountControllerForExposeLWC.getAccountList';
export default class WireDemoApexDemoLDS extends LightningElement {

    accountList
    
    @wire(getAccountList)
    Accounts


    @wire(getAccountList)
    accountsHandler({data,error}){
        if(data){
            console.log(data);
            this.accountList=data.map(item=>{
                let newType= item.Type==='Customer - Channel'? 'Channel': 
                item.Type==='Customer - Direct'?'Direct':'-------'

                return {...item,newType}
            })
            console.log(this.accountList);
        }
        if(error){
            console.error(error);
        }
    }
}
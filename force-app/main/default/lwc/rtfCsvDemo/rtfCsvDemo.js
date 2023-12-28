import { LightningElement ,wire} from 'lwc';
import getAccounts from '@salesforce/apex/csvController.getAccounts';

import {exportCSVFile} from 'c/rtfutils'
export default class RtfCsvDemo extends LightningElement {
    accountData
    accoundHeader={
        Id:"Record Id",
        Name:"Name",
        Phone:"Phone",
        AnnualRevenue:"AnnualRevenue",
        Industry:"Industry",
    }
    @wire(getAccounts)
    accountHandler({data,error}){
        if(data){
           this.accountData=data
        }
        if(error){
            console.error(error);
        }
    }

    csvGenerator(){
        //headers,totalData,fileTitle
        exportCSVFile(this.accoundHeader,this.accountData,`Accout_records`)
    }
}
import { LightningElement,wire } from 'lwc';
import {getListUi} from 'lightning/uiListApi';
import CONTACT_OBJ from '@salesforce/schema/Contact';
import TITLEFIELD from '@salesforce/schema/Contact.Title';
export default class WireDemoGetListUILWC extends LightningElement {
    sampleData
    contacts=[];
    pageToken=null
    nextPageToken=null
    previousPageToken=null
    @wire(getListUi,{objectApiName:CONTACT_OBJ,listViewApiName:'AllContacts',pageSize:10,sortBy:TITLEFIELD,pageToken:'$pageToken'})
    getListViewData({data}){
        
        if(data){
            this.contacts=data.records.records
            this.nextPageToken=data.records.nextPageToken
            this.previousPageToken=data.records.previousPageToken
        }
    }

    handleNextPage(event){
        this.pageToken=this.previousPageToken;
    }

    handlePreviousPage(event){
        this.pageToken=this.nextPageToken;
    }
}
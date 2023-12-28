import { LightningElement,wire } from 'lwc';
import { getListUi } from 'lightning/uiListApi';
import CONTACTOBJ from '@salesforce/schema/Contact'
const COLS=[
    {label:'Id',fieldName:'Id'},
    {label:'Name',fieldName:'Name'},
    {label:'Title',fieldName:'Title'},
    {label:'Phone',fieldName:'Phone',editable:true},
    {label:'Email',fieldName:'Email',type:'email',editable:true}
]
import { updateRecord } from 'lightning/uiRecordApi';
export default class WireDemoLdsUpdateRecord extends LightningElement {
    contacts=[]
    columns=COLS
    draftValues=[]
    @wire(getListUi,{
        objectApiName:CONTACTOBJ,
        listViewApiName:'AllContacts'
    })
    listViewHanlder({data,error}){
        if(data){
            console.log(data);
            this.contacts=data.records.records.map(item=>{
                return {
                    "Id":this.getValue(item,'Id'),
                    "Name":this.getValue(item,'Name'),
                    "Title":this.getValue(item,'Title'),
                    "Phone":this.getValue(item,'Phone'),
                    "Email":this.getValue(item,'Email'),
                }
            })

            
        }
        if(error){
            console.error(error);
        }
    }

    getValue(data,field){
      
        return data.fields[field].value
    }

    handleSave(event){
        console.log(JSON.stringify(event.detail));
        console.log(JSON.stringify(event.detail.draftValues));
        const recordInputs=event.detail.draftValues.map(draft=>{
            const fields={...draft}
            return {fields:fields}
        })
        const promises=recordInputs.map(recordInput=>updateRecord(recordInput))

        Promise.all(promises).then(()=>{
            console.log('contact updated succesfully');
            this.draftValues=[];
        })
        .catch(error=>{
            console.error("error updating the record",error);
        })
    }
}
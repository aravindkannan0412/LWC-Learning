import { LightningElement,wire } from 'lwc';
import { getRelatedListInfo, getRelatedListsInfo } from 'lightning/uiRelatedListApi';

import { getRelatedListCount } from 'lightning/uiRelatedListApi';

import { getRelatedListRecords } from 'lightning/uiRelatedListApi';


export default class WireDemoGetRelatedListInfo extends LightningElement {
    relatedData
    relatedListCount
    relatedListRecords
    relatedSingleList

    @wire(getRelatedListInfo,{
        parentObjectApiName:'Account',
        relatedListId:'Contacts'
        //recordTypeId-optional
    })ListSingleInfoHandler({data,error}){
        if(data){
            console.log('Single List' ,JSON.stringify(data));
             this.relatedSingleList=data.displayColumns
        }
        if(error){
            console.log(error);
        }
    }

    @wire(getRelatedListsInfo,{
        parentObjectApiName:'Account',
        //recordTypeId-optional
    })ListInfoHandler({data,error}){
        if(data){
            console.log(JSON.stringify(data));
            this.relatedData=data.relatedLists
        }
        if(error){
            console.log(error);
        }
    }

    @wire(getRelatedListCount,{
        parentRecordId:'001H3000002IXoDIAW',
        relatedListId:'Contacts'
        //recordTypeId-optional
    })ListInfoCountHandler({data,error}){
        if(data){
            console.log(JSON.stringify(data));
            this.relatedListCount=data
        }
        if(error){
            console.log(error);
        }
    }

    @wire(getRelatedListRecords,{
        parentRecordId:'001H3000002IXoDIAW',
        relatedListId:'Contacts',
        fields:['Contact.Name','Contact.Id','Contact.Phone','Contact.Title']
        //recordTypeId-optional
    })ListInfoRecordHandler({data,error}){
        if(data){
            console.log(JSON.stringify(data));
            this.relatedListRecords=data.records.map(item=>{
              return {
                Name:item.fields.Name.value,
                Id:item.fields.Id.value,
                Phone:item.fields.Phone.value,
                Title:item.fields.Title.value,
               }
            })
        }
        if(error){
            console.log(error);
        }
    }
}
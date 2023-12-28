import { LightningElement, api,wire } from "lwc";
import allAccountsWithContacts from "@salesforce/apex/AccountContactTree.allAccountsWithContacts";
export default class TreeGridLwcDemo extends LightningElement {
    gridData=[]
    @wire(allAccountsWithContacts)
    accountsWithContacts({data}){
        if(data){
            this.formatGridData(data);
        }
    }

      gridColumns=[
        {
            label:'Name',
            fieldName:'Name',
            type:'Text'
        },
        {
            label:'Phone',
            fieldName:'Phone',
            type:'Text'
        },
        {
            label:'Account Website',
            fieldName:'Website',
            type:'url',
            typeAttributes:{
                target:'_blank'
            }
        }

      ];

      formatGridData(result){
           this.gridData= result.map(item=>{
                console.log(item);
                const {Contacts,...accounts} =item
                console.log(accounts);
                return {...accounts,"_children":Contacts}
            })

            console.log(this.gridData);
      }
}
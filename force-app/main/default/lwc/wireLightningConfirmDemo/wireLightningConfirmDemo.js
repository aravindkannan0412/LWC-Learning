import { LightningElement, api } from "lwc";

import LightningConfirm from 'lightning/confirm'
export default class WireLightningConfirmDemo extends LightningElement {
	
    ConfirmHandler(event){

        LightningConfirm.open({
            message:"Would you like to refresh the page",
            label:`Are you Sure?`,
			theme:"success"
        }).then(result=>{
            
            if(result){
                location.reload();
            }
        })
    }
}
import { LightningElement } from "lwc";

import LightningPrompt from 'lightning/prompt'
import LightningAlert from 'lightning/alert'

export default class WireLightningPromptDemo extends LightningElement {

   async PromptHandler(event){
        const result =await LightningPrompt.open({
            message: "Please Enter Your Age",
            label: "Please Respond", // , 
            theme: "success",
            variant: "header",
            defaultValue:30
          })
          console.log(result);
          if(result && Number(result)>18){
            this.alertHandler("Hurray you are eligible","Vote Elgibility","Success");
          }
          else{

            this.alertHandler("Sorry you are not eligble","Vote Elgibility","error");
          }
   
    }

    async alertHandler(message,label,theme){
        await LightningAlert.open({
			message,
			label,
			theme})
    }
}
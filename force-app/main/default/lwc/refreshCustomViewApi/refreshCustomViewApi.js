import { LightningElement, api, track } from "lwc";

import {registerRefreshHandler,unregisterRefreshHandler} from 'lightning/refresh'
import getAccountRating from "@salesforce/apex/RefreshController.getAccountRating";

export default class RefreshCustomViewApi extends LightningElement {
	@api recordId;
	@track accData
	refreshHandlerId
	connectedCallback(){
		//contextElement(this component),providerMehtod(callback method)
		console.log('I am conencted now');
		this.refreshHandlerId=registerRefreshHandler(this,this.refreshHandler)

		this.fetchRating();
	}

	disconnectedCallback(){
		console.log('I am disconencted now');

		unregisterRefreshHandler(this.refreshHandlerId);
	}

	refreshHandler(){
		console.log("something has Changes!!");
		//returns promise
		return new Promise(resolve=>{
			console.log(`inside a promise`);
			this.fetchRating()
			resolve(true)
		})
	}
	fetchRating(){
		
		getAccountRating({"accountId":this.recordId}).then(response=>{
			console.log('getting response',JSON.stringify(response));
				this.accData=response;
				console.log('gettingaccData response',this.accData);
				console.log('getting accData',JSON.stringify(this.accData));
		})
		.catch(error=>{
			console.error(error);
		})
	}

	

}
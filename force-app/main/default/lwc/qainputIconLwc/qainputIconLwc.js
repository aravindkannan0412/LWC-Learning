import { LightningElement, api } from "lwc";
import {loadStyle} from 'lightning/platformResourceLoader';
import input from '@salesforce/resourceUrl/input'
export default class QainputIconLwc extends LightningElement {
	@api show;
	showpassword
	get passwordIcon(){
		return this.showpassword? 'utility:hide' : 'utility:preview'
	}

	get passwordType(){
		return this.showpassword? 'text':'password'
	}

	passwordHandler(){
		this.showpassword=!this.showpassword
	}
	
	connectedCallback(){
		loadStyle(this,input).then(()=>{
			console.log(`styles loaded successfully`);
		})
		.catch(error=>{
			console.error(error);
		})
	}

}
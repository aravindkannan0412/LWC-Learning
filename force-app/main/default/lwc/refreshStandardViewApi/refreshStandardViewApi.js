import { LightningElement, api,wire } from "lwc";

import CONTACT_OBJ from '@salesforce/schema/Contact'
import nameField from '@salesforce/schema/Contact.Name'
import emailField from '@salesforce/schema/Contact.Email'
import phoneField from '@salesforce/schema/Contact.Phone'
import accountField from '@salesforce/schema/Contact.AccountId'

import {ShowToastEvent} from 'lightning/platformShowToastEvent';

import {RefreshEvent} from 'lightning/refresh'

export default class RefreshStandardViewApi extends LightningElement {
	objectName=CONTACT_OBJ;
	fieldList={nameField,emailField,phoneField,accountField}

	successHandler(event){
		this.dispatchEvent(
			this.showToastMessage(`Record created succesfully ${event.detail.id}`,'Contact Created','success','sticky')
		)

		this.dispatchEvent(new RefreshEvent())
	}

	showToastMessage(message,title,variant,mode){
		return new ShowToastEvent({message,title,variant,mode})
	}
}
import { LightningElement, api } from "lwc";
import LightningAlert from 'lightning/alert';
export default class WireLightningAlertDemo extends LightningElement {


	async alertHandler(event){

		const {name}=event.target
		await LightningAlert.open({
			message:"This is the alert message",
			label:`I am ${name} Alert Header`,
			theme:name //sucess ,error,info
		})
		
		let x=2
		let y=3
		this.add(x,y)
	}

	add(a,b){
		console.log(a+b);
	}
}

// LightningAlert.open({
// 	message:"This is the alert message",
// 	label:`I am ${name} Alert Header`,
// 	theme:name //sucess ,error,info
// }).then( result->{
// 	post action
// })- another way

//variant:headerless